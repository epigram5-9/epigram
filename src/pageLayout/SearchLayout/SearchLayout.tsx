import React, { useState, useEffect } from 'react';
import SearchBar from '@/components/search/SearchBar';
import RecentSearches from '@/components/search/RecentSearches';
import SearchResults from '@/components/search/SearchResults';

function SearchLayout() {
  const [searches, setSearches] = useState<string[]>([]);

  useEffect(() => {
    const storedSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
    setSearches(storedSearches);
  }, []);

  useEffect(() => {
    localStorage.setItem('recentSearches', JSON.stringify(searches));
  }, [searches]);

  const handleSearch = (search: string) => {
    if (search.trim() === '') return;

    const updatedSearches = [search, ...searches.filter((item) => item !== search)].slice(0, 10);
    setSearches(updatedSearches);
  };

  const handleClearAll = () => {
    setSearches([]);
  };

  return (
    <>
      <header />
      <div className='container mx-auto max-w-screen-sm bg-blue-100'>
        <SearchBar onSearch={handleSearch} />
        <RecentSearches searches={searches} onSearch={handleSearch} onClear={handleClearAll} />
        <SearchResults />
      </div>
    </>
  );
}

export default SearchLayout;
