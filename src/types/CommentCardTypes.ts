import { WriterType } from '@/schema/recentcomment';

export interface CommentCardProps {
  writer: WriterType;
  content: string;
  createdAt: Date;
  status?: 'view' | 'edit';
}
