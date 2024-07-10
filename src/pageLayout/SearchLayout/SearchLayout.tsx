import SearchBar from '@/components/Search/SearchBar';
import RecentSearches from '@/components/Search/RecentSearches';
import SearchResults from '@/components/Search/SearchResults';

function SearchLayout() {
  return (
    <>
      <header />
      <div className='container mx-auto w-[640px] bg-blue-100'>
        <SearchBar />
        <RecentSearches />
        <SearchResults />
        <SearchResults />
        <SearchResults />
      </div>
    </>
  );
}

export default SearchLayout;
