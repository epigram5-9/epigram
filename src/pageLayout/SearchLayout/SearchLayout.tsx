import React from 'react';
import SearchBar from '@/components/search/SearchBar';
import RecentSearches from '@/components/search/RecentSearches';
import SearchResults from '@/components/search/SearchResults';

function SearchLayout() {
  return (
    <>
      <header />
      <div className='container mx-auto max-w-screen-sm bg-blue-100'>
        <SearchBar />
        <RecentSearches />
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
