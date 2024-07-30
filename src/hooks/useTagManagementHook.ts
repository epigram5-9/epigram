import { useState } from 'react';
import { UseFormSetValue, UseFormGetValues, UseFormSetError } from 'react-hook-form';
import { AddEpigramFormType } from '@/schema/addEpigram';

// NOTE: setError메서드로 FormField에 에러 설정 가능
const useTagManagement = ({
  setValue,
  getValues,
  setError,
}: {
  setValue: UseFormSetValue<AddEpigramFormType>;
  getValues: UseFormGetValues<AddEpigramFormType>;
  setError: UseFormSetError<AddEpigramFormType>;
}) => {
  const [currentTag, setCurrentTag] = useState('');

  const handleAddTag = () => {
    if (!currentTag || currentTag.length > 10) {
      return;
    }
    const currentTags = getValues('tags') || [];

    if (currentTags.length >= 3) {
      return;
    }
    if (currentTags.includes(currentTag)) {
      setError('tags', { type: 'manual', message: '이미 저장된 태그입니다.' });
      return;
    }

    setValue('tags', [...currentTags, currentTag]);
    setCurrentTag('');
    setError('tags', { type: 'manual', message: '' });
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const currentTags = getValues('tags') || [];
    setValue(
      'tags',
      currentTags.filter((tag) => tag !== tagToRemove),
    );
  };

  return { currentTag, setCurrentTag, handleAddTag, handleRemoveTag };
};

export default useTagManagement;
