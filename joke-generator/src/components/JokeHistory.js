import React from 'react';
import { FiTrash2, FiChevronDown } from 'react-icons/fi';
import '../styles/JokeHistory.css';

const JokeHistory = ({ jokes, title, onSelectJoke }) => {
  if (!jokes || jokes.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
        <p className="text-gray-500 text-lg">No jokes yet! Keep laughing to build history 😄</p>
      </div>
    );
  }

  return (
    <div className="joke-history bg-white rounded-2xl shadow-xl p-6 md:p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{title}</h2>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {jokes.map((joke, index) => (
          <div
            key={joke.id || index}
            onClick={() => onSelectJoke(joke)}
            className="p-4 bg-gray-50 hover:bg-gradient-to-r hover:from-violet-100 hover:to-pink-100 rounded-lg cursor-pointer transition-all hover:scale-105 border-l-4 border-violet-500"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 pr-4">
                <p className="text-gray-800 font-semibold line-clamp-2">
                  {joke.text || `${joke.setup} ${joke.delivery}`}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  {joke.timestamp || joke.favoritedAt}
                </p>
              </div>
              <span className="text-2xl">
                {joke.category === 'Programming'
                  ? '💻'
                  : joke.category === 'Knock-knock'
                  ? '🚪'
                  : '😊'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JokeHistory;
