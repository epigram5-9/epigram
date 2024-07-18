import Image from 'next/image';
import Link from 'next/link';
import AuthLayout from '@/pageLayout/AuthLayout/AuthLayout';
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
    <AuthLayout>
      <header className='mb-[50px] md:mb-[60px]'>
        <Link href='/'>
          <Image src='/lg.svg' alt='logo' width={172} height={48} />
        </Link>
      </header>
      <Form {...form}>
        <form className='flex flex-col items-center md:gap-10 gap-[30px] w-full px-6 md:mb-[60px] mb-[50px]'>
          <div className='flex flex-col items-center md:gap-10 gap-5 w-full lg:max-w-[640px] md:max-w-[384px]'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem className='flex flex-col md:gap-5 gap-4 w-full space-y-0'>
                  <FormLabel className='font-pretendard text-blue-900 lg:text-xl md:text-base sm:text-sm'>이메일</FormLabel>
                  <FormControl>
                    <Input type='text' placeholder='이메일' className='lg:h-16 h-11 px-4 lg:text-xl md:text-base placeholder-blue-400 rounded-xl bg-blue-200 font-pretendard' {...field} />
                  </FormControl>
                  <FormMessage className='flex justify-end text-[13px] text-state-error' />
                </FormItem>
              )}
            />
            <div className='flex flex-col items-center md:gap-4 gap-[10px] w-full lg:max-w-[640px] md:max-w-[384px]'>
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem className='flex flex-col md:gap-5 gap-4 w-full space-y-0'>
                    <FormLabel className='font-pretendard text-blue-900 lg:text-xl md:text-base sm:text-sm'>비밀번호</FormLabel>
                    <FormControl>
                      <Input type='password' placeholder='비밀번호' className='lg:h-16 h-11 px-4 lg:text-xl md:text-base placeholder-blue-400 rounded-xl bg-blue-200 font-pretendard' {...field} />
                    </FormControl>
                    <FormMessage className='flex justify-end text-[13px] text-state-error' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='passwordConfirmation'
                render={({ field }) => (
                  <FormItem className='flex flex-col md:gap-5 gap-4 w-full space-y-0'>
                    <FormControl>
                      <Input type='password' placeholder='비밀번호 확인' className='lg:h-16 h-11 px-4 lg:text-xl md:text-base placeholder-blue-400 rounded-xl bg-blue-200 font-pretendard' {...field} />
                    </FormControl>
                    <FormMessage className='flex justify-end text-[13px] text-state-error' />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name='nickname'
              render={({ field }) => (
                <FormItem className='flex flex-col md:gap-5 gap-4 w-full space-y-0'>
                  <FormLabel className='font-pretendard text-blue-900 lg:text-xl md:text-base sm:text-sm'>닉네임</FormLabel>
                  <FormControl>
                    <Input type='text' placeholder='닉네임' className='lg:h-16 h-11 px-4 lg:text-xl md:text-base placeholder-blue-400 rounded-xl bg-blue-200 font-pretendard' {...field} />
                  </FormControl>
                  <FormMessage className='flex justify-end text-[13px] text-state-error' />
                </FormItem>
              )}
            />
          </div>
          <Button type='submit' className='w-full lg:max-w-[640px] md:max-w-[384px] lg:h-16 h-11 bg-black-500 font-pretendard text-white lg:text-xl md:text-base rounded-xl'>
            가입하기
          </Button>
        </form>
      </Form>
      <div className='flex gap-4'>
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
    </AuthLayout>
  );
}
