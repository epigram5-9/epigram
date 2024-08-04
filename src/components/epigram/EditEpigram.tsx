import React, { KeyboardEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { AddEpigramFormSchema, AddEpigramFormType, EditEpigramRequestType } from '@/schema/addEpigram';
import useEditEpigram from '@/hooks/useEditEpigramHook';
import useTagManagement from '@/hooks/useTagManagementHook';
import { GetEpigramResponseType } from '@/schema/epigram';
import { useAuthorSelection } from '@/hooks/useAuthorSelectionHook';
import { AxiosError } from 'axios';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import NewHeader from '../Header/NewHeader';

interface EditEpigramProps {
  epigram: GetEpigramResponseType;
}

function EditEpigram({ epigram }: EditEpigramProps) {
  const router = useRouter();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertContent, setAlertContent] = useState({ title: '', description: '' });

  const form = useForm<AddEpigramFormType>({
    resolver: zodResolver(AddEpigramFormSchema),
    defaultValues: {
      content: epigram.content,
      author: epigram.author,
      referenceTitle: epigram.referenceTitle || '',
      referenceUrl: epigram.referenceUrl || '',
      tags: epigram.tags.map((tag) => tag.name),
    },
  });

  const { selectedAuthorOption, handleAuthorChange, AUTHOR_OPTIONS } = useAuthorSelection({
    setValue: form.setValue,
    initialAuthor: epigram.author,
  });

  useEffect(() => {
    if (epigram) {
      form.reset({
        content: epigram.content,
        author: epigram.author,
        referenceTitle: epigram.referenceTitle || '',
        referenceUrl: epigram.referenceUrl || '',
        tags: epigram.tags.map((tag) => tag.name),
      });
    }
  }, [epigram, form]);

  const { currentTag, setCurrentTag, handleAddTag, handleRemoveTag } = useTagManagement({
    setValue: form.setValue,
    getValues: form.getValues,
    setError: form.setError,
  });

  const editEpigramMutation = useEditEpigram({
    onSuccess: () => {
      setAlertContent({
        title: '수정 완료',
        description: '에피그램이 성공적으로 수정되었습니다.',
      });
      setIsAlertOpen(true);
    },
    onError: (error) => {
      let errorMessage = '다시 시도해주세요.';

      if (error instanceof AxiosError) {
        if (error.response?.status === 400) {
          errorMessage = '입력 내용을 다시 확인해주세요.';
        } else if (error.response?.status === 401) {
          errorMessage = '로그인이 필요합니다.';
        } else if (error.response?.status === 403) {
          errorMessage = '수정 권한이 없습니다.';
        } else if (error.response?.status === 404) {
          errorMessage = '해당 에피그램을 찾을 수 없습니다.';
        }
      }

      setAlertContent({
        title: '수정 실패',
        description: errorMessage,
      });
      setIsAlertOpen(true);
    },
  });

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleSubmit = (data: AddEpigramFormType) => {
    const editRequest: EditEpigramRequestType = {
      id: epigram.id,
      ...data,
      referenceTitle: data.referenceTitle?.trim() || null,
      referenceUrl: data.referenceUrl?.trim() || null,
    };

    if (!editRequest.referenceTitle && !editRequest.referenceUrl) {
      delete editRequest.referenceTitle;
      delete editRequest.referenceUrl;
    }
    editEpigramMutation.mutate(editRequest);
  };

  const handleAlertClose = () => {
    setIsAlertOpen(false);
    if (alertContent.title === '수정 완료') {
      router.push(`/epigrams/${epigram.id}`);
    }
  };

  return (
    <>
      <NewHeader />
      <div className='border-t-2 w-full flex flex-col justify-center items-center'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className='flex flex-col justify-center item-center gap-6 lg:gap-8 w-[312px] md:w-[384px] lg:w-[640px] py-6'>
            <FormField
              control={form.control}
              name='content'
              render={({ field }) => (
                <FormItem className='flex flex-col gap-2 lg:gap-4 h-44 lg:h-52'>
                  <FormLabel className='text-semibold lg:text-2xl text-black-600' htmlFor='content'>
                    내용
                  </FormLabel>
                  <FormControl>
                    <Textarea className='h-[132px] lg:h-[148px] lg:text-xl border-blue-300 border-2 rounded-xl resize-none p-2' id='content' {...field} placeholder='에피그램 내용을 입력하세요.' />
                  </FormControl>
                  <FormMessage className='text-state-error text-right' />
                </FormItem>
              )}
            />
            <div className='flex flex-col gap-2 lg:gap-4'>
              <FormLabel className='text-semibold lg:text-2xl text-black-600'>
                저자
                <span className='text-state-error'>*</span>
              </FormLabel>
              <RadioGroup onValueChange={handleAuthorChange} value={selectedAuthorOption}>
                <div className='flex gap-2'>
                  {AUTHOR_OPTIONS.map((option) => (
                    <div key={option.value} className='flex items-center space-x-2 text-xl'>
                      <RadioGroupItem value={option.value} id={option.value} />
                      <FormLabel htmlFor={option.value} className='font-medium lg:text-xl'>
                        {option.label}
                      </FormLabel>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
            <FormField
              control={form.control}
              name='author'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input className='w-full h-11 lg:h-16 lg:text-2xl border-blue-300 border-2 rounded-xl p-2' id='author' type='text' placeholder='저자 이름 입력' {...field} />
                  </FormControl>
                  <FormMessage className='text-state-error text-right' />
                </FormItem>
              )}
            />
            <div className='space-y-2'>
              <p className='text-sm font-medium text-gray-700'>출처</p>
              <div className='space-y-2'>
                <FormField
                  control={form.control}
                  name='referenceTitle'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className='w-full h-11 lg:h-16 lg:text-2xl border-blue-300 border-2 rounded-xl p-2 placeholder:text-gray-400 placeholder:text-sm'
                          {...field}
                          placeholder='출처 제목 입력'
                          aria-label='출처 제목'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='referenceUrl'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className='w-full h-11 lg:h-16 lg:text-2xl border-blue-300 border-2 rounded-xl p-2 placeholder:text-gray-400 placeholder:text-sm'
                          {...field}
                          placeholder='URL (ex. https://www.website.com)'
                          aria-label='출처 URL'
                        />
                      </FormControl>
                      <FormMessage className='text-state-error' />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <FormField
              control={form.control}
              name='tags'
              render={({ field }) => (
                <FormItem className='flex flex-col gap-2 lg:gap-4'>
                  <FormLabel htmlFor='tags' className='text-semibold lg:text-2xl text-black-600'>
                    태그
                    <span className='text-state-error'>*</span>
                  </FormLabel>
                  <div className='relative'>
                    <Input
                      className='h-11 lg:h-16 lg:text-2xl border-blue-300 border-2 rounded-xl p-2 pr-20'
                      id='tags'
                      type='text'
                      placeholder='입력하여 태그 추가(최대10자)'
                      value={currentTag}
                      onChange={(e) => {
                        setCurrentTag(e.target.value);
                        form.clearErrors('tags');
                      }}
                      onKeyDown={handleKeyDown}
                      maxLength={10}
                    />
                    <Button
                      type='button'
                      className='absolute right-2 top-1/2 transform -translate-y-1/2 h-8 px-3 bg-blue-500 text-white rounded'
                      onClick={handleAddTag}
                      disabled={field.value.length >= 3 || currentTag.length === 0}
                    >
                      저장
                    </Button>
                  </div>
                  <FormMessage className='text-state-error text-right' />
                  {/* NOTE: 태그의 키값을 변경하는 대신 중복된 태그를 저장 못하게 설정 */}
                  <div className='flex flex-wrap gap-2 mt-2'>
                    {field.value.map((tag) => (
                      <div key={tag} className='bg-background-100 px-2 py-1 rounded-full flex items-center'>
                        <span className='text-sm md:text-lg lg:text-2xl'>{tag}</span>
                        <Button type='button' className='text-red-500 text-sm md:text-lg lg:text-2xl p-0 px-2' onClick={() => handleRemoveTag(tag)}>
                          ×
                        </Button>
                      </div>
                    ))}
                  </div>
                </FormItem>
              )}
            />
            <Button className='h-11 lg:h-16 rounded-xl text-semibold lg:text-2xl text-white bg-black-500 disabled:bg-blue-400 ' type='submit'>
              수정하기
            </Button>
          </form>
        </Form>

        <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
          <AlertDialogContent className='bg-white'>
            <AlertDialogHeader>
              <AlertDialogTitle>{alertContent.title}</AlertDialogTitle>
              <AlertDialogDescription>{alertContent.description}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={handleAlertClose}>확인</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
}

export default EditEpigram;
