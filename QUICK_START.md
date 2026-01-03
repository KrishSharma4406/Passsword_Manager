# 🚀 QUICK START GUIDE - GitHub Authentication# Quick Start Guide - GitHub Authentication Setup



## ✅ What You Have## ✅ What's Been Implemented



All code is complete and ready! You have:Your password manager now has **full GitHub OAuth authentication**! Here's what was added:

- ✅ Backend OAuth server (index.mjs)

- ✅ Frontend authentication UI### 📁 New Files Created:

- ✅ Protected password manager1. **`.env`** - Environment variables for GitHub OAuth

- ✅ User profile display2. **`src/context/AuthContext.jsx`** - Authentication state management

- ✅ Login/logout functionality3. **`src/components/AuthCallback.jsx`** - Handles OAuth redirect

4. **`SETUP_GUIDE.md`** - Complete documentation

## 🎯 What You Need To Do (3 Steps)5. **`.gitignore`** - Protects sensitive files



### Step 1: Create GitHub OAuth App (5 minutes)### 🔧 Modified Files:

1. **`index.mjs`** - Added OAuth callback endpoint

1. Go to: https://github.com/settings/developers2. **`src/App.jsx`** - Added routing and AuthProvider

2. Click "New OAuth App"3. **`src/components/Navbar.jsx`** - Shows user profile when logged in

3. Enter:4. **`src/components/Manager.jsx`** - Protected by authentication

   - Name: `Password Manager`5. **`postcss.config.js`** - Fixed PostCSS plugin issue

   - URL: `http://localhost:5173`

   - Callback: `http://localhost:5174/auth/callback` ⚠️ EXACT URL---

4. Click "Register application"

5. Copy the **Client Secret** (generate if needed)## 🚀 To Complete Setup



### Step 2: Update .env File (1 minute)### Step 1: Install Required Packages

```bash

Open `.env` file and paste your secret:npm install axios dotenv react-router-dom

```

```env

GITHUB_CLIENT_ID=Ov23liaThlVYfXHVteZd### Step 2: Update Your GitHub Client Secret

GITHUB_CLIENT_SECRET=paste_your_secret_here

GITHUB_CALLBACK_URL=http://localhost:5174/auth/callbackEdit `.env` file and replace `your_github_client_secret_here` with your actual GitHub OAuth App Client Secret.

```

If you don't have a GitHub OAuth App yet:

### Step 3: Start Both Servers (1 minute)1. Go to: https://github.com/settings/developers

2. Click "New OAuth App"

**Windows (PowerShell):**3. Fill in:

```powershell   - **Application name**: PassOP

.\start-dev.ps1   - **Homepage URL**: http://localhost:5174

```   - **Authorization callback URL**: http://localhost:5174/auth/callback

4. Click "Register application"

**OR manually in 2 terminals:**5. Copy the Client Secret and update `.env`

```bash

# Terminal 1### Step 3: Start Both Servers

npm run server

**Terminal 1 - Backend Server:**

# Terminal 2  ```bash

npm run devnode index.mjs

``````



## 🎉 Test It!**Terminal 2 - Frontend Dev Server:**

```bash

1. Open browser to `http://localhost:5173` (or 5174)npm run dev

2. Click green "GitHub" button```

3. Authorize on GitHub

4. See your profile picture ✅### Step 4: Test Authentication

5. Use password manager ✅

1. Open browser to: http://localhost:5174

## ❌ Common Problems2. Click "Login with GitHub"

3. Authorize the app

**"Redirect URI mismatch"**4. You'll be redirected back and see your profile in the navbar!

→ GitHub app callback must be: `http://localhost:5174/auth/callback`

---

**"Authentication failed"**

→ Check `.env` has correct secret## 🎯 How It Works

→ Restart backend: `npm run server`

1. **Login Button** → User clicks "Login with GitHub" in navbar

**Backend not running**2. **GitHub OAuth** → User authorizes on GitHub's page

→ Terminal 1 should say "Backend running on port http://localhost:5000"3. **Callback** → GitHub redirects to `/auth/callback` with code

4. **Token Exchange** → Backend exchanges code for access token

## 📚 Full Documentation5. **User Data** → Backend fetches user profile from GitHub API

6. **Authentication** → User data saved to localStorage

- `GITHUB_AUTH_SETUP.md` - Detailed setup7. **Protected Access** → Password manager is now accessible!

- `TESTING_GUIDE.md` - Complete testing checklist

- `README.md` - Full project documentation---



## 💡 Pro Tip## 🔐 Security Features



Use browser DevTools (F12) to debug:✅ Client secret only used on backend

- Console tab: See errors✅ Access tokens stored in localStorage

- Network tab: See API calls✅ Password manager only accessible after login

- Application tab: Check localStorage✅ User profile displayed in navbar

✅ Logout functionality clears all auth data

---

---

**That's it! 3 steps and you're done! 🎊**

## 🐛 Troubleshooting

**"Cannot find module 'axios'" or similar errors?**
→ Run: `npm install axios dotenv react-router-dom`

**OAuth redirect not working?**
→ Check callback URL matches exactly: `http://localhost:5174/auth/callback`

**Backend not responding?**
→ Make sure `node index.mjs` is running on port 5000

**PostCSS error?**
→ Already fixed! The postcss.config.js has been updated.

---

## ✨ Next Steps (Optional Enhancements)

- [ ] Add password encryption before saving
- [ ] Implement MongoDB for cloud storage
- [ ] Add password strength meter
- [ ] Add export/import functionality
- [ ] Implement 2FA

---

**Need Help?** Check SETUP_GUIDE.md for detailed documentation!
