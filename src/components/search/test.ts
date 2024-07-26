const testData = {
  totalCount: 5,
  nextCursor: 5,
  list: [
    {
      id: 1,
      likeCount: 10,
      tags: [
        { name: '동기부여', id: 101 },
        { name: '우울할때', id: 102 },
        { name: '나아가야할때', id: 103 },
      ],
      writerId: 1001,
      referenceUrl: 'https://example.com/epigram/1',
      referenceTitle: 'The Power of Dreams',
      author: '앙드레 말로',
      content: '오랫동안 꿈을 그리는 사람은 마침내 그 꿈을 닮아 간다.',
    },
    {
      id: 2,
      likeCount: 20,
      tags: [{ name: '새로운영감', id: 201 }],
      writerId: 1002,
      referenceUrl: 'https://example.com/epigram/2',
      referenceTitle: 'Life Lessons',
      author: '파우울로 코엘료 테스트',
      content: '이 세상에는 위대한 진실이 하나 있어. 무언가를 온 마음을 다해 원한다면, 반드시 그렇게 된다는거야.',
    },
    {
      id: 3,
      likeCount: 15,
      tags: [
        { name: '짧은명언', id: 301 },
        { name: '우울증', id: 302 },
      ],
      writerId: 1003,
      referenceUrl: 'https://example.com/epigram/3',
      referenceTitle: 'Path to Success',
      author: '클라우스 랑에',
      content: '우울증이란 우리를 내적인 나락으로 이끄는 유혹의 손길이다. 테스트',
    },
    {
      id: 4,
      likeCount: 5,
      tags: [
        { name: 'motivation', id: 401 },
        { name: 'challenge', id: 402 },
      ],
      writerId: 1004,
      referenceUrl: 'https://example.com/epigram/4',
      referenceTitle: 'Overcoming Challenges',
      author: '테스트터티',
      content: '우울한 기분은 신나는 기분을 더욱 더 신나게 만들어준다.',
    },
    {
      id: 5,
      likeCount: 8,
      tags: [
        { name: '테스트', id: 501 },
        { name: 'discipline', id: 502 },
      ],
      writerId: 1005,
      referenceUrl: 'https://example.com/epigram/5',
      referenceTitle: 'Staying Focused',
      author: 'David Wilson',
      content: '그렇게 우울은 흘러가고 새로운 기분이 우릴 맞이할 것이다.',
    },
  ],
};

export default testData;
