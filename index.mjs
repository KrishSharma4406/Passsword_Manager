import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// GitHub OAuth configuration
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID || "Ov23liaThlVYfXHVteZd";
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from backend!" });
  console.log("Hello from backend!")
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

    // Return user data and token
    res.json({
      user: {
        id: userData.id,
        login: userData.login,
        name: userData.name,
        email: userData.email,
        avatar_url: userData.avatar_url,
      },
      token: accessToken,
    });
  } catch (error) {
    console.error("GitHub OAuth error:", error);
    res.status(500).json({ error: "Authentication failed" });
  }
});

app.listen(5000, () => console.log("Backend running on port http://localhost:5000"));