@echo off
echo ========================================
echo Starting AI Learning Aggregator Backend
echo ========================================
echo.

REM Check if port 3001 is in use
netstat -ano | findstr :3001 >nul
if %errorlevel% == 0 (
    echo Port 3001 is already in use!
    echo Finding and killing existing process...
    for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3001 ^| findstr LISTENING') do (
        echo Killing process %%a
        taskkill /PID %%a /F >nul 2>&1
    )
    timeout /t 2 >nul
    echo.
)

echo Starting backend server...
echo Make sure you have a .env file with YOUTUBE_API_KEY set!
echo.

npm run dev:server

pause

