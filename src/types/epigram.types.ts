import { GetEpigramResponseType } from '@/schema/epigram';
import { GetUserResponseType } from '@/schema/user';

export interface EpigramFigureProps {
  epigram: GetEpigramResponseType;
  currentUserId: GetUserResponseType['id'] | undefined;
}

export interface EpigramCommentProps {
  epigramId: number;
  currentUserId: GetUserResponseType['id'] | undefined;
}

export interface PostCommentRequest {
  epigramId: number;
  isPrivate: boolean;
  content: string;
}
