# PassOP - Password Manager with GitHub Authentication

A secure password manager built with React, Vite, and Express that uses GitHub OAuth for authentication.

## Features

- 🔐 **GitHub OAuth Authentication** - Secure login with your GitHub account
- 💾 **Local Storage** - Passwords stored securely in your browser
- ✨ **Modern UI** - Beautiful interface with Tailwind CSS
- 🔒 **Protected Access** - Password manager only accessible after authentication
- 👤 **User Profile** - Display GitHub profile information in navbar

## Prerequisites

Before you begin, ensure you have:
- Node.js (v14 or higher)
- npm or yarn
- A GitHub OAuth App (for authentication)

## GitHub OAuth Setup

1. Go to GitHub Settings → Developer settings → OAuth Apps
2. Click "New OAuth App"
3. Fill in the details:
   - **Application name**: PassOP (or your preferred name)
   - **Homepage URL**: `http://localhost:5174`
   - **Authorization callback URL**: `http://localhost:5174/auth/callback`
4. Click "Register application"
5. Copy your **Client ID** and **Client Secret**

## Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd password-man
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install additional required packages**
   ```bash
   npm install axios dotenv react-router-dom
   ```

4. **Configure environment variables**
   
   Edit the `.env` file in the root directory and add your GitHub credentials:
   ```env
   GITHUB_CLIENT_ID=your_client_id_here
   GITHUB_CLIENT_SECRET=your_client_secret_here
   GITHUB_CALLBACK_URL=http://localhost:5174/auth/callback
   ```

5. **Update Navbar.jsx with your Client ID**
   
   Open `src/components/Navbar.jsx` and update the client ID in the OAuth URL:
   ```javascript
   const loginWithGitHub = () => {
     window.location.href =
       `https://github.com/login/oauth/authorize?client_id=YOUR_CLIENT_ID&scope=user&redirect_uri=http://localhost:5174/auth/callback`;
   };
   ```

## Running the Application

### Development Mode

You need to run both the frontend and backend servers:

1. **Start the backend server** (in one terminal):
   ```bash
   node index.mjs
   ```

2. **Start the frontend development server** (in another terminal):
   ```bash
   npm run dev
   ```

3. **Open your browser** and navigate to:
   ```
   http://localhost:5174
   ```

## Project Structure

```
password-man/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Navigation with auth status
│   │   ├── Manager.jsx          # Password manager (protected)
│   │   ├── Footer.jsx           # Footer component
│   │   └── AuthCallback.jsx    # OAuth callback handler
│   ├── context/
│   │   └── AuthContext.jsx     # Authentication state management
│   ├── App.jsx                  # Main app with routing
│   └── main.jsx                 # Entry point
├── index.mjs                    # Express backend server
├── .env                         # Environment variables (not in git)
└── package.json                 # Dependencies
```

## How Authentication Works

1. **User clicks "Login with GitHub"** → Redirected to GitHub OAuth page
2. **User authorizes the app** → GitHub redirects back with an authorization code
3. **AuthCallback component** receives the code and sends it to the backend
4. **Backend exchanges code** for an access token with GitHub
5. **Backend fetches user data** from GitHub API
6. **User data and token** are stored in localStorage
7. **User is redirected** to the main password manager page

## Security Notes

- **Never commit your `.env` file** - It contains sensitive credentials
- **Client Secret** should only be used on the backend server
- **Passwords are stored locally** in browser localStorage
- For production, consider:
  - Using a proper database for password storage
  - Encrypting passwords before storage
  - Implementing server-side session management
  - Using HTTPS for all communications

## API Endpoints

### Backend (Express - Port 5000)

- `GET /api/hello` - Test endpoint
- `POST /api/auth/github/callback` - GitHub OAuth callback handler
  - Body: `{ code: "authorization_code" }`
  - Returns: `{ user: {...}, token: "access_token" }`

## Troubleshooting

### "Pre-transform error: PostCSS plugin" Error
This has been fixed by updating `postcss.config.js` to use `@tailwindcss/postcss`.

### OAuth Redirect Not Working
- Ensure the callback URL in your GitHub OAuth App matches exactly: `http://localhost:5174/auth/callback`
- Check that your client ID is correct in both `.env` and `Navbar.jsx`

### Backend Not Connecting
- Make sure the backend server is running on port 5000
- Check that CORS is enabled in `index.mjs`

## Technologies Used

- **Frontend**: React 19, Vite, Tailwind CSS, React Router
- **Backend**: Express.js, Node.js
- **Authentication**: GitHub OAuth 2.0
- **UI Components**: React Toastify, Lord Icons
- **State Management**: React Context API

## Future Enhancements

- [ ] Add password encryption
- [ ] Implement database storage (MongoDB/PostgreSQL)
- [ ] Add password strength indicator
- [ ] Export/Import password data
- [ ] Two-factor authentication
- [ ] Password generation with custom rules
- [ ] Search and filter passwords
- [ ] Browser extension

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

ISC License

---

Built with ❤️ using React and GitHub OAuth
