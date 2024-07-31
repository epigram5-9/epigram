import { useState } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { useMeQuery } from '@/hooks/userQueryHooks';
import { AddEpigramFormType } from '@/schema/addEpigram';

export const AUTHOR_OPTIONS = [
  { value: 'directly', label: '직접 입력' },
  { value: 'unknown', label: '알 수 없음' },
  { value: 'me', label: '본인' },
] as const;

type AuthorOption = (typeof AUTHOR_OPTIONS)[number]['value'];

interface UseAuthorSelectionProps {
  setValue: UseFormSetValue<AddEpigramFormType>;
  initialAuthor?: string;
}

export const useAuthorSelection = ({ setValue, initialAuthor = '' }: UseAuthorSelectionProps) => {
  const [selectedAuthorOption, setSelectedAuthorOption] = useState<AuthorOption>('directly');
  const { data: userData, isPending } = useMeQuery();

  const handleAuthorChange = (value: AuthorOption) => {
    setSelectedAuthorOption(value);
    let authorValue: string;

    switch (value) {
      case 'unknown':
        authorValue = '알 수 없음';
        break;
      case 'me':
        if (isPending) {
          authorValue = '로딩 중...';
        } else if (userData) {
          authorValue = userData.nickname;
        } else {
          authorValue = '본인 (정보 없음)';
        }
        break;
      default:
        authorValue = initialAuthor;
    }
    setValue('author', authorValue);
  };

  return {
    selectedAuthorOption,
    handleAuthorChange,
    AUTHOR_OPTIONS,
  };
};
