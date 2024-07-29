import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '@/components/Header/Header';
import SearchBar from '@/components/search/SearchBar';
import RecentSearches from '@/components/search/RecentSearches';
import SearchResults from '@/components/search/SearchResults';
import useEpigrams from '@/hooks/useGetEpigramsHooks';

// TODO 로그인한 사용자에 따라서 최근 검색어를 관리할 수 있도록 추후에 수정

function SearchLayout() {
  const [searches, setSearches] = useState<string[]>([]);
  const [currentSearch, setCurrentSearch] = useState<string>('');
  const router = useRouter();

  const { data: searchResults, isLoading, error } = useEpigrams(currentSearch);

  // 검색어가 제출될 때 작동
  const handleSearch = async (search: string) => {
    setSearches((prevSearches) => {
      // 중복되지 않는 검색어를 최근 검색어에 추가하고 최대 10개로 제한
      const updatedSearches = [search, ...prevSearches.filter((item) => item !== search)].slice(0, 10);
      localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
      return updatedSearches;
    });
    setCurrentSearch(search);

    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('q', search);
    router.push(`/search?${searchParams.toString()}`);
  };

  // 컴포넌트가 처음 렌더링 될 때 저장된 최근 검색어 불러오기, URL에 데이터 저장
  useEffect(() => {
    const storedSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
    setSearches(storedSearches);

    const searchParams = new URLSearchParams(window.location.search);
    const query = searchParams.get('q');
    if (query) {
      setCurrentSearch(query);
    }
  }, [router.query.q]);

  // 모두지우기 클릭 시 저장된 최근 검색어 삭제
  const handleClearAll = () => {
    setSearches([]);
    localStorage.removeItem('recentSearches');
  };

  return (
    <>
      <Header icon='search' routerPage='/search' isLogo insteadOfLogo='' isProfileIcon isShareIcon={false} isButton={false} textInButton='' disabled={false} onClick={() => {}} />;
      <div className='container mx-auto max-w-screen-sm bg-blue-100'>
        <SearchBar onSearch={handleSearch} currentSearch={currentSearch} />
        <RecentSearches searches={searches} onSearch={handleSearch} onClear={handleClearAll} />
        {isLoading && (
          <div className='flex flex-col py-4 px-6 lg:p-6 gap-2 lg:gap-[16px]'>
            <div className='flex flex-col gap-1 md:gap-2 lg:gap-6'>
              <span className='text-black-600 font-iropkeBatang iropke-lg lg:iropke-xl'>검색 결과를 불러오는 중 입니다...</span>
            </div>
          </div>
        )}
        {!isLoading && error && <p>Error: {error.message}</p>}
        {!isLoading && currentSearch && searchResults && <SearchResults results={searchResults || null} query={currentSearch} />}
      </div>
    </>
  );
}

export default SearchLayout;
