@echo off
echo Starting AI Learning Aggregator...
echo.

REM Check if port 3001 is in use
netstat -ano | findstr :3001 >nul
if %errorlevel% == 0 (
    echo Port 3001 is already in use!
    echo Trying to find and kill the process...
    for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3001') do (
        echo Killing process %%a
        taskkill /PID %%a /F >nul 2>&1
    )
    timeout /t 2 >nul
)

echo Starting backend server...
start "Backend Server" cmd /k "npm run dev:server"

timeout /t 3 >nul

echo Starting frontend...
start "Frontend" cmd /k "npm run dev"

echo.
echo Both servers are starting...
echo Backend: http://localhost:3001
echo Frontend: http://localhost:5173
echo.
echo Press any key to close this window (servers will keep running)...
pause >nul

