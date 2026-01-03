# PowerShell script to start both frontend and backend servers

Write-Host "🚀 Starting Password Manager Development Servers..." -ForegroundColor Green
Write-Host ""

# Check if .env file exists
if (-Not (Test-Path ".env")) {
    Write-Host "❌ ERROR: .env file not found!" -ForegroundColor Red
    Write-Host "Please create a .env file with your GitHub OAuth credentials." -ForegroundColor Yellow
    Write-Host "See GITHUB_AUTH_SETUP.md for instructions." -ForegroundColor Yellow
    exit 1
}

# Check if node_modules exists
if (-Not (Test-Path "node_modules")) {
    Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
    npm install
}

Write-Host "✅ Starting Backend Server (Port 5000)..." -ForegroundColor Cyan
Write-Host "✅ Starting Frontend Server (Port 5173/5174)..." -ForegroundColor Cyan
Write-Host ""
Write-Host "📖 Read GITHUB_AUTH_SETUP.md for complete setup instructions" -ForegroundColor Magenta
Write-Host ""

# Start backend in a new PowerShell window
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; Write-Host '🔧 BACKEND SERVER' -ForegroundColor Green; npm run server"

# Wait a moment for backend to start
Start-Sleep -Seconds 2

# Start frontend in current window
Write-Host "🎨 FRONTEND SERVER" -ForegroundColor Green
npm run dev
