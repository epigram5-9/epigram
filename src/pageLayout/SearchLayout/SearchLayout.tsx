import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Header from '@/components/Header/Header';
import SearchBar from '@/components/search/SearchBar';
import RecentSearches from '@/components/search/RecentSearches';
import SearchResults from '@/components/search/SearchResults';
import useEpigrams from '@/hooks/useGetEpigramsHooks';
import { GetEpigramsResponseType } from '@/schema/epigrams';

// TODO 로그인한 사용자에 따라서 최근 검색어를 관리할 수 있도록 추후에 수정

function SearchLayout() {
  const [searches, setSearches] = useState<string[]>([]);
  const [currentSearch, setCurrentSearch] = useState<string>('');
  const [page, setPage] = useState(0);
  const [allResults, setAllResults] = useState<GetEpigramsResponseType['list']>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [nextCursor, setNextCursor] = useState<number | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const { data: searchResults, isLoading } = useEpigrams(currentSearch, page);

  // 새로운 검색 결과를 allResults에 누적하고, 총 결과 개수와 다음 커서를 업데이트합니다.
  useEffect(() => {
    if (searchResults?.list) {
      setAllResults((prevResults) => [...prevResults, ...searchResults.list]);
      setTotalCount(searchResults.totalCount);
      setNextCursor(searchResults.nextCursor);
    }
  }, [searchResults]);

  // observerRef가 화면에 나타날 때 페이지를 증가시키고 추가 데이터를 로드하도록 합니다.
  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !isLoading) {
        setPage((prevPage) => prevPage + 1);
      }
    });

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    // 옵저버 클린업 (메모리 누수 방지)
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [allResults.length]);

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

  // 검색어가 제출될 때 작동
  const handleSearch = async (search: string) => {
    setPage(0);
    setAllResults([]);
    setSearches((prevSearches) => {
      const updatedSearches = [search, ...prevSearches.filter((item) => item !== search)].slice(0, 10);
      localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
      return updatedSearches;
    });
    setCurrentSearch(search);

    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('q', search);
    router.push(`/search?${searchParams.toString()}`);
  };

  return (
    <>
      <Header icon='search' routerPage='/search' isLogo insteadOfLogo='' isProfileIcon isShareIcon={false} isButton={false} textInButton='' disabled={false} onClick={() => {}} />;
      <div className='container mx-auto max-w-screen-sm bg-blue-100'>
        <SearchBar onSearch={handleSearch} currentSearch={currentSearch} />
        <RecentSearches searches={searches} onSearch={handleSearch} onClear={handleClearAll} />
        <SearchResults results={{ totalCount, nextCursor: nextCursor ?? 0, list: allResults }} query={currentSearch} isLoading={isLoading} />
        <div ref={loadMoreRef} />
      </div>
    </>
  );
}

export default SearchLayout;
