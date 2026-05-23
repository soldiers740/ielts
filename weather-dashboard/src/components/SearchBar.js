import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import '../styles/SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const commonCities = [
    'London',
    'New York',
    'Tokyo',
    'Paris',
    'Dubai',
    'Sydney',
    'Toronto',
    'Singapore',
    'Mumbai',
    'Berlin',
    'Los Angeles',
    'Barcelona',
  ];

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length > 0) {
      const filtered = commonCities.filter((city) =>
        city.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm);
      setSearchTerm('');
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (city) => {
    onSearch(city);
    setSearchTerm('');
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <form onSubmit={handleSearch} className="search-bar relative flex-1 max-w-md">
      <div className="relative">
        <div className="flex items-center bg-slate-700 rounded-lg px-4 py-2 border border-slate-600 focus-within:border-blue-500 focus-within:shadow-lg transition-all">
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            onFocus={() => searchTerm && setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            placeholder="Search by city name..."
            className="flex-1 bg-transparent outline-none text-white placeholder-slate-400"
          />
          <button
            type="submit"
            className="ml-2 p-2 hover:bg-slate-600 rounded transition-colors"
            title="Search"
          >
            <FiSearch size={20} />
          </button>
        </div>

        {/* Suggestions Dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-slate-700 border border-slate-600 rounded-lg shadow-lg z-10">
            {suggestions.map((city) => (
              <button
                key={city}
                onClick={() => handleSuggestionClick(city)}
                className="w-full text-left px-4 py-2 hover:bg-slate-600 transition-colors border-b border-slate-600 last:border-b-0"
              >
                📍 {city}
              </button>
            ))}
          </div>
        )}
      </div>
    </form>
  );
};

export default SearchBar;
