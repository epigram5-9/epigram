import { useState } from 'react';
import { UseFormSetValue, UseFormGetValues } from 'react-hook-form';
import { AddEpigramFormType } from '@/schema/addEpigram';

const useTagManagement = (setValue: UseFormSetValue<AddEpigramFormType>, getValues: UseFormGetValues<AddEpigramFormType>) => {
  const [currentTag, setCurrentTag] = useState('');

  const handleAddTag = () => {
    if (currentTag && currentTag.length <= 10) {
      const currentTags = getValues('tags') || [];
      if (currentTags.length < 3) {
        setValue('tags', [...currentTags, currentTag]);
        setCurrentTag('');
      }
    }
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
