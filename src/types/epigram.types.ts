import { GetEpigramResponseType } from '@/schema/epigram';
import { GetUserResponseType } from '@/schema/user';

export interface EpigramFigureProps {
  epigram: GetEpigramResponseType;
  currentUserId: GetUserResponseType['id'] | undefined;
}
