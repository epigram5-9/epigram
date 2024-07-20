import React, { useState, useEffect, useRef } from 'react';
import SearchBar from '@/components/search/SearchBar';
import RecentSearches from '@/components/search/RecentSearches';
import SearchResults from '@/components/search/SearchResults';

//TODO 로그인한 사용자에 따라서 최근 검색어를 관리할 수 있도록 추후에 수정
// NOTE useEffect 훅이 두 번 실행 되는 문제를 해결하기 위해 isInitialMount 선언하여 관리

function SearchLayout() {
  const [searches, setSearches] = useState<string[]>([]);
  const isInitialMount = useRef(true);

  // 검색어가 제출될 때 작동
  const handleSearch = (search: string) => {
    setSearches((prevSearches) => {
      // 중복되지 않는 검색어를 최근 검색어에 추가하고 최대 10개로 제한
      const updatedSearches = [search, ...prevSearches.filter((item) => item !== search)].slice(0, 10);
      return updatedSearches;
    });
  };

  // 모두지우기 클릭 시 최근 검색어 삭제
  const handleClearAll = () => {
    setSearches([]);
    localStorage.removeItem('recentSearches');
  };

  // 컴포넌트가 처음 렌더링 될 때 최근 검색어 불러옴
  useEffect(() => {
    const storedSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
    setSearches(storedSearches);
  }, []);

  // 검색어 상태가 변경될 때 로컬 스토리지 업데이트
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      localStorage.setItem('recentSearches', JSON.stringify(searches));
    }
  }, [searches]);

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
