# 🧪 Testing Your GitHub Authentication

## Quick Test Steps

### 1. Verify GitHub OAuth App Setup
- [ ] Go to https://github.com/settings/developers
- [ ] Open your OAuth App
- [ ] Verify **Authorization callback URL** is: `http://localhost:5174/auth/callback`
- [ ] Note your **Client ID**: `Ov23liaThlVYfXHVteZd`
- [ ] Copy your **Client Secret** (you may need to regenerate it)

### 2. Update .env File
```bash
# Edit .env file and add your real Client Secret:
GITHUB_CLIENT_ID=Ov23liaThlVYfXHVteZd
GITHUB_CLIENT_SECRET=ghp_xxxxxxxxxxxxxxxxxxxx  # Your actual secret here
GITHUB_CALLBACK_URL=http://localhost:5174/auth/callback
```

### 3. Start Servers

**Option A: Using PowerShell Script (Windows)**
```powershell
.\start-dev.ps1
```

**Option B: Manually (Two Terminals)**

Terminal 1:
```bash
npm run server
```
Expected output: `Backend running on port http://localhost:5000`

Terminal 2:
```bash
npm run dev
```
Expected output: `Local: http://localhost:5173` (or 5174)

### 4. Test Login Flow

1. **Open Browser**: Go to the URL from Terminal 2 (usually http://localhost:5173 or 5174)

2. **Check Initial State**: 
   - ✅ Should see "PassOP" logo
   - ✅ Should see green "GitHub" button
   - ✅ Should NOT see password manager form (requires login)
   - ✅ Should see "Please login with your GitHub account" message

3. **Click GitHub Button**:
   - ✅ Browser redirects to GitHub authorization page
   - ✅ URL starts with: `https://github.com/login/oauth/authorize`
   - ✅ Shows app name and permissions requested (user info)

4. **Authorize App**:
   - ✅ Click green "Authorize [your-username]" button
   - ✅ Browser redirects to: `http://localhost:5174/auth/callback?code=...`
   - ✅ Shows loading spinner: "Authenticating with GitHub..."
   - ✅ After 1-2 seconds, redirects to home page

5. **Verify Logged In**:
   - ✅ Your GitHub profile picture appears in navbar
   - ✅ Your GitHub name appears next to picture
   - ✅ Red "Logout" button replaces "GitHub" button
   - ✅ Password manager form is now visible
   - ✅ Can add/edit/delete passwords

6. **Test Logout**:
   - ✅ Click red "Logout" button
   - ✅ Profile picture and name disappear
   - ✅ Green "GitHub" button reappears
   - ✅ Password manager form hidden
   - ✅ "Please login" message shows again

7. **Test Persistence** (Refresh):
   - ✅ Login again with GitHub
   - ✅ Refresh the page (F5)
   - ✅ Should STAY logged in (no redirect to GitHub)
   - ✅ Profile and password form still visible

## 🐛 Common Issues & Fixes

### Issue: "Redirect URI mismatch"
**Cause**: Callback URL in GitHub settings doesn't match the one in code

**Fix**:
1. Check Vite dev server port (Terminal 2 output)
2. If it says `http://localhost:5173`, update GitHub OAuth App callback to `http://localhost:5173/auth/callback`
3. If it says `http://localhost:5174`, it should already match
4. Update Navbar.jsx if needed to match the port

### Issue: "Application not found" or "Bad credentials"
**Cause**: Wrong Client ID or Client Secret

**Fix**:
1. Go to https://github.com/settings/developers
2. Verify Client ID matches: `Ov23liaThlVYfXHVteZd`
3. Regenerate Client Secret if needed
4. Update `.env` file with new secret
5. Restart backend server (Terminal 1: Ctrl+C, then `npm run server`)

### Issue: Backend not responding / CORS error
**Cause**: Backend server not running or wrong port

**Fix**:
1. Check Terminal 1 - should say "Backend running on port http://localhost:5000"
2. If not running, start it: `npm run server`
3. Check if port 5000 is in use: `netstat -ano | findstr :5000` (Windows)
4. If another app using port 5000, kill it or change backend port

### Issue: "Failed to authenticate" error on callback
**Cause**: Client Secret missing or incorrect

**Fix**:
1. Check `.env` file has `GITHUB_CLIENT_SECRET=ghp_...`
2. Secret must start with `ghp_` or `ghs_`
3. No spaces or quotes around the secret
4. Restart backend after changing `.env`

### Issue: Infinite loading on callback page
**Cause**: Backend not accessible or CORS issue

**Fix**:
1. Open browser console (F12) → Network tab
2. Look for POST to `http://localhost:5000/api/auth/github/callback`
3. Check response - should be 200 OK with user data
4. If 500 error, check Terminal 1 for backend error logs
5. If CORS error, verify backend `cors()` middleware is enabled

### Issue: Can't see profile picture after login
**Cause**: Avatar URL blocked or AuthContext not updating

**Fix**:
1. Open browser console (F12) → Look for errors
2. Check localStorage: Should have `github_user` and `github_token`
3. If storage empty, check AuthCallback component is saving data
4. If data present but not showing, check Navbar component

## 📊 Success Indicators

### In Browser Console (F12 → Console)
```
✅ No red errors
✅ When clicking GitHub button: Redirect to github.com
✅ On callback: POST to localhost:5000 → Status 200
✅ localStorage.github_user contains your profile
✅ localStorage.github_token contains access token
```

### In Terminal 1 (Backend)
```
✅ Backend running on port http://localhost:5000
✅ On callback: No error messages
✅ GitHub API responses successful
```

### In Terminal 2 (Frontend)
```
✅ Vite dev server running
✅ No build errors
✅ HMR (Hot Module Replacement) working
```

## 🎉 Complete Test Checklist

- [ ] Backend server running on port 5000
- [ ] Frontend server running on port 5173 or 5174
- [ ] GitHub OAuth App callback URL matches frontend port
- [ ] .env file has valid Client Secret
- [ ] Can click "GitHub" button → redirects to GitHub
- [ ] Can authorize app → redirects back to app
- [ ] Profile picture and name appear after login
- [ ] Password manager form visible after login
- [ ] Can add a test password
- [ ] Can logout successfully
- [ ] After refresh, still logged in (persistence works)
- [ ] After logout + refresh, need to login again

## 💡 Pro Tips

1. **Check Browser Console**: Always have F12 developer tools open during testing
2. **Watch Backend Logs**: Keep Terminal 1 visible to see API requests
3. **Test Incognito**: Use incognito mode to test fresh login flow
4. **Clear Storage**: If things act weird, clear localStorage and try again
5. **Regenerate Secret**: If login keeps failing, regenerate GitHub Client Secret

## 🔒 Security Notes

- ✅ `.env` file is in `.gitignore` - NEVER commit it
- ✅ Client Secret is only used in backend (server-side)
- ✅ Access token stored in localStorage (for this demo)
- ⚠️ For production, use secure HTTP-only cookies instead of localStorage
- ⚠️ Add token expiration and refresh logic for production
