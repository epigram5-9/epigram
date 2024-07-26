import React, { useState, useEffect } from 'react';
import SearchBar from '@/components/search/SearchBar';
import RecentSearches from '@/components/search/RecentSearches';
import SearchResults from '@/components/search/SearchResults';

// TODO 로그인한 사용자에 따라서 최근 검색어를 관리할 수 있도록 추후에 수정
// TODO api, SearchResults 컴포넌트와 연결

function SearchLayout() {
  const [searches, setSearches] = useState<string[]>([]);
  const [currentSearch, setCurrentSearch] = useState<string>('');

  // 검색어가 제출될 때 작동
  const handleSearch = (search: string) => {
    setSearches((prevSearches) => {
      // 중복되지 않는 검색어를 최근 검색어에 추가하고 최대 10개로 제한
      const updatedSearches = [search, ...prevSearches.filter((item) => item !== search)].slice(0, 10);
      localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
      return updatedSearches;
    });
    setCurrentSearch(search);
  };

  // 모두지우기 클릭 시 저장된 최근 검색어 삭제
  const handleClearAll = () => {
    setSearches([]);
    localStorage.removeItem('recentSearches');
  };

  // 컴포넌트가 처음 렌더링 될 때 저장된 최근 검색어 불러오기
  useEffect(() => {
    const storedSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
    setSearches(storedSearches);
  }, []);

  return (
    <>
      <header />
      <div className='container mx-auto max-w-screen-sm bg-blue-100'>
        <SearchBar onSearch={handleSearch} currentSearch={currentSearch} />
        <RecentSearches searches={searches} onSearch={handleSearch} onClear={handleClearAll} />
        <SearchResults />
      </div>
    </>
  );
}

export default SearchLayout;