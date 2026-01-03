# GitHub Authentication - Quick Start Script

Write-Host "`n=== GitHub OAuth Authentication Setup ===" -ForegroundColor Cyan
Write-Host "Current Configuration:" -ForegroundColor Yellow
Write-Host "  Frontend: http://localhost:5174" -ForegroundColor Green
Write-Host "  Backend:  http://localhost:5000" -ForegroundColor Green
Write-Host "  Callback: http://localhost:5174/auth/callback" -ForegroundColor Green

Write-Host "`n1. Checking if backend dependencies are installed..." -ForegroundColor Yellow
npm list express cors dotenv --depth=0 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "  Installing backend dependencies..." -ForegroundColor Red
    npm install express cors dotenv
}
Write-Host "  ✓ Dependencies OK" -ForegroundColor Green

Write-Host "`n2. Starting backend server on port 5000..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-NoProfile", "-Command", @"
    Write-Host '=== Backend Server ===' -ForegroundColor Cyan;
    cd '$PWD';
    Write-Host 'Starting Express server...' -ForegroundColor Yellow;
    node index.mjs
"@
Start-Sleep -Seconds 2
Write-Host "  ✓ Backend server started in new window" -ForegroundColor Green

Write-Host "`n3. Testing backend connection..." -ForegroundColor Yellow
Start-Sleep -Seconds 1
try {
    $response = Invoke-WebRequest -Uri "http://localhost:5000/api/hello" -UseBasicParsing -TimeoutSec 5 -ErrorAction Stop
    Write-Host "  ✓ Backend is responding!" -ForegroundColor Green
} catch {
    Write-Host "  ⚠ Backend not responding yet (may need a moment to start)" -ForegroundColor Red
}

Write-Host "`n4. Frontend server status:" -ForegroundColor Yellow
$viteProcess = Get-Process -Name "node" -ErrorAction SilentlyContinue | Where-Object { $_.Path -like "*node.exe" }
if ($viteProcess) {
    Write-Host "  ✓ Vite dev server appears to be running" -ForegroundColor Green
} else {
    Write-Host "  ⚠ Vite may not be running. Start it with: npm run dev" -ForegroundColor Red
}

Write-Host "`n=== IMPORTANT: Update GitHub OAuth App ===" -ForegroundColor Red -BackgroundColor Yellow
Write-Host "`n⚠️  YOU MUST UPDATE YOUR GITHUB OAUTH APP SETTINGS:" -ForegroundColor Red
Write-Host "`n  1. Go to: https://github.com/settings/developers" -ForegroundColor Cyan
Write-Host "  2. Click on your OAuth App" -ForegroundColor Cyan
Write-Host "  3. Update 'Authorization callback URL' to:" -ForegroundColor Cyan
Write-Host "     http://localhost:5174/auth/callback" -ForegroundColor Green -BackgroundColor Black
Write-Host "  4. Click 'Update application'" -ForegroundColor Cyan

Write-Host "`n=== Ready to Test! ===" -ForegroundColor Green
Write-Host "`n  1. Open: http://localhost:5174" -ForegroundColor Cyan
Write-Host "  2. Click the 'GitHub' button" -ForegroundColor Cyan
Write-Host "  3. Authorize on GitHub" -ForegroundColor Cyan
Write-Host "  4. See your profile in the navbar!" -ForegroundColor Cyan

Write-Host "`n=== Troubleshooting ===" -ForegroundColor Yellow
Write-Host "  • If login fails, check browser console (F12)" -ForegroundColor White
Write-Host "  • Make sure BOTH servers are running" -ForegroundColor White
Write-Host "  • Verify GitHub OAuth callback URL matches port 5174" -ForegroundColor White
Write-Host "  • Check AUTHENTICATION_FIXED.md for detailed help" -ForegroundColor White

Write-Host "`n=== Server Status ===" -ForegroundColor Cyan
Write-Host "  Backend:  Check the new PowerShell window" -ForegroundColor White
Write-Host "  Frontend: Should show in current terminal" -ForegroundColor White

Write-Host "`nPress any key to open browser..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
Start-Process "http://localhost:5174"
