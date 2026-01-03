# 🔐 GitHub Authentication Setup Guide

## ✅ Your Code is Complete!

All the necessary files are already set up:
- ✅ Backend OAuth endpoint (`index.mjs`)
- ✅ Authentication Context (`src/context/AuthContext.jsx`)
- ✅ Callback Handler (`src/components/AuthCallback.jsx`)
- ✅ Protected UI (`src/components/Navbar.jsx` & `Manager.jsx`)
- ✅ React Router setup (`src/App.jsx`)

## 📋 Steps to Make It Work

### Step 1: Create GitHub OAuth App (if not done)

1. Go to **https://github.com/settings/developers**
2. Click **"New OAuth App"** or use your existing one
3. Fill in the details:
   - **Application name**: Password Manager (or any name)
   - **Homepage URL**: `http://localhost:5173`
   - **Authorization callback URL**: `http://localhost:5174/auth/callback`
     - ⚠️ **IMPORTANT**: Must be **exactly** `http://localhost:5173/auth/callback`
4. Click **"Register application"**
5. You'll see:
   - **Client ID**: `Ov23liaThlVYfXHVteZd` (you already have this)
   - Click **"Generate a new client secret"** to get your secret

### Step 2: Add GitHub Client Secret to .env File

Open the `.env` file in your project root and replace `your_github_client_secret_here` with your actual secret:

```env
# GitHub OAuth Configuration
GITHUB_CLIENT_ID=Ov23liaThlVYfXHVteZd
GITHUB_CLIENT_SECRET=your_actual_secret_here_from_github
GITHUB_CALLBACK_URL=http://localhost:51736/auth/callback
```

**⚠️ NEVER commit the .env file to GitHub!** (It's already in `.gitignore`)

### Step 3: Install Dependencies (if not done)

```bash
npm install
```

### Step 4: Start Both Servers

You need to run **TWO terminals**:

**Terminal 1 - Backend Server:**
```bash
npm run server
```
This starts the Express backend on `http://localhost:5000`

**Terminal 2 - Frontend Dev Server:**
```bash
npm run dev
```
This starts Vite on `http://localhost:5173` or `http://localhost:5174`

### Step 5: Test the Login Flow

1. Open your browser to the Vite URL (check Terminal 2 output)
2. Click the **"GitHub"** button in the navbar
3. You'll be redirected to GitHub to authorize
4. After authorization, you'll be redirected back and logged in!
5. Your profile picture and name will appear in the navbar

## 🔍 Troubleshooting

### "Redirect URI mismatch" error
- Go to your GitHub OAuth App settings
- Make sure the callback URL is **exactly**: `http://localhost:5174/auth/callback`
- Check the Vite dev server port (in Terminal 2) - it should match the callback URL port

### "Authentication failed" error
- Make sure the backend server is running (`npm run server`)
- Check that your Client Secret is correct in `.env`
- Look at Terminal 1 for backend error messages

### Backend not responding
- Make sure port 5000 is not in use
- Check Terminal 1 for any error messages
- Verify your `.env` file has the correct values

### CORS errors
- The backend already has CORS enabled
- Make sure both servers are running
- Check browser console for specific error messages

## 🎉 Success Checklist

- [ ] GitHub OAuth App created with correct callback URL
- [ ] Client Secret added to `.env` file
- [ ] Both servers running (backend on 5000, frontend on 5173/5174)
- [ ] Can click "GitHub" button and see GitHub authorization page
- [ ] After authorization, redirected back to app
- [ ] Profile picture and name appear in navbar
- [ ] Can click "Logout" to sign out

## 📝 Quick Start Script

You can use the provided `start-dev.ps1` script to start both servers at once!

```bash
.\start-dev.ps1
```

This will open two terminal windows - one for backend, one for frontend.
