import { NextApiRequest, NextApiResponse } from 'next';
import { GetEpigramsParams, GetEpigramsResponse, GetEpigramsResponseType } from '../../schema/epigrams';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // 쿼리 매개변수 변환
    const query = {
      ...req.query,
      limit: req.query.limit ? parseInt(req.query.limit as string, 10) : undefined,
      cursor: req.query.cursor ? parseInt(req.query.cursor as string, 10) : undefined,
      writerId: req.query.writerId ? parseInt(req.query.writerId as string, 10) : undefined,
    };

    const queryValidation = GetEpigramsParams.safeParse(query);

    if (!queryValidation.success) {
      return res.status(400).json({ error: queryValidation.error.errors });
    }

    // 예제 응답 데이터
    const responseData: GetEpigramsResponseType = {
      totalCount: 0,
      nextCursor: 0,
      list: [
        {
          likeCount: 0,
          tags: [{ name: '태그', id: 1 }],
          writerId: 1,
          referenceUrl: 'string',
          referenceTitle: 'string',
          author: '저자',
          content: '에피그램 내용입니다.',
          id: 1,
        },
      ],
    };

    // 데이터 검증
    try {
      const parsedResponse = GetEpigramsResponse.parse(responseData);
      return res.status(200).json(parsedResponse);
    } catch (e) {
      return res.status(500).json({ error: '응답 데이터 검증 실패', details: e });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
