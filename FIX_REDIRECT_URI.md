# Fix: GitHub OAuth Redirect URI Error

## Error Message:
```
The redirect_uri is not associated with this application.
The application might be misconfigured or could be trying to redirect 
you to a website you weren't expecting.
```

## ✅ Solution Steps:

### Step 1: Check Your GitHub OAuth App Settings

1. Go to: **https://github.com/settings/developers**
2. Click on your OAuth App (or create a new one if you don't have it)
3. Verify the **"Authorization callback URL"** field

### Step 2: Update the Callback URL

**Important:** The callback URL MUST match EXACTLY (including port number).

Since your Vite dev server is running on **port 5174**, set it to:
```
http://localhost:5174/auth/callback
```

**Screenshot of what it should look like:**
```
┌─────────────────────────────────────────────────────┐
│ Application name:              PassOP                │
│ Homepage URL:                  http://localhost:5174 │
│ Authorization callback URL:    http://localhost:5174/auth/callback │
│ Application description:       (optional)            │
└─────────────────────────────────────────────────────┘
```

### Step 3: Save Changes

Click **"Update application"** button at the bottom of the page.

### Step 4: Test Again

1. Refresh your app in the browser
2. Click "Login with GitHub" again
3. The error should be resolved!

---

## 🔍 Common Issues:

### Issue 1: Port Mismatch
**Problem:** Your app is running on port 5173 but OAuth is configured for 5174 (or vice versa)

**Solution:** Check which port Vite is actually using:
- Look at terminal output when running `npm run dev`
- Update GitHub OAuth settings to match

### Issue 2: Missing Protocol
**Problem:** Using `localhost:5174` instead of `http://localhost:5174`

**Solution:** Always include `http://` in the callback URL

### Issue 3: Trailing Slash
**Problem:** Callback URL has a trailing slash: `http://localhost:5174/auth/callback/`

**Solution:** Remove the trailing slash - it should be: `http://localhost:5174/auth/callback`

### Issue 4: Multiple Callback URLs
**Problem:** GitHub OAuth Apps only allow ONE callback URL

**Solution:** 
- For development: `http://localhost:5174/auth/callback`
- For production: Deploy and add your production URL (e.g., `https://yourdomain.com/auth/callback`)
- You might need separate OAuth Apps for dev and production

---

## 🔄 Alternative: Remove redirect_uri Parameter

If you're having persistent issues, you can let GitHub use the default callback URL:

### Current code (explicit redirect_uri):
```javascript
const loginWithGitHub = () => {
  const redirectUri = encodeURIComponent('http://localhost:5174/auth/callback');
  window.location.href =
    `https://github.com/login/oauth/authorize?client_id=Ov23liaThlVYfXHVteZd&scope=user&redirect_uri=${redirectUri}`;
};
```

### Alternative (use default from OAuth App):
```javascript
const loginWithGitHub = () => {
  // GitHub will use the callback URL from your OAuth App settings
  window.location.href =
    `https://github.com/login/oauth/authorize?client_id=Ov23liaThlVYfXHVteZd&scope=user`;
};
```

---

## ✅ Verification Checklist:

Before testing again, verify:

- [ ] GitHub OAuth App exists at https://github.com/settings/developers
- [ ] Authorization callback URL is EXACTLY: `http://localhost:5174/auth/callback`
- [ ] No trailing slashes in the callback URL
- [ ] `http://` protocol is included
- [ ] Port number matches your Vite dev server (check terminal)
- [ ] You clicked "Update application" to save changes
- [ ] You've refreshed your browser

---

## 🎯 Quick Fix Summary:

**1. Go here:** https://github.com/settings/developers
**2. Set callback to:** `http://localhost:5174/auth/callback`
**3. Click:** "Update application"
**4. Try again!**

---

## 📝 Notes:

- The redirect URI is **case-sensitive** and must match **exactly**
- Port numbers matter! If Vite uses port 5173, use that instead
- For production, you'll need to update this to your production domain
- You can have separate OAuth Apps for development and production environments

---

**Still having issues?** Double-check the port number in your terminal where Vite is running!
