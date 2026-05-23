import React, { useState, useEffect } from 'react';
import { FiRefreshCw, FiShare2, FiCopy, FiHeart, FiTrendingUp } from 'react-icons/fi';
import JokeDisplay from './components/JokeDisplay';
import JokeControls from './components/JokeControls';
import JokeHistory from './components/JokeHistory';
import { getRandomJoke } from './services/jokeService';
import './App.css';

function App() {
  const [currentJoke, setCurrentJoke] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [jokeType, setJokeType] = useState('random'); // random, programming, knock-knock, general
  const [jokeHistory, setJokeHistory] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [copied, setCopied] = useState(false);
  const [jokeCount, setJokeCount] = useState(0);

  // Load jokes from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('jokeHistory');
    const savedFavorites = localStorage.getItem('favoritesJokes');
    const savedCount = localStorage.getItem('jokeCount');

    if (savedHistory) setJokeHistory(JSON.parse(savedHistory));
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
    if (savedCount) setJokeCount(parseInt(savedCount));

    // Fetch initial joke
    fetchJoke();
  }, []);

  // Save history to localStorage
  useEffect(() => {
    localStorage.setItem('jokeHistory', JSON.stringify(jokeHistory));
  }, [jokeHistory]);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('favoritesJokes', JSON.stringify(favorites));
  }, [favorites]);

  // Save joke count to localStorage
  useEffect(() => {
    localStorage.setItem('jokeCount', jokeCount.toString());
  }, [jokeCount]);

  const fetchJoke = async (type = jokeType) => {
    setLoading(true);
    setError(null);
    setCopied(false);

    try {
      const joke = await getRandomJoke(type);
      if (joke) {
        setCurrentJoke(joke);
        setJokeHistory((prev) => [
          { ...joke, timestamp: new Date().toLocaleString(), id: Date.now() },
          ...prev.slice(0, 49), // Keep last 50 jokes
        ]);
        setJokeCount((prev) => prev + 1);
      } else {
        setError('Failed to load joke. Please try again.');
      }
    } catch (err) {
      setError('Something went wrong. Try again!');
      console.error('Joke fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleJokeTypeChange = (type) => {
    setJokeType(type);
    fetchJoke(type);
  };

  const toggleFavorite = () => {
    if (currentJoke) {
      const isFavorited = favorites.some(
        (fav) => fav.id === currentJoke.id || (fav.text === currentJoke.text && fav.setup === currentJoke.setup)
      );

      if (isFavorited) {
        setFavorites((prev) =>
          prev.filter(
            (fav) => !(fav.id === currentJoke.id || (fav.text === currentJoke.text && fav.setup === currentJoke.setup))
          )
        );
      } else {
        setFavorites((prev) => [{ ...currentJoke, favoritedAt: new Date().toLocaleString() }, ...prev]);
      }
    }
  };

  const isFavorited =
    currentJoke &&
    favorites.some(
      (fav) => fav.id === currentJoke.id || (fav.text === currentJoke.text && fav.setup === currentJoke.setup)
    );

  const copyToClipboard = () => {
    if (currentJoke) {
      const jokeText = currentJoke.text || `${currentJoke.setup} ${currentJoke.delivery}`;
      navigator.clipboard.writeText(jokeText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareJoke = () => {
    if (currentJoke && navigator.share) {
      const jokeText = currentJoke.text || `${currentJoke.setup} ${currentJoke.delivery}`;
      navigator.share({
        title: '😂 Check out this joke!',
        text: jokeText,
      });
    } else if (currentJoke) {
      copyToClipboard();
      alert('Joke copied to clipboard!');
    }
  };

  return (
    <div className="app min-h-screen bg-gradient-to-br from-violet-500 via-pink-500 to-rose-500 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8 text-white fade-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-2">😂 Joke Generator</h1>
          <p className="text-lg md:text-xl opacity-90">Laugh with random jokes from multiple APIs</p>
          <div className="mt-4 flex justify-center items-center gap-4 text-sm md:text-base opacity-80">
            <span className="flex items-center gap-1">
              <FiTrendingUp /> {jokeCount} jokes loaded
            </span>
            <span>•</span>
            <span>{jokeHistory.length} in history</span>
            <span>•</span>
            <span>{favorites.length} favorited</span>
          </div>
        </header>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Error Message */}
          {error && (
            <div className="bg-red-500 text-white p-4 rounded-lg shadow-lg animate-shake">
              {error}
            </div>
          )}

          {/* Joke Display */}
          {currentJoke && (
            <div className="fade-in">
              <JokeDisplay
                joke={currentJoke}
                loading={loading}
                isFavorited={isFavorited}
                copied={copied}
                onRefresh={() => fetchJoke()}
                onFavorite={toggleFavorite}
                onCopy={copyToClipboard}
                onShare={shareJoke}
              />
            </div>
          )}

          {/* Loading State */}
          {loading && !currentJoke && (
            <div className="flex items-center justify-center py-20">
              <div className="text-center text-white">
                <div className="text-6xl mb-4 animate-bounce">😄</div>
                <p className="text-xl">Loading a funny joke...</p>
              </div>
            </div>
          )}

          {/* Controls */}
          <JokeControls
            jokeType={jokeType}
            onTypeChange={handleJokeTypeChange}
            onRefresh={() => fetchJoke()}
            loading={loading}
            onToggleHistory={() => setShowHistory(!showHistory)}
            onToggleFavorites={() => setShowFavorites(!showFavorites)}
            historyCount={jokeHistory.length}
            favoritesCount={favorites.length}
          />
        </div>

        {/* History and Favorites */}
        {showHistory && (
          <div className="mt-6 fade-in">
            <JokeHistory
              jokes={jokeHistory}
              title="📜 Joke History"
              onSelectJoke={(joke) => {
                setCurrentJoke(joke);
                setShowHistory(false);
              }}
            />
          </div>
        )}

        {showFavorites && (
          <div className="mt-6 fade-in">
            <JokeHistory
              jokes={favorites}
              title="❤️ Favorite Jokes"
              onSelectJoke={(joke) => setCurrentJoke(joke)}
            />
          </div>
        )}

        {/* Footer */}
        <footer className="mt-12 text-center text-white opacity-70 text-sm">
          <p>Made with ❤️ | Powered by multiple joke APIs | Never run out of laughs! 😄</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
