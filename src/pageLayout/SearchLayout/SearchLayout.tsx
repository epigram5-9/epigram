import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import Header from '@/components/Header/Header';
import SearchBar from '@/components/search/SearchBar';
import RecentSearches from '@/components/search/RecentSearches';
import SearchResults from '@/components/search/SearchResults';

// TODO 실제 api와 연동 후 삭제
import { GetEpigramsResponseType } from '@/schema/epigrams';
import testData from '@/components/search/test';

// TODO 로그인한 사용자에 따라서 최근 검색어를 관리할 수 있도록 추후에 수정
// TODO 검색 결과를 URL 에 저장, 새로고침시 데이터 분실에 대응

// TODO 실제 API 호출로 대체할 부분(아직은 테스트 데이터 사용)
async function fetchSearchResults(query: string): Promise<GetEpigramsResponseType> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredList = testData.list.filter((item) => item.content.toLowerCase().includes(query.toLowerCase()));
      resolve({
        totalCount: filteredList.length,
        nextCursor: testData.nextCursor,
        list: filteredList.map((item) => ({
          id: item.id,
          likeCount: item.likeCount,
          tags: item.tags,
          writerId: item.writerId,
          referenceUrl: item.referenceUrl,
          referenceTitle: item.referenceTitle,
          author: item.author,
          content: item.content,
        })),
      });
    }, 1000);
  });
}
function SearchLayout() {
  const [searches, setSearches] = useState<string[]>([]);
  const [currentSearch, setCurrentSearch] = useState<string>('');
  const router = useRouter();

  const {
    data: searchResults,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['searchResults', currentSearch],
    queryFn: () => fetchSearchResults(currentSearch),
    enabled: !!currentSearch,
  });

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
        {isLoading && <p>Loading...</p>}
        {!isLoading && error && <p>Error: {error.message}</p>}
        {!isLoading && currentSearch && searchResults && <SearchResults results={searchResults || null} query={currentSearch} />}
      </div>
    </>
  );
}

export default SearchLayout;
