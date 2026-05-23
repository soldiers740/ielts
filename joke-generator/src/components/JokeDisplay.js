import React from 'react';
import { FiRefreshCw, FiHeart, FiCopy, FiShare2 } from 'react-icons/fi';
import '../styles/JokeDisplay.css';

const JokeDisplay = ({
  joke,
  loading,
  isFavorited,
  copied,
  onRefresh,
  onFavorite,
  onCopy,
  onShare,
}) => {
  return (
    <div className="joke-display bg-white rounded-2xl shadow-2xl p-8 md:p-12 max-w-2xl mx-auto">
      {/* Joke Source Badge */}
      <div className="text-center mb-6">
        <span className="inline-block bg-gradient-to-r from-violet-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
          {joke.source || 'Random Joke'}
        </span>
      </div>

      {/* Joke Content */}
      <div className="mb-8">
        {joke.text ? (
          // Single-part joke
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-gray-800 leading-relaxed mb-4">
              {joke.text}
            </p>
          </div>
        ) : joke.setup && joke.delivery ? (
          // Two-part joke
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-semibold text-gray-800 leading-relaxed">
                {joke.setup}
              </p>
            </div>
            <div className="flex justify-center">
              <div className="text-4xl animate-bounce">😂</div>
            </div>
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-pink-600 leading-relaxed">
                {joke.delivery}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">Loading joke...</p>
        )}
      </div>

      {/* Additional Info */}
      {joke.category && (
        <div className="text-center mb-6">
          <span className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
            📁 {joke.category}
          </span>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 justify-center">
        <button
          onClick={onRefresh}
          disabled={loading}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-500 to-violet-600 hover:from-violet-600 hover:to-violet-700 text-white rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          title="Get another joke"
        >
          <FiRefreshCw size={20} className={loading ? 'animate-spin' : ''} />
          <span className="hidden sm:inline">Next Joke</span>
        </button>

        <button
          onClick={onFavorite}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
            isFavorited
              ? 'bg-rose-500 hover:bg-rose-600 text-white'
              : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
          }`}
          title="Add to favorites"
        >
          <FiHeart size={20} fill={isFavorited ? 'currentColor' : 'none'} />
          <span className="hidden sm:inline">{isFavorited ? 'Favorited' : 'Favorite'}</span>
        </button>

        <button
          onClick={onCopy}
          className="flex items-center gap-2 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-semibold transition-all"
          title="Copy to clipboard"
        >
          <FiCopy size={20} />
          <span className="hidden sm:inline">{copied ? 'Copied!' : 'Copy'}</span>
        </button>

        <button
          onClick={onShare}
          className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-all"
          title="Share joke"
        >
          <FiShare2 size={20} />
          <span className="hidden sm:inline">Share</span>
        </button>
      </div>
    </div>
  );
};

export default JokeDisplay;
