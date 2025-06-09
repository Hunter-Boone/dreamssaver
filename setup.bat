@echo off
echo 🌙 Dreams Saver - Setup Script
echo ==============================

REM Check if .env.local exists
if not exist ".env.local" (
    echo ❌ .env.local file not found!
    echo 📝 Please copy .env.example to .env.local and fill in your API keys:
    echo    copy .env.example .env.local
    echo.
    echo 🔑 Required API keys:
    echo    - Supabase URL and keys
    echo    - Google Gemini AI key  
    echo    - Stripe keys
    echo.
    pause
    exit /b 1
)

echo ✅ .env.local file found

REM Install dependencies
echo 📦 Installing dependencies...
call npm install

if errorlevel 1 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

echo ✅ Dependencies installed successfully

echo.
echo 🎉 Setup complete!
echo.
echo 🚀 To start the development server:
echo    npm run dev
echo.
echo 🌐 Open http://localhost:3000 in your browser
echo.
echo 📚 Don't forget to set up your Supabase database schema!
echo    Check the README.md for SQL schema setup instructions
echo.
pause
