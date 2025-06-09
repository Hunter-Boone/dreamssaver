#!/bin/bash

# Dreams Saver Setup Script

echo "🌙 Dreams Saver - Setup Script"
echo "=============================="

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "❌ .env.local file not found!"
    echo "📝 Please copy .env.example to .env.local and fill in your API keys:"
    echo "   cp .env.example .env.local"
    echo ""
    echo "🔑 Required API keys:"
    echo "   - Supabase URL and keys"
    echo "   - Google Gemini AI key"
    echo "   - Stripe keys"
    echo ""
    exit 1
fi

echo "✅ .env.local file found"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Check if we can build the project
echo "🔨 Testing build..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed - please check your configuration"
    exit 1
fi

echo "✅ Build successful"

echo ""
echo "🎉 Setup complete!"
echo ""
echo "🚀 To start the development server:"
echo "   npm run dev"
echo ""
echo "🌐 Open http://localhost:3000 in your browser"
echo ""
echo "📚 Don't forget to set up your Supabase database schema!"
echo "   Check the README.md for SQL schema setup instructions"
