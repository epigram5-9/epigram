export interface Tag {
  name: string;
  id: number;
}

// Epigram 응답 타입
export interface GetEpigramResponseType {
  id: number;
  content: string;
  author: string;
  referenceTitle?: string | null;
  referenceUrl?: string | null;
  writerId: number;
  tags: Tag[];
  likeCount: number;
  isLiked: boolean;
}

// GET 요청 타입
export interface GetEpigramRequestType {
  id: string | number;
}
