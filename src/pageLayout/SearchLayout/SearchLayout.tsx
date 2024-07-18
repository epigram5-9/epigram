import React from 'react';
import SearchBar from '@/components/search/SearchBar';
import RecentSearches from '@/components/search/RecentSearches';
import SearchResults from '@/components/search/SearchResults';

function SearchLayout() {
  const handleSearch = (search: string) => {
    if (search.trim() === '') return;

    // 로컬 스토리지 저장
    const storedSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
    const updatedSearches = [search, ...storedSearches.filter((item: string) => item !== search)].slice(0, 10);
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
  };

  return (
    <>
      <header />
      <div className='container mx-auto max-w-screen-sm bg-blue-100'>
        <SearchBar />
        <RecentSearches onSearch={handleSearch} />
        <SearchResults />
        <SearchResults />
        <SearchResults />
        <SearchResults />
        <SearchResults />
      </div>
    </>
  );
}

export default SearchLayout;
