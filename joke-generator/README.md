# 😂 Random Joke Generator

A fun and interactive web application that generates random jokes from multiple external APIs with different categories and features.

## 🎯 Features

### Joke Generation
- 🎲 **Random Jokes** - Completely random jokes
- 💻 **Programming Jokes** - Jokes for developers
- 🚪 **Knock-Knock Jokes** - Classic knock-knock jokes
- 😊 **General Jokes** - Wholesome general jokes

### User Features
- ❤️ **Favorites** - Save your favorite jokes
- 📜 **History** - View previously loaded jokes
- 📋 **Copy to Clipboard** - Copy joke text easily
- 📤 **Share Jokes** - Share with friends via share dialog
- 📊 **Statistics** - Track jokes loaded and stats

### Technical Features
- 🔄 **Multiple APIs** - Fallback to different joke APIs
- 💾 **Local Storage** - Persist favorites and history
- 🚀 **Fast Loading** - API caching on backend
- 📱 **Responsive Design** - Works on all devices
- ✨ **Beautiful UI** - Modern gradient design

## 🛠️ Tech Stack

### Frontend
- **React** 18.2.0 - UI library
- **Tailwind CSS** 3.3.0 - Styling
- **Axios** 1.6.0 - HTTP client
- **React Icons** 4.12.0 - Icon library

### Backend
- **Express** 4.18.2 - Web server
- **CORS** 2.8.5 - Cross-origin support
- **Axios** 1.6.0 - HTTP client
- **Dotenv** 16.3.1 - Environment config

### External APIs Used
1. **Jokes.one** - General jokes
2. **Official Joke API** - Programming, Knock-knock jokes
3. **JokeAPI (v2.jokeapi.dev)** - Multiple categories
4. **icanhazdadjoke.com** - Dad jokes

## 📋 Prerequisites

- Node.js 16+ and npm
- Git (optional, for cloning)

## 🚀 Getting Started

### Installation

1. **Navigate to joke-generator directory**
```bash
cd joke-generator
npm install
```

2. **Create environment file**
```bash
cp .env.example .env.local
```

3. **Configure .env.local** (optional, APIs are free)
```
REACT_APP_BACKEND_URL=http://localhost:3002
PORT=3002
NODE_ENV=development
```

### Development

**Start both frontend and backend:**
```bash
npm run dev
```

**Or run separately:**

Terminal 1 - Frontend (React):
```bash
npm start
```

Terminal 2 - Backend (Express):
```bash
npm run server
```

Open http://localhost:3000 in your browser.

### Production Build

```bash
npm run build
```

The optimized build will be in the `build/` directory.

## 📁 Project Structure

```
joke-generator/
├── public/
│   └── index.html                # HTML template
├── src/
│   ├── components/
│   │   ├── JokeDisplay.js        # Main joke display
│   │   ├── JokeControls.js       # Type selector & controls
│   │   └── JokeHistory.js        # History & favorites
│   ├── services/
│   │   └── jokeService.js        # API integration
│   ├── styles/
│   │   ├── JokeDisplay.css
│   │   ├── JokeControls.css
│   │   └── JokeHistory.css
│   ├── App.js                    # Main app component
│   ├── App.css
│   ├── index.js
│   └── index.css
├── server.js                     # Express backend
├── package.json
└── README.md
```

## 🔌 API Endpoints

### Backend Endpoints

**Get a random joke:**
```
GET /api/joke?type=random
```

Query parameters:
- `type`: `random` | `programming` | `knockKnock` | `general`

Response:
```json
{
  "success": true,
  "joke": {
    "id": "joke-123",
    "text": "Why did...",
    "setup": "Why did the programmer...",
    "delivery": "Because...",
    "type": "single" | "twopart",
    "source": "API Name"
  },
  "cached": false
}
```

**Health check:**
```
GET /api/health
```

**Get statistics:**
```
GET /api/joke/stats
```

Response:
```json
{
  "totalJokesRequested": 42,
  "cacheSize": 4,
  "uptime": 3600
}
```

## 💾 Data Storage

### Local Storage
- **jokeHistory** - Last 50 jokes loaded
- **favoritesJokes** - Saved favorite jokes
- **jokeCount** - Total jokes loaded

### Server Cache
- 5-minute cache for each joke type
- Reduces API calls
- Fallback to fresh API calls

## 🎨 Features Showcase

### Main Display
- Large, readable joke text
- Two-part jokes with animation between setup and punchline
- Source attribution
- Category badges

### Controls
- 4 joke type buttons with emojis
- Next Joke button
- Favorite/Like button
- Copy to Clipboard button
- Share button (native share on mobile)

### History & Favorites
- Scrollable list of jokes
- Timestamps for history
- Click to view full joke
- Badge showing count

### Statistics
- Total jokes loaded
- Jokes in history
- Favorite jokes count

## 🐛 Troubleshooting

### "Failed to load joke" error
- Check internet connection
- Verify backend server is running
- Check browser console for details
- Wait a moment and try again (API might be temporarily down)

### Copy to Clipboard not working
- Check browser permissions
- Use HTTPS in production
- Some browsers require user gesture

### Share button not showing
- Native share requires HTTPS (production)
- Mobile browsers have better support
- Falls back to copy on desktop

### Jokes not saving
- Check browser's Local Storage is enabled
- Clear cookies/cache if having issues
- Check browser console for storage errors

## 🚀 Performance Optimization

- **API Caching** - 5-minute server-side cache
- **Multiple Fallbacks** - 3-4 APIs per joke type
- **Lazy Loading** - Images load on demand
- **CSS Optimization** - Tailwind CSS with purge
- **Code Splitting** - React lazy loading ready

## 🔒 Security

- No API keys required
- All external APIs are public
- No user data collection
- Local storage only
- CORS properly configured

## 🎯 Future Features

- 🎵 Text-to-speech for jokes
- 🌙 Dark/Light theme
- 🗺️ Joke categories filter
- 📊 Joke statistics dashboard
- 🔔 Daily joke notification
- 🎤 User-submitted jokes
- 🏆 Joke voting/ratings

## 📝 Example Usage

1. **Load a joke:**
   - Click "Next Joke" button
   - Or select a category first

2. **Save a favorite:**
   - Click the heart icon
   - View in "Favorites" tab

3. **Share a joke:**
   - Click "Share" button
   - Choose how to share
   - Or copy and paste manually

4. **View history:**
   - Click "History" button
   - Click any joke to view
   - Last 50 jokes saved

## 📚 API Documentation

### Jokes.one
- Free tier available
- No authentication needed
- Rate limit: Generous

### Official Joke API
- Free tier available
- No authentication needed
- Multiple categories

### JokeAPI
- Free tier available
- No authentication needed
- Best variety of jokes

### icanhazdadjoke
- Completely free
- No authentication needed
- Dad jokes only

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📄 License

MIT License - See LICENSE file for details

## 🙏 Credits

- Built with React & Tailwind CSS
- Powered by public joke APIs
- Icons from React Icons

## 💬 Support

For issues or questions:
- Check troubleshooting section
- Review example usage
- Open a GitHub issue

---

**Made with ❤️ and lots of laughter! 😄**

*If this project made you laugh, please give it a ⭐*
