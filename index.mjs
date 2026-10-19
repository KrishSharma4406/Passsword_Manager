import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
const connectDB = async () => {
  try {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// User Schema
const userSchema = new mongoose.Schema({
  githubId: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true
  },
  email: String,
  name: String,
  avatar_url: String,
  accessToken: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date,
    default: Date.now
  }
});

// Password Schema (for storing user passwords)
const passwordSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  site: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', userSchema);
const Password = mongoose.model('Password', passwordSchema);

// GitHub OAuth configuration
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID || "Ov23liaThlVYfXHVteZd";
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET || "0b13935060cdbe7059c1a1a8ec3e55cb735c8ae1";
const JWT_SECRET = process.env.JWT_SECRET || "f9c11da79ea3e4b471e966bd45f0fc75985509cc39f0b9ae0585db05881d4ad7d4ef2b227a8468dd7e9c8d2bf7f53a0c9d2374bd5c8d5231d5563ef1bb3a6d83";

// Middleware to verify JWT token
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid token' });
  }
};

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from backend!" });
  console.log("Hello from backend!");
});

// Debug endpoint to check database
app.get("/api/debug/users", async (req, res) => {
  try {
    const users = await User.find({});
    const userCount = await User.countDocuments();
    const passwordCount = await Password.countDocuments();
    
    res.json({
      message: "Database debug info",
      userCount,
      passwordCount,
      users: users.map(u => ({
        id: u._id,
        githubId: u.githubId,
        username: u.username,
        email: u.email,
        name: u.name,
        createdAt: u.createdAt,
        lastLogin: u.lastLogin
      }))
    });
  } catch (error) {
    console.error("Database debug error:", error);
    res.status(500).json({ error: error.message });
  }
});

// GitHub OAuth callback endpoint
app.post("/api/auth/github/callback", async (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ error: "Authorization code is required" });
  }

  try {
    // Exchange code for access token
    const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code: code,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      return res.status(400).json({ error: tokenData.error_description });
    }

    const accessToken = tokenData.access_token;

    // Get user data from GitHub
    const userResponse = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
    });

    const userData = await userResponse.json();

    // Check if user exists in database
    let user = await User.findOne({ githubId: userData.id.toString() });
    
    if (user) {
      // Update existing user
      user.lastLogin = new Date();
      user.accessToken = accessToken;
      user.avatar_url = userData.avatar_url;
      user.name = userData.name;
      await user.save();
      console.log(`✅ User ${user.username} logged in`);
    } else {
      // Create new user
      user = new User({
        githubId: userData.id.toString(),
        username: userData.login,
        email: userData.email,
        name: userData.name,
        avatar_url: userData.avatar_url,
        accessToken: accessToken
      });
      await user.save();
      console.log(`New user ${user.username} created`);
    }

    // Generate JWT token
    const jwtToken = jwt.sign(
      { userId: user._id, githubId: user.githubId },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Return user data and token
    res.json({
      user: {
        id: user._id,
        githubId: user.githubId,
        login: user.username,
        name: user.name,
        email: user.email,
        avatar_url: user.avatar_url,
      },
      token: jwtToken,
    });
  } catch (error) {
    console.error("GitHub OAuth error:", error);
    res.status(500).json({ error: "Authentication failed" });
  }
});

// Get all passwords for authenticated user
app.get("/api/passwords", authenticateToken, async (req, res) => {
  try {
    const passwords = await Password.find({ userId: req.user._id }).sort({ createdAt: -1 });
    
    const passwordList = passwords.map(pwd => ({
      id: pwd._id,
      site: pwd.site,
      username: pwd.username,
      password: pwd.password, // In production, decrypt this
      createdAt: pwd.createdAt,
      updatedAt: pwd.updatedAt
    }));

    res.json({ passwords: passwordList });
  } catch (error) {
    console.error("Error fetching passwords:", error);
    res.status(500).json({ error: "Failed to fetch passwords" });
  }
});

// Save a new password
app.post("/api/passwords", authenticateToken, async (req, res) => {
  try {
    const { site, username, password } = req.body;

    if (!site || !username || !password) {
      return res.status(400).json({ error: "Site, username, and password are required" });
    }

    const newPassword = new Password({
      userId: req.user._id,
      site,
      username,
      password, // In production, encrypt this
    });

    await newPassword.save();
    console.log(`Password saved for ${req.user.username}: ${site}`);

    res.json({
      message: "Password saved successfully",
      password: {
        id: newPassword._id,
        site: newPassword.site,
        username: newPassword.username,
        password: newPassword.password,
        createdAt: newPassword.createdAt
      }
    });
  } catch (error) {
    console.error("Error saving password:", error);
    res.status(500).json({ error: "Failed to save password" });
  }
});

// Delete a password
app.delete("/api/passwords/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const password = await Password.findOneAndDelete({
      _id: id,
      userId: req.user._id
    });

    if (!password) {
      return res.status(404).json({ error: "Password not found" });
    }

    console.log(`Password deleted for ${req.user.username}: ${password.site}`);
    res.json({ message: "Password deleted successfully" });
  } catch (error) {
    console.error("Error deleting password:", error);
    res.status(500).json({ error: "Failed to delete password" });
  }
});

// Update a password
app.put("/api/passwords/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { site, username, password } = req.body;

    const updatedPassword = await Password.findOneAndUpdate(
      { _id: id, userId: req.user._id },
      { 
        site, 
        username, 
        password, // In production, encrypt this
        updatedAt: new Date()
      },
      { new: true }
    );

    if (!updatedPassword) {
      return res.status(404).json({ error: "Password not found" });
    }

    console.log(`Password updated for ${req.user.username}: ${updatedPassword.site}`);
    res.json({
      message: "Password updated successfully",
      password: {
        id: updatedPassword._id,
        site: updatedPassword.site,
        username: updatedPassword.username,
        password: updatedPassword.password,
        updatedAt: updatedPassword.updatedAt
      }
    });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ error: "Failed to update password" });
  }
});

// Initialize database connection
connectDB();

app.listen(5000, () => console.log("Backend running on port http://localhost:5000"));
