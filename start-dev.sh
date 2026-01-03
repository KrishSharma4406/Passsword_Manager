#!/usr/bin/env bash
# Bash script for Linux/Mac users to start both servers

echo "🚀 Starting Password Manager Development Servers..."
echo ""

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "❌ ERROR: .env file not found!"
    echo "Please create a .env file with your GitHub OAuth credentials."
    echo "See GITHUB_AUTH_SETUP.md for instructions."
    exit 1
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

echo "✅ Starting Backend Server (Port 5000)..."
echo "✅ Starting Frontend Server (Port 5173/5174)..."
echo ""
echo "📖 Read GITHUB_AUTH_SETUP.md for complete setup instructions"
echo ""

# Start backend in background
echo "🔧 BACKEND SERVER"
npm run server &

# Wait a moment for backend to start
sleep 2

# Start frontend in foreground
echo "🎨 FRONTEND SERVER"
npm run dev
