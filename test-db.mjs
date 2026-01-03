import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/passop');
    console.log('✅ MongoDB connected successfully');
    
    // Test User Schema
    const userSchema = new mongoose.Schema({
      githubId: String,
      username: String,
      email: String,
      name: String,
      avatar_url: String,
      createdAt: { type: Date, default: Date.now }
    });
    
    const User = mongoose.model('TestUser', userSchema);
    
    // Create a test user
    const testUser = new User({
      githubId: '12345',
      username: 'testuser',
      email: 'test@example.com',
      name: 'Test User',
      avatar_url: 'https://example.com/avatar.jpg'
    });
    
    await testUser.save();
    console.log('✅ Test user created:', testUser);
    
    // Find the user
    const foundUser = await User.findOne({ githubId: '12345' });
    console.log('✅ Found user:', foundUser);
    
    // Count users
    const userCount = await User.countDocuments();
    console.log('✅ Total users in database:', userCount);
    
    // Clean up - delete test user
    await User.deleteOne({ githubId: '12345' });
    console.log('✅ Test user deleted');
    
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Database test failed:', error);
    process.exit(1);
  }
};

connectDB();