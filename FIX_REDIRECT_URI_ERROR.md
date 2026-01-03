# 🔧 Fix: "redirect_uri is not associated" Error

## Problem
You're seeing this error when clicking the GitHub login button:
```
The redirect_uri is not associated with this application.
```

## Root Cause
Your GitHub OAuth App's callback URL doesn't match what your code is using.

---

## ✅ SOLUTION (Choose ONE)

### Option 1: Update GitHub OAuth App Settings (EASIEST)

1. **Go to GitHub Developer Settings:**
   - Visit: https://github.com/settings/developers
   - Or: GitHub → Settings → Developer settings → OAuth Apps

2. **Select Your OAuth App:**
   - Click on your app (the one with Client ID: `Ov23liaThlVYfXHVteZd`)

3. **Update Authorization callback URL:**
   ```
   http://localhost:5173/auth/callback
   ```
   ⚠️ **IMPORTANT:** Must be EXACTLY this URL (no trailing slash, correct port)

4. **Click "Update application"**

5. **Test the login** - It should work now!

---

### Option 2: Already Fixed in Code! ✓

I've already updated your code files to use **port 5173** instead of 5174:
- ✅ `.env` - Updated callback URL
- ✅ `Navbar.jsx` - Updated redirect URI

**Now you MUST update your GitHub OAuth App to match!**

---

## 📋 Current Configuration

| Setting | Value |
|---------|-------|
| **Vite Dev Server** | `http://localhost:5173` |
| **Backend Server** | `http://localhost:5000` |
| **Callback URL** | `http://localhost:5173/auth/callback` |
| **GitHub Client ID** | `Ov23liaThlVYfXHVteZd` |

---

## 🚀 Testing Steps

After updating your GitHub OAuth App:

1. **Start Backend Server:**
   ```powershell
   node index.mjs
   ```
   Should show: "Server running on port 5000"

2. **Start Frontend (in new terminal):**
   ```powershell
   npm run dev
   ```
   Should show: "Local: http://localhost:5173/"

3. **Test Login:**
   - Open: http://localhost:5173
   - Click "GitHub" button
   - Should redirect to GitHub authorization
   - After approving, should redirect back with your profile

---

## 🐛 Troubleshooting

### Still seeing the error?
- ✅ Check GitHub OAuth App settings match **EXACTLY**: `http://localhost:5173/auth/callback`
- ✅ No typos, no extra spaces, no trailing slash
- ✅ Use http:// (not https:// for localhost)
- ✅ Port is 5173 (not 5174 or any other port)

### Wrong port in browser?
- Check `vite.config.js` - should not override the default port
- Kill any process on port 5173: 
  ```powershell
  netstat -ano | findstr :5173
  taskkill /F /PID <PID>
  ```

### Backend errors?
- Make sure `.env` file has your `GITHUB_CLIENT_SECRET`
- Backend must be running on port 5000
- Check console for "Server running on port 5000"

---

## 📸 What Success Looks Like

1. **Backend Terminal:**
   ```
   Server running on port 5000
   ```

2. **Frontend Terminal:**
   ```
   VITE v7.1.7  ready in 949 ms
   ➜  Local:   http://localhost:5173/
   ```

3. **Browser:**
   - See "GitHub" button in navbar
   - Click it → GitHub authorization page
   - After approval → redirects to your app
   - See your GitHub profile picture and name in navbar
   - "GitHub" button changes to "Logout"

---

## ⚠️ IMPORTANT NOTES

1. **Both servers must be running** (backend on 5000, frontend on 5173)
2. **GitHub OAuth App callback MUST be**: `http://localhost:5173/auth/callback`
3. **Case sensitive** - use lowercase
4. **No trailing slash** in the callback URL
5. **Test in incognito mode** if you have caching issues

---

## 🎯 Quick Checklist

- [ ] Updated GitHub OAuth App callback URL to `http://localhost:5173/auth/callback`
- [ ] Backend server running (node index.mjs)
- [ ] Frontend server running (npm run dev)
- [ ] Both servers show no errors
- [ ] Browser shows the app at http://localhost:5173
- [ ] Clicked GitHub button → redirected to GitHub
- [ ] Authorized app → redirected back successfully
- [ ] Profile picture appears in navbar

---

**Need more help?** Check the browser console (F12) for error messages!
