// pages/epigrams/[id].tsx
import React from 'react';
import { useRouter } from 'next/router';
import testData from '@/components/search/test';

function EpigramDetail() {
  const router = useRouter();
  const { id } = router.query;

  // `id`가 숫자인 경우를 대비하여 변환
  const epigramId = parseInt(id as string, 10);
  const epigram = testData.list.find((e) => e.id === epigramId);

  if (!epigram) {
    return <div>해당 에피그램을 찾을 수 없습니다.</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>에피그램 상세 페이지</h1>
      <h2>{epigram.content}</h2>
      <p>작성자: {epigram.author}</p>
      <p>
        참조 제목:{' '}
        <a href={epigram.referenceUrl} target='_blank' rel='noopener noreferrer'>
          {epigram.referenceTitle}
        </a>
      </p>
      <div>
        <strong>태그: </strong>
        {epigram.tags.map((tag) => (
          <span key={tag.id} style={{ marginRight: '5px' }}>
            #{tag.name}
          </span>
        ))}
      </div>
    </div>
  );
}

export default EpigramDetail;
