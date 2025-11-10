# Surprise Page for Salma 💖

An interactive and fun web application built with Node.js, Express, and EJS to cheer up Salma before her exam!

## Features

- 🎨 Beautiful animated gradient background
- 💖 Floating hearts animation
- 🏃‍♀️ Interactive "Catch Me" button that runs away from your cursor
- 🎁 Surprise messages with encouraging words
- 💪 Encouragement button with random positive messages
- ✨ Sparkle effects on click
- 🏆 Achievement counter
- 📱 Responsive design

## Installation

1. Install dependencies:
```bash
npm install
```

## Running the App

Start the server:
```bash
npm start
```

Or for development with auto-reload (if you have nodemon):
```bash
npm run dev
```

Then open your browser and go to:
```
http://localhost:3001
```

### 🌐 Public Access with Ngrok

The server automatically creates a public ngrok tunnel when it starts! You'll see a public URL in the console that you can share.

**Optional: Authenticated Ngrok** (recommended to avoid connection issues)
1. Sign up for a free ngrok account at https://ngrok.com
2. Get your authtoken from the dashboard
3. Set it as an environment variable:
   ```bash
   export NGROK_AUTH_TOKEN=your_token_here
   npm start
   ```

Or create a `.env` file (make sure `.env` is in your `.gitignore`):
```
NGROK_AUTH_TOKEN=your_token_here
```

## Project Structure

```
.
├── server.js          # Express server
├── package.json       # Dependencies
├── views/
│   └── index.ejs     # Main template
└── public/
    ├── css/
    │   └── style.css # Styles and animations
    └── js/
        └── app.js    # Interactive JavaScript
```

## Interactive Features

1. **Catch Me Button**: A button that tries to run away when you hover near it. Try to catch it!
2. **Surprise Button**: Click for random encouraging messages in a popup
3. **Encouragement Button**: Get random positive messages to boost your mood
4. **Sparkle Effects**: Click anywhere on the page for sparkle animations
5. **Floating Messages**: Messages appear and float up when you interact with buttons

Enjoy and good luck with your exam, Salma! 🌟

