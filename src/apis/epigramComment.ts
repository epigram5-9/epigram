import httpClient from '@/apis/index';
import { CommentRequestSchema, CommentRequestType, CommentResponseSchema, CommentResponseType } from '@/schema/comment';

const getEpigramComments = async (params: CommentRequestType): Promise<CommentResponseType> => {
  try {
    // 요청 파라미터 유효성 검사
    const validatedParams = CommentRequestSchema.parse(params);

    const { id, limit, cursor } = validatedParams;

    // NOTE: URL의 쿼리 문자열을 사용
    // NOTE : cursor값이 있다면 ?limit=3&cursor=100, 없다면 ?limit=3,(숫자는 임의로 지정한 것)
    const queryParams = new URLSearchParams({
      limit: limit.toString(),
      ...(cursor !== undefined && { cursor: cursor.toString() }),
    });

    const response = await httpClient.get<CommentResponseType>(`/epigrams/${id}/comments?${queryParams.toString()}`);

    // 응답 데이터 유효성 검사
    const validatedData = CommentResponseSchema.parse(response.data);

    return validatedData;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`댓글을 불러오는데 실패했습니다: ${error.message}`);
    }
    throw error;
  }
};

export default getEpigramComments;