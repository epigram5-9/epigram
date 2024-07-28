import { GetEpigramResponseType } from '@/schema/epigram';
import { GetUserResponseType } from '@/schema/user';

export interface EpigramFigureProps {
  epigram: GetEpigramResponseType;
  currentUserId: GetUserResponseType['id'] | undefined;
}

export interface EpigramCommentProps {
  epigramId: number;
  currentUserId: GetUserResponseType['id'] | undefined;
  userImage?: string | undefined;
}

export interface PostCommentRequest {
  epigramId: number;
  isPrivate: boolean;
  content: string;
}

export interface DeleteEpigramType {
  id: number;
}

export interface PatchCommentRequest {
  isPrivate: boolean;
  content: string;
}
