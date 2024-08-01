import React, { useMemo } from 'react';
import Link from 'next/link';
import { GetEpigramsResponseType } from '@/schema/epigrams';

// TODO highlightedSections의 key 설정 부분에 더 나은 방법이 생각나면 변경

interface SearchResultsProps {
  results: GetEpigramsResponseType | null;
  query: string;
  isLoading: boolean;
}

// 텍스트 하이라이팅 함수
function handleHighlightText(text: string, highlight: string) {
  if (!highlight.trim()) {
    return text;
  }

  // 검색어(highlight)기준으로 검색 결과를 배열로 나눔(g: 중복 O, i: 대소문자 구분 X)
  const highlightedSections = text.split(new RegExp(`(${highlight})`, 'gi'));

  // 검색어와 비교해서 같으면 하이라이팅, 다르면 그냥 반환
  return (
    <>
      {highlightedSections.map((section, index) => {
        const key = `${section}-${index}-${section.length}`;
        return section.toLowerCase() === highlight.toLowerCase() ? (
          <span key={key} className='text-illust-blue'>
            {section}
          </span>
        ) : (
          section
        );
      })}
    </>
  );
}

function SearchResults({ results, query, isLoading }: SearchResultsProps) {
  // 태그와 내용 순서로 정렬 - 항상 useMemo를 호출하고, results가 null인 경우 빈 배열 반환
  const sortedResults = useMemo(() => {
    if (!results) return [];
    return results.list.sort((a, b) => {
      const aHasTag = a.tags.some((tag) => tag.name.includes(query));
      const bHasTag = b.tags.some((tag) => tag.name.includes(query));

      if (aHasTag && !bHasTag) return -1;
      if (!aHasTag && bHasTag) return 1;
      return 0;
    });
  }, [results, query]);

  const filteredResults = useMemo(
    () =>
      sortedResults.filter(
        (item) =>
          item.content.toLowerCase().includes(query.toLowerCase()) ||
          item.author.toLowerCase().includes(query.toLowerCase()) ||
          item.tags.some((tag) => tag.name.toLowerCase().includes(query.toLowerCase())),
      ),
    [sortedResults, query],
  );

  if (isLoading) {
    return (
      <div className='flex flex-col py-4 px-6 lg:p-6 gap-2 lg:gap-[16px]'>
        <div className='flex flex-col gap-1 md:gap-2 lg:gap-6'>
          <span className='text-black-600 font-iropkeBatang iropke-lg lg:iropke-xl'>검색 결과를 불러오는 중 입니다...</span>
        </div>
      </div>
    );
  }

  if (!results || filteredResults.length === 0) {
    return (
      <div className='flex flex-col py-4 px-6 lg:p-6 gap-2 lg:gap-[16px]'>
        <div className='flex flex-col gap-1 md:gap-2 lg:gap-6'>
          <span className='text-black-600 font-iropkeBatang iropke-lg lg:iropke-xl'>해당 검색어에 대한 결과가 없습니다.</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      {filteredResults.map((item) => (
        <Link href={`/epigrams/${item.id}`} key={item.id}>
          <div className='flex flex-col py-4 px-6 lg:p-6 gap-2 lg:gap-[16px] border-b border-gray-100'>
            <div className='flex flex-col gap-1 md:gap-2 lg:gap-6'>
              <span className='text-black-600 font-iropkeBatang iropke-lg lg:iropke-xl'>{handleHighlightText(item.content, query)}</span>
              <span className='text-blue-400 font-iropkeBatang iropke-lg lg:iropke-xl'>- {handleHighlightText(item.author, query)} -</span>
            </div>
            <div className='flex flex-row justify-end gap-3'>
              {item.tags.map((tag) => (
                <span key={tag.id} className='text-blue-400 font-pretendard iropke-lg lg:iropke-xl'>
                  {handleHighlightText(`#${tag.name}`, query)}
                </span>
              ))}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default SearchResults;
