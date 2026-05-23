# 🌤️ Weather Dashboard

A modern, responsive weather dashboard that provides real-time weather information using the OpenWeather API.

## Features

✨ **Current Weather**
- Real-time temperature, humidity, wind speed, and pressure
- Weather condition description with emoji
- Feels-like temperature
- Sunrise and sunset times
- Visibility and cloudiness information

📅 **5-Day Forecast**
- Daily high/low temperatures
- Weather conditions with icons
- Humidity and wind speed
- Precipitation chance

⏰ **Hourly Forecast**
- Next 8 hours weather data
- Temperature and weather conditions
- Humidity and wind speed per hour
- Interactive hover effects

📍 **Location Features**
- Search by city name
- Auto-complete suggestions
- Geolocation support (use current location)
- Multiple city support on backend

⚙️ **Settings**
- Temperature unit toggle (Celsius/Fahrenheit)
- Easy refresh functionality
- Responsive design for all devices

🎨 **Modern UI/UX**
- Beautiful gradient backgrounds
- Smooth animations and transitions
- Interactive cards and hover effects
- Mobile-friendly responsive design

## Tech Stack

### Frontend
- **React** 18.2.0 - UI library
- **Tailwind CSS** 3.3.0 - Styling
- **Axios** 1.6.0 - HTTP client
- **React Icons** 4.12.0 - Icon library
- **Chart.js** 4.4.0 - Charts (future feature)
- **date-fns** 2.30.0 - Date formatting

### Backend
- **Express** 4.18.2 - Web server
- **CORS** 2.8.5 - Cross-origin requests
- **Dotenv** 16.3.1 - Environment variables
- **Axios** 1.6.0 - HTTP client

### API
- **OpenWeatherMap API** - Weather data provider
- Free tier: 1000 calls/day
- Includes: Current weather, Forecast, Alerts

## Getting Started

### Prerequisites
- Node.js 16+ and npm
- OpenWeatherMap API key (free at https://openweathermap.org/api)

### Installation

1. **Clone the repository**
```bash
cd weather-dashboard
npm install
```

2. **Get OpenWeatherMap API Key**
   - Visit https://openweathermap.org/api
   - Sign up for a free account
   - Go to your API keys section
   - Copy your API key

3. **Create environment file**
```bash
cp .env.example .env.local
```

4. **Configure .env.local**
```
REACT_APP_OPENWEATHER_API_KEY=your_api_key_here
REACT_APP_WEATHER_API_URL=https://api.openweathermap.org/data/2.5
REACT_APP_WEATHER_ICON_URL=https://openweathermap.org/img/wn
REACT_APP_BACKEND_URL=http://localhost:3001
```

### Development

**Start both frontend and backend:**
```bash
npm run dev
```

**Or run separately:**

Terminal 1 - Frontend:
```bash
npm start
```

Terminal 2 - Backend:
```bash
npm run server
```

Open http://localhost:3000 in your browser.

### Production Build

```bash
npm run build
```

The optimized build will be in the `build/` directory.

## Project Structure

```
weather-dashboard/
├── public/
│   └── index.html              # HTML template
├── src/
│   ├── components/
│   │   ├── CurrentWeather.js   # Current weather display
│   │   ├── Forecast.js         # 5-day forecast
│   │   ├── HourlyForecast.js   # Hourly forecast
│   │   ├── SearchBar.js        # Location search
│   │   └── WeatherAlerts.js    # Weather alerts
│   ├── services/
│   │   └── weatherService.js   # API integration
│   ├── styles/
│   │   ├── CurrentWeather.css
│   │   ├── Forecast.css
│   │   ├── HourlyForecast.css
│   │   └── SearchBar.css
│   ├── App.js                  # Main app component
│   ├── App.css
│   └── index.js
├── server.js                   # Express backend server
├── package.json
└── README.md
```

## API Endpoints (Backend)

### Health Check
```
GET /api/health
```
Response: `{ status: 'OK', message: '...' }`

### Get Weather Alerts
```
GET /api/weather/alerts?lat=51.5074&lon=-0.1278
```
Response: `{ alerts: [...] }`

### Get Air Quality
```
GET /api/weather/air-quality?lat=51.5074&lon=-0.1278
```
Response: Air quality data from OpenWeatherMap

### Get Multiple Cities Weather
```
GET /api/weather/cities?cities=London,Paris,Tokyo
```
Response: `{ cities: [...] }`

## Usage Examples

### Search Weather by City
1. Type city name in search bar
2. Select from auto-complete suggestions
3. Or press Enter to search

### Use Current Location
1. Click "My Location" button
2. Allow browser geolocation permissions
3. Weather data loads for your location

### Change Temperature Unit
1. Click Settings icon (gear icon)
2. Select Celsius or Fahrenheit
3. Weather data updates automatically

## Features Coming Soon

- 📊 Air quality index display
- 🗺️ Interactive map view
- 📈 Weather trends and charts
- 💾 Save favorite locations
- 🌙 Dark/Light theme toggle
- 🔔 Weather notifications
- 📱 PWA (Progressive Web App)
- 🌐 Multi-language support

## Troubleshooting

### "API Key not found" error
- Ensure `.env.local` file exists in the project root
- Check that `REACT_APP_OPENWEATHER_API_KEY` is set correctly
- Restart the development server after changing .env

### CORS errors
- Make sure backend server is running on port 3001
- Check `REACT_APP_BACKEND_URL` in .env.local

### Geolocation not working
- Enable location permissions in browser settings
- Use HTTPS (required for geolocation in production)
- Check browser console for permission errors

### No weather data displaying
- Verify API key is valid and has available quota
- Check network tab in browser developer tools
- Ensure OpenWeatherMap API is accessible

## Performance Tips

- Weather data is cached by the browser
- API calls are rate-limited to prevent quota exhaustion
- Images are optimized and lazy-loaded
- CSS animations use GPU acceleration

## Security

- API key should never be committed to version control
- Use `.env.local` for local development
- Set environment variables in production environment
- Consider using backend proxy for API calls in production

## License

MIT License - See LICENSE file for details

## Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Check existing issues for solutions
- Review the troubleshooting section

## References

- [OpenWeatherMap API Documentation](https://openweathermap.org/api)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Express.js Guide](https://expressjs.com)

---

**Made with ❤️ for weather enthusiasts**
