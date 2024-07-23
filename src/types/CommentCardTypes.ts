import { WriterType } from '@/schema/recentcomment';

export interface CommentCardProps {
  writer: WriterType;
  content: string;
  createdAt: string;
  status?: 'view' | 'edit';
}
