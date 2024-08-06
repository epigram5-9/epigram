import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { PostSigninRequest, PostSigninRequestType } from '@/schema/auth';
import useSigninMutation from '@/hooks/useSignInMutation';
import useRefreshToken from '@/hooks/useRefreshToken';

export default function SignIn() {
  const mutationSignin = useSigninMutation();
  const { mutate: refreshAccessToken } = useRefreshToken();
  const router = useRouter();

  useEffect(() => {
    const refreshToken = typeof window !== 'undefined' ? localStorage.getItem('refreshToken') : null;

    if (refreshToken) {
      refreshAccessToken({ refreshToken });
      router.push('/epigrams');
    }
  }, [refreshAccessToken]);

  // 폼 정의
  const form = useForm<PostSigninRequestType>({
    resolver: zodResolver(PostSigninRequest),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const trimWhitespace = (fieldName: keyof PostSigninRequestType, value: string) => {
    form.setValue(fieldName, value.trim(), { shouldValidate: true, shouldDirty: true });
  };

  return (
    <div className='flex flex-col justify-center items-center bg-background-100 w-full h-screen'>
      <header className='mb-[50px] md:mb-[60px]'>
        <Link href='/'>
          <Image src='/lg.svg' alt='logo' width={172} height={48} />
        </Link>
      </header>
      <Form {...form}>
        <form onSubmit={form.handleSubmit((values: PostSigninRequestType) => mutationSignin.mutate(values))} className='flex flex-col items-center lg:gap-6 gap-5 w-full px-6'>
          <div className='flex flex-col items-center lg:gap-4 gap-[10px] w-full lg:max-w-[640px] md:max-w-[384px]'>
            <FormField
              control={form.control}
              name='email'
              render={({ field, fieldState }) => (
                <FormItem className='w-full space-y-0'>
                  <FormControl>
                    <Input
                      {...field}
                      type='text'
                      placeholder='이메일'
                      onBlur={(e) => {
                        trimWhitespace('email', e.target.value);
                      }}
                      className={`lg:h-16 h-11 px-4 lg:text-xl md:text-base font-pretendard placeholder-blue-400 rounded-xl bg-blue-200 ${fieldState.invalid ? 'border-2 border-state-error' : 'focus:border-blue-500'}`}
                    />
                  </FormControl>
                  <FormMessage className='flex justify-end font-pretendard text-[13px] text-state-error' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field, fieldState }) => (
                <FormItem className='w-full space-y-0'>
                  <FormControl>
                    <Input
                      {...field}
                      type='password'
                      placeholder='비밀번호'
                      onBlur={(e) => {
                        trimWhitespace('password', e.target.value);
                      }}
                      className={`lg:h-16 h-11 px-4 lg:text-xl md:text-base font-pretendard placeholder-blue-400 rounded-xl bg-blue-200 ${fieldState.invalid ? 'border-2 border-state-error' : 'focus:border-blue-500'}`}
                    />
                  </FormControl>
                  <FormMessage className='flex justify-end font-pretendard text-[13px] text-state-error' />
                </FormItem>
              )}
            />
          </div>
          <Button
            type='submit'
            disabled={!form.formState.isValid}
            className={`w-full lg:max-w-[640px] md:max-w-[384px] lg:h-16 h-11 bg-black-500 font-pretendard text-white lg:text-xl md:text-base rounded-xl md:mb-[10px] mb-[11px] ${!form.formState.isValid ? 'bg-blue-300' : 'bg-black-500'}`}
          >
            로그인
          </Button>
        </form>
      </Form>
      <div className=' flex justify-end items-center gap-2 w-full lg:max-w-[640px] md:max-w-[384px] md:px-0 px-6 md:mb-[60px] mb-[50px]'>
        <h2 className='font-pretendard text-blue-400 lg:text-xl md:text-base sm:text-sm'>회원이 아니신가요?</h2>
        <Link href='/auth/SignUp'>
          <Button type='button' variant='link' className='lg:text-xl md:text-base sm:text-sm font-pretendard p-0 underline'>
            가입하기
          </Button>
        </Link>
      </div>
      <div className='flex flex-col items-center w-full lg:gap-10 gap-6'>
        <div className='flex justify-center items-center lg:gap-6 gap-[14px] w-full lg:max-w-[640px] md:max-w-[384px] lg:px-0 md:px-0 px-6'>
          <div className='flex-grow'>
            <Image src='/horizen.png' alt='horizen' width={180} height={0} className='w-full h-[2px]' />
          </div>
          <h3 className='lg:text-xl text-xs font-pretendard text-blue-400 whitespace-nowrap'>SNS 계정으로 로그인하기</h3>
          <div className='flex-grow'>
            <Image src='/horizen.png' alt='horizen' width={180} height={0} className='w-full h-[2px]' />
          </div>
        </div>
        <div className='flex justify-center gap-4'>
          <Link
            href={`https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}&state=${'test'}&redirect_uri=${process.env.NEXT_PUBLIC_NAVER_REDIRECT_URI}`}
          >
            <Image src='/logo-naver.svg' alt='logo-naver' width={60} height={60} className='md:size-[60px] size-10' />
          </Link>
          <Link
            href={`https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}&response_type=code&scope=openid%20profile%20email`}
          >
            <Image src='/logo-google.svg' alt='logo-google' width={60} height={60} className='md:size-[60px] size-10' />
          </Link>
          <Link href={`https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}&response_type=code`}>
            <Image src='/logo-kakao.svg' alt='logo-kakao' width={60} height={60} className='md:size-[60px] size-10' />
          </Link>
        </div>
      </div>
    </div>
  );
}
