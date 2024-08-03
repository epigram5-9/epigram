import React, { KeyboardEvent, useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Header from '@/components/Header/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { AddEpigramFormSchema, AddEpigramFormType } from '@/schema/addEpigram';
import useAddEpigram from '@/hooks/epigramQueryHook';
import { useRouter } from 'next/router';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import useTagManagement from '@/hooks/useTagManagementHook';
import { useAuthorSelection } from '@/hooks/useAuthorSelectionHook';

function AddEpigram() {
  const router = useRouter();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertContent, setAlertContent] = useState({ title: '', description: '' });
  const [isFormValid, setIsFormValid] = useState(false);

  const form = useForm<AddEpigramFormType>({
    resolver: zodResolver(AddEpigramFormSchema),
    defaultValues: {
      content: '',
      author: '',
      referenceTitle: '',
      referenceUrl: '',
      tags: [],
    },
  });

  const { selectedAuthorOption, handleAuthorChange, AUTHOR_OPTIONS } = useAuthorSelection({
    setValue: form.setValue,
  });

  // NOTE: 필수항목들에 값이 들어있는지 확인 함수
  const checkFormEmpty = useCallback(() => {
    const { content, author, tags } = form.getValues();
    return content.trim() !== '' && author.trim() !== '' && tags.length > 0;
  }, [form]);

  // NOTE: form값이 변경될때 필수항목들이 들어있는지 확인
  const watchForm = useCallback(() => {
    setIsFormValid(checkFormEmpty());
  }, [checkFormEmpty]);

  useEffect(() => {
    const subscription = form.watch(watchForm);
    return () => subscription.unsubscribe();
  }, [form, watchForm]);

  const { currentTag, setCurrentTag, handleAddTag, handleRemoveTag } = useTagManagement({
    setValue: form.setValue,
    getValues: form.getValues,
    setError: form.setError,
  });
  const addEpigramMutation = useAddEpigram({
    onSuccess: () => {
      setAlertContent({
        title: '등록 완료',
        description: '등록이 완료되었습니다.',
      });
      setIsAlertOpen(true);
      form.reset();
    },
    onError: () => {
      setAlertContent({
        title: '등록 실패',
        description: '다시 시도해주세요.',
      });
      setIsAlertOpen(true);
    },
  });

  const handleAlertClose = () => {
    setIsAlertOpen(false);
    if (alertContent.title === '등록 완료') {
      router.push(`/epigrams/${addEpigramMutation.data?.id}`);
    }
  };

  // NOTE: handleKeyUp을 사용했더니 폼제출이 먼저 실행돼서 다시 handleKeyDown으로 수정
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  // NOTE: url와title은 필수 항목이 아니라서 빈칸으로 제출할 때 항목에서 제외
  const handleSubmit = (data: AddEpigramFormType) => {
    const submitData = { ...data };

    if (!submitData.referenceUrl) {
      delete submitData.referenceUrl;
    }

    if (!submitData.referenceTitle) {
      delete submitData.referenceTitle;
    }

    addEpigramMutation.mutate(submitData);
  };

  return (
    <>
      <Header icon='search' isLogo insteadOfLogo='' isProfileIcon isShareIcon={false} isButton={false} textInButton='' disabled={false} onClick={() => {}} />
      <div className='border-t-2 w-full flex flex-col justify-center items-center'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className='flex flex-col justify-center item-center gap-6 lg:gap-8 w-[312px] md:w-[384px] lg:w-[640px] py-6'>
            <FormField
              control={form.control}
              name='content'
              render={({ field }) => (
                <FormItem className='flex flex-col gap-2 lg:gap-4 h-44 lg:h-52'>
                  <FormLabel htmlFor='content' className='text-semibold lg:text-2xl text-black-600'>
                    내용
                    <span className='text-state-error'>*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea className='h-[132px] lg:h-[148px] lg:text-xl border-blue-300 border-2 rounded-xl resize-none p-2' id='content' placeholder='500자 이내로 입력해주세요.' {...field} />
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
                    {/* NOTE: 직접 입력 radio버튼을 선택하지않으면 수정 불가 */}
                    <Input
                      className='w-full h-11 lg:h-16 lg:text-2xl border-blue-300 border-2 rounded-xl p-2'
                      id='author'
                      type='text'
                      placeholder='저자 이름 입력'
                      {...field}
                      disabled={selectedAuthorOption !== 'directly'}
                    />
                  </FormControl>
                  <FormMessage className='text-state-error text-right' />
                </FormItem>
              )}
            />
            <fieldset className='flex flex-col gap-2 lg:gap-4'>
              <legend className='text-semibold lg:text-2xl text-black-600 mb-1'>출처</legend>
              <FormField
                control={form.control}
                name='referenceTitle'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className='h-11 lg:h-16 lg:text-2xl border-blue-300 border-2 rounded-xl p-2'
                        id='referenceTitle'
                        type='text'
                        placeholder='출처 제목 입력'
                        aria-label='출처 제목'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='text-state-error text-right' />
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
                        className='h-11 lg:h-16 lg:text-2xl border-blue-300 border-2 rounded-xl p-2'
                        id='referenceUrl'
                        type='text'
                        placeholder='URL (ex.http://www.website.com)'
                        aria-label='출처 URL'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='text-state-error text-right' />
                  </FormItem>
                )}
              />
            </fieldset>
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
            {/* NOTE: 필수항목들에 값이 채워져있으면 폼제출 버튼 활성화 */}
            <Button className='h-11 lg:h-16 rounded-xl text-semibold lg:text-2xl text-white bg-black-500 disabled:bg-blue-400 ' type='submit' disabled={addEpigramMutation.isPending || !isFormValid}>
              {addEpigramMutation.isPending ? '제출 중...' : '작성 완료'}
            </Button>
          </form>
        </Form>
      </div>

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
    </>
  );
}

export default AddEpigram;
