import React, { KeyboardEvent, useState } from 'react';
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
import { useMeQuery } from '@/hooks/userQueryHooks';

function AddEpigram() {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertContent, setAlertContent] = useState({ title: '', description: '' });
  const router = useRouter();
  const { data: userData } = useMeQuery();
  const [selectedAuthorOption, setSelectedAuthorOption] = useState('directly'); // 기본값을 'directly'로 설정

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

  const { currentTag, setCurrentTag, handleAddTag, handleRemoveTag } = useTagManagement(form.setValue, form.getValues);

  const addEpigramMutation = useAddEpigram({
    onSuccess: () => {
      setAlertContent({
        title: '등록 완료',
        description: '등록이 완료되었습니다.',
      });
      setIsAlertOpen(true);
      form.reset();
    },
    // TODO : 유효성검사 브랜치만들어서 alert창에 유효성검사 틀린부분을 보이게 할 예정
    onError: () => {
      setAlertContent({
        title: '등록 실패',
        description: '다시 확인해주세요.',
      });
      setIsAlertOpen(true);
    },
  });

  const handleAlertClose = () => {
    setIsAlertOpen(false);
    if (alertContent.title === '등록 완료') {
      router.push(`/epigram/${addEpigramMutation.data?.id}`);
    }
  };

  const authorOptions = [
    { value: 'directly', label: '직접 입력' },
    { value: 'unknown', label: '알 수 없음' },
    { value: 'me', label: '본인' },
  ];

  // NOTE: defautl를 직접 입력으로 설정
  // NOTE: 본인을 선택 시 유저의 nickname이 들어감
  const handleAuthorChange = async (value: string) => {
    setSelectedAuthorOption(value);
    let authorValue = '';
    if (value === 'unknown') {
      authorValue = '알 수 없음';
    } else if (value === 'me') {
      if (userData?.nickname) {
        authorValue = userData.nickname;
      } else {
        authorValue = '본인 (닉네임 없음)';
      }
    }
    form.setValue('author', authorValue);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleSubmit = (data: AddEpigramFormType) => {
    addEpigramMutation.mutate(data);
  };

  return (
    <>
      <Header icon='search' routerPage='/search' isLogo insteadOfLogo='' isProfileIcon isShareIcon={false} isButton={false} textInButton='' disabled={false} onClick={() => {}} />
      <div className='border-t-2 w-full flex flex-col justify-center items-center'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className='flex flex-col justify-center item-center gap-8 w-[312px] md:w-[384px] lg:w-[640px] py-6'>
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
                  <FormMessage />
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
                  {authorOptions.map((option) => (
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <fieldset className='flex flex-col gap-2 lg:gap-4'>
              <legend className='text-semibold lg:text-2xl text-black-600'>출처</legend>
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
                        className='h-11 lg:h-16 lg:text-2xl border-blue-300 border-2 rounded-xl p-2'
                        id='referenceUrl'
                        type='url'
                        placeholder='URL (ex.http://www.website.com)'
                        aria-label='출처 URL'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
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
                  </FormLabel>
                  <div className='relative'>
                    <Input
                      className='h-11 lg:h-16 lg:text-2xl border-blue-300 border-2 rounded-xl p-2 pr-20'
                      id='tags'
                      type='text'
                      placeholder='입력하여 태그 추가(최대10자)'
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value)}
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
                  {/* TODO: 태그 key값 수정 예정 */}
                  {/* NOTE: 지금은 똑같은 태그를 입력했을때 하나를 지우면 다 지워짐 */}
                  <div className='flex flex-wrap gap-2 mt-2'>
                    {field.value.map((tag) => (
                      <div key={tag} className='bg-background-100 px-2 py-1 rounded-full flex items-center'>
                        <span className='text-sm md:text-lg lg:text-2xl'>{tag}</span>
                        <Button type='button' className='ml-2 text-red-500 text-sm md:text-lg lg:text-2xl' onClick={() => handleRemoveTag(tag)}>
                          ×
                        </Button>
                      </div>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className='h-11 lg:h-16 rounded-xl text-semibold lg:text-2xl bg-black-500 text-white' type='submit' disabled={addEpigramMutation.isPending}>
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
