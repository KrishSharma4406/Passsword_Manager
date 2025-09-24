import React from 'react'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();

  const loginWithGitHub = () => {
    // Use the callback URL configured in your GitHub OAuth App
    // If you specify redirect_uri, it MUST match exactly what's in GitHub settings
    const redirectUri = encodeURIComponent('http://localhost:5174/auth/callback');
    window.location.href =
      `https://github.com/login/oauth/authorize?client_id=Ov23liaThlVYfXHVteZd&scope=user&redirect_uri=${redirectUri}`;
  };

  return (
    <nav className='bg-slate-700 text-white flex justify-around p-4 mx-auto items-center px-8'>
        <div className="logo font-bold text-2xl">
            <span className='text-green-500'>&lt;</span>
            Pass
            <span className='text-green-500'>OP/&gt;</span>
        </div>
        
        {isAuthenticated ? (
          <div className="flex gap-4 items-center">
            <div className="flex items-center gap-3">
              <img 
                src={user.avatar_url} 
                alt={user.login} 
                className="w-8 h-8 rounded-full border-2 border-green-500"
              />
              <span className="text-white font-medium">{user.name || user.login}</span>
            </div>
            <button 
              className="cursor-pointer flex gap-2 items-center font-bold text-[16px] bg-red-600 rounded-full px-4 py-1 hover:bg-red-500 hover:text-white ring-white ring-1"
              onClick={logout}
            >
              <span>Logout</span>
            </button>
          </div>
        ) : (
          <button 
            className="cursor-pointer flex gap-2 items-center font-bold text-[18px] bg-green-600 rounded-full px-4 py-1 hover:bg-green-500 hover:text-white ring-white ring-1" 
            onClick={loginWithGitHub}
          >
            <i className="bi bi-github"></i>
            <span>GitHub</span>
          </button>
        )}
    </nav>
  )
}

export default Navbar