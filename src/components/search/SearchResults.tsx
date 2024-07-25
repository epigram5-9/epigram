import React from 'react';
import Link from 'next/link';

// TODO highlightedSections의 key 설정 부분에 더 나은 방법이 생각나면 변경

interface Tag {
  name: string;
  id: number;
}

interface Epigram {
  likeCount: number;
  tags: Tag[];
  id: number;
  writerId: number;
  referenceUrl: string;
  referenceTitle: string;
  author: string;
  content: string;
}

interface SearchResultsProps {
  results: {
    totalCount: number;
    nextCursor: number;
    list: Epigram[];
  } | null;
  query: string;
}

// 텍스트 하이라이팅 함수
function handleHighlightText(text: string, highlight: string) {
  if (!highlight.trim()) {
    return text;
  }

  // 검색어(highlight)기준으로 검색 결과를 배열로 나눔(g: 중복 O, i: 대소문자 구분 X)
  const highlightedSections = text.split(new RegExp(`(${highlight})`, 'gi'));

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

function SearchResults({ results, query }: SearchResultsProps) {
  if (!results) {
    return <span>검색 결과를 불러오는 중 문제가 발생했습니다.</span>;
  }

  // 태그와 내용 기준으로 정렬
  const sortedResults = results.list.sort((a, b) => {
    const aHasTag = a.tags.some((tag) => tag.name.includes(query));
    const bHasTag = b.tags.some((tag) => tag.name.includes(query));

    if (aHasTag && !bHasTag) return -1;
    if (!aHasTag && bHasTag) return 1;
    return 0;
  });

  const filteredResults = sortedResults.filter((item) => item.content.includes(query) || item.author.includes(query) || item.tags.some((tag) => tag.name.includes(query)));

  if (filteredResults.length === 0) {
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
