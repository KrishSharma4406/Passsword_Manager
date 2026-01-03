import Navbar from './components/Navbar'
import Manager from './components/Manager'
import Footer from './components/Footer'
import AuthCallback from './components/AuthCallback'
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'

function App() {
  return (
    <Router>
      <AuthProvider>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Manager />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
          </Routes>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  )
}

export default App