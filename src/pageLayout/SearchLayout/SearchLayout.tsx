import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/router';
import NewHeader from '@/components/Header/NewHeader';
import SearchBar from '@/components/search/SearchBar';
import RecentSearches from '@/components/search/RecentSearches';
import SearchResults from '@/components/search/SearchResults';
import useEpigrams from '@/hooks/useGetEpigramsHooks';

function SearchLayout() {
  const [searches, setSearches] = useState<string[]>([]);
  const [currentSearch, setCurrentSearch] = useState<string>('');
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const scrollPositionRef = useRef<number>(0);
  const router = useRouter();

  const isBrowser = typeof window !== 'undefined';
  const accessToken = isBrowser ? localStorage.getItem('accessToken') : null;
  const isUserLoggedIn = !!accessToken;
  const userId = isUserLoggedIn ? 'loggedInUser' : 'guest';
  const recentSearchesKey = `recentSearches_${userId}`;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useEpigrams(currentSearch);

  const handleObserver = useCallback(
    async (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
        scrollPositionRef.current = window.scrollY;
        await fetchNextPage();
        requestAnimationFrame(() => {
          window.scrollTo(0, scrollPositionRef.current);
        });
      }
    },
    [hasNextPage, isFetchingNextPage, fetchNextPage],
  );

  // observerRef가 화면에 나타날 때 페이지 증가,추가 데이터 로드
  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(handleObserver, { rootMargin: '200px' });

    const currentObserver = observerRef.current;
    if (loadMoreRef.current) currentObserver.observe(loadMoreRef.current);

    return () => {
      if (currentObserver && loadMoreRef.current) {
        currentObserver.unobserve(loadMoreRef.current);
      }
    };
  }, [handleObserver]);

  // 최근 검색어 초기화
  const handleClearAll = () => {
    setSearches([]);
    if (isBrowser) localStorage.removeItem(recentSearchesKey);
  };

  // 컴포넌트가 처음 렌더링 될 때 저장된 최근 검색어 불러오기, 로그인된 사용자 별로 최근 검색어를 구분하여 URL에 데이터 저장
  useEffect(() => {
    if (isBrowser) {
      const storedSearches = JSON.parse(localStorage.getItem(recentSearchesKey) || '[]');
      setSearches(storedSearches);
    }

    const searchParams = new URLSearchParams(window.location.search);
    const query = searchParams.get('q');
    if (query) {
      setCurrentSearch(query);
    }
  }, [recentSearchesKey]);

  // 검색어가 제출될 때 작동
  const handleSearch = (search: string) => {
    setCurrentSearch(search);
    setSearches((prev) => {
      const updated = [search, ...prev.filter((s) => s !== search)].slice(0, 20);
      if (isBrowser) localStorage.setItem(recentSearchesKey, JSON.stringify(updated));
      return updated;
    });
    router.push(`/search?q=${search}`);
  };

  return (
    <>
      <NewHeader />
      <div className='container mx-auto max-w-screen-sm bg-blue-100'>
        <SearchBar onSearch={handleSearch} currentSearch={currentSearch} />
        <RecentSearches searches={searches} onSearch={handleSearch} onClear={handleClearAll} />
        {currentSearch && (
          <SearchResults
            results={{
              totalCount: data?.pages?.[0]?.totalCount || 0,
              nextCursor: data?.pages?.[data.pages.length - 1]?.nextCursor || null,
              list: data?.pages?.flatMap((page) => page.list) || [],
            }}
            query={currentSearch}
            isLoading={isFetchingNextPage}
          />
        )}
        <div ref={loadMoreRef} />
      </div>
    </>
  );
}

export default SearchLayout;
