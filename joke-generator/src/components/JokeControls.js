import React from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import '../styles/JokeControls.css';

const JokeControls = ({
  jokeType,
  onTypeChange,
  onRefresh,
  loading,
  onToggleHistory,
  onToggleFavorites,
  historyCount,
  favoritesCount,
}) => {
  const jokeTypes = [
    { id: 'random', label: '🎲 Random', emoji: '🎲' },
    { id: 'programming', label: '💻 Programming', emoji: '💻' },
    { id: 'knockKnock', label: '🚪 Knock Knock', emoji: '🚪' },
    { id: 'general', label: '😊 General', emoji: '😊' },
  ];

  return (
    <div className="joke-controls bg-white rounded-2xl shadow-xl p-6 md:p-8">
      {/* Joke Type Selection */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Choose Joke Type:</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {jokeTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => onTypeChange(type.id)}
              disabled={loading}
              className={`py-3 px-4 rounded-lg font-semibold transition-all text-center ${
                jokeType === type.id
                  ? 'bg-gradient-to-r from-violet-500 to-pink-500 text-white shadow-lg transform scale-105'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              } disabled:opacity-50`}
            >
              <span className="text-xl block mb-1">{type.emoji}</span>
              <span className="text-sm">{type.label.split(' ')[1]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* History and Favorites */}
      <div className="border-t pt-6">
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onToggleHistory}
            className="flex items-center justify-between p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-all border-2 border-blue-200"
          >
            <span className="text-sm font-semibold text-blue-700">📜 History</span>
            <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold">
              {historyCount}
            </span>
          </button>

          <button
            onClick={onToggleFavorites}
            className="flex items-center justify-between p-4 bg-rose-50 hover:bg-rose-100 rounded-lg transition-all border-2 border-rose-200"
          >
            <span className="text-sm font-semibold text-rose-700">❤️ Favorites</span>
            <span className="bg-rose-500 text-white px-3 py-1 rounded-full text-xs font-bold">
              {favoritesCount}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default JokeControls;
