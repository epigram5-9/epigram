import Image from 'next/image';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { PostSignUpRequest, PostSignUpRequestType } from '@/schema/auth';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

export default function SignUp() {
  const form = useForm<PostSignUpRequestType>({
    resolver: zodResolver(PostSignUpRequest),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
      passwordConfirmation: '',
      nickname: '',
    },
  });

  return (
    <div className='flex flex-col justify-center items-center bg-background-100 w-full min-h-screen'>
      <header className='h-full mb-[50px] md:mb-[60px]'>
        <Link href='/'>
          <Image src='/lg.svg' alt='logo' width={172} height={48} />
        </Link>
      </header>
      <div className='w-full'>
        <Form {...form}>
          <form className='flex flex-col items-center w-full h-full px-6'>
            <FormField
              control={form.control}
              name='email'
              render={({ field, fieldState }) => (
                <FormItem className='flex flex-col w-full lg:max-w-[640px] md:max-w-[384px] space-y-0 md:mb-10 mb-5'>
                  <FormLabel className={`md:mb-5 mb-4 font-pretendard lg:text-xl md:text-base sm:text-sm ${fieldState.invalid ? 'text-state-error' : 'text-blue-900'}`}>이메일</FormLabel>
                  <FormControl>
                    <Input
                      type='text'
                      placeholder='이메일'
                      className={`lg:h-16 h-11 px-4 lg:text-xl md:text-base placeholder-blue-400 rounded-xl bg-blue-200 font-pretendard ${fieldState.invalid ? 'border-2 border-state-error' : ''}`}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className='flex justify-end text-[13px] text-state-error' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field, fieldState }) => (
                <FormItem className='flex flex-col w-full lg:max-w-[640px] md:max-w-[384px] space-y-0 md:mb-4 mb-[10px]'>
                  <FormLabel className={`md:mb-5 mb-4 font-pretendard lg:text-xl md:text-base sm:text-sm ${fieldState.invalid ? 'text-state-error' : 'text-blue-900'}`}>비밀번호</FormLabel>
                  <FormControl>
                    <Input
                      type='password'
                      placeholder='비밀번호'
                      className={`lg:h-16 h-11 px-4 lg:text-xl md:text-base placeholder-blue-400 rounded-xl bg-blue-200 font-pretendard ${fieldState.invalid ? 'border-2 border-state-error' : ''}`}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className='flex justify-end text-[13px] text-state-error' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='passwordConfirmation'
              render={({ field, fieldState }) => (
                <FormItem className='flex flex-col w-full lg:max-w-[640px] md:max-w-[384px] space-y-0 md:mb-10 mb-5'>
                  <FormControl>
                    <Input
                      type='password'
                      placeholder='비밀번호 확인'
                      className={`lg:h-16 h-11 px-4 lg:text-xl md:text-base placeholder-blue-400 rounded-xl bg-blue-200 font-pretendard ${fieldState.invalid ? 'border-2 border-state-error' : ''}`}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className='flex justify-end text-[13px] text-state-error' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='nickname'
              render={({ field, fieldState }) => (
                <FormItem className='flex flex-col w-full lg:max-w-[640px] md:max-w-[384px] md:mb-10 mb-[30px] space-y-0'>
                  <FormLabel className={`md:mb-5 mb-4 font-pretendard lg:text-xl md:text-base sm:text-sm ${fieldState.invalid ? 'text-state-error' : 'text-blue-900'}`}>닉네임</FormLabel>
                  <FormControl>
                    <Input
                      type='text'
                      placeholder='닉네임'
                      className={`lg:h-16 h-11 px-4 lg:text-xl md:text-base placeholder-blue-400 rounded-xl bg-blue-200 font-pretendard ${fieldState.invalid ? 'border-2 border-state-error' : ''}`}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className='flex justify-end text-[13px] text-state-error' />
                </FormItem>
              )}
            />
            <Button
              disabled={!form.formState.isValid}
              type='submit'
              className={`w-full lg:max-w-[640px] md:max-w-[384px] lg:h-16 h-11 md:mb-[60px] mb-[50px] bg-black-500 font-pretendard text-white lg:text-xl md:text-base rounded-xl ${!form.formState.isValid ? 'bg-blue-300' : 'bg-black-500'}`}
            >
              가입하기
            </Button>
          </form>
        </Form>
      </div>
      <div className='flex justify-center gap-4'>
        <Button type='button' className='md:size-[60px] p-0'>
          <Image src='/logo-naver.svg' alt='logo-naver' width={60} height={60} className='md:size-[60px] size-10' />
        </Button>
        <Button type='button' className='md:size-[60px] p-0'>
          <Image src='/logo-google.svg' alt='logo-google' width={60} height={60} className='md:size-[60px] size-10' />
        </Button>
        <Button type='button' className='md:size-[60px] p-0'>
          <Image src='/logo-kakao.svg' alt='logo-kakao' width={60} height={60} className='md:size-[60px] size-10' />
        </Button>
      </div>
    </div>
  );
}
