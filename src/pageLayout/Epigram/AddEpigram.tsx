import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Header from '@/components/Header/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { AddEpigramFormSchema, AddEpigramFormType } from '@/schema/addEpigram';

function AddEpigram() {
  const form = useForm<AddEpigramFormType>({
    resolver: zodResolver(AddEpigramFormSchema),
    defaultValues: {
      content: '',
      author: '',
      referenceTitle: '',
      referenceUrl: '',
      tags: '',
    },
  });

  const onSubmit = (data: AddEpigramFormType) => {
    // data 확인용 콘솔출력
    /* eslint-disable no-console */
    console.log(data);
  };

  return (
    <>
      <Header icon='search' routerPage='/search' isLogo insteadOfLogo='' isProfileIcon isShareIcon={false} isButton={false} textInButton='' disabled={false} onClick={() => {}} />
      <div className='border-t-2 w-full flex flex-col justify-center items-center'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col justify-center item-center gap-8 w-[312px] md:w-[384px] lg:w-[640px] py-6'>
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
              <RadioGroup
                onValueChange={(value) => {
                  if (value === 'unknown') form.setValue('author', '알 수 없음');
                  else if (value === 'me') form.setValue('author', '본인');
                  else form.setValue('author', '');
                }}
              >
                <div className='flex gap-2'>
                  <div className='flex items-center space-x-2 text-xl'>
                    <RadioGroupItem value='directly' id='directly' />
                    <FormLabel htmlFor='directly' className='font-medium lg:text-xl'>
                      직접 입력
                    </FormLabel>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem value='unknown' id='unknown' />
                    <FormLabel htmlFor='unknown' className='font-medium lg:text-xl'>
                      알 수 없음
                    </FormLabel>
                  </div>
                  <div className='flex items-center space-x-2 text-xl'>
                    <RadioGroupItem value='me' id='me' />
                    <FormLabel htmlFor='me' className='font-medium lg:text-xl'>
                      본인
                    </FormLabel>
                  </div>
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
                  <FormControl>
                    <Input className='h-11 lg:h-16 lg:text-2xl border-blue-300 border-2 rounded-xl p-2' id='tags' type='text' placeholder='입력하여 태그 검색(최대10자)' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className='h-11 lg:h-16 rounded-xl text-semibold lg:text-2xl bg-blue-300 text-white' type='submit'>
              작성 완료
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}

export default AddEpigram;
