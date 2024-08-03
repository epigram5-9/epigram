import Image from 'next/image';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { PostSigninRequest, PostSigninRequestType } from '@/schema/auth';
import useSigninMutation from '@/hooks/useSignInMutation';

export default function SignIn() {
  const mutationSignin = useSigninMutation();
  // 폼 정의
  const form = useForm<PostSigninRequestType>({
    resolver: zodResolver(PostSigninRequest),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // TODO: 나중에 컴포넌트 분리하기
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
                      type='text'
                      placeholder='이메일'
                      className={`lg:h-16 h-11 px-4 lg:text-xl md:text-base placeholder-blue-400 rounded-xl bg-blue-200 ${fieldState.invalid ? 'border-2 border-state-error' : ''}`}
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
                <FormItem className='w-full space-y-0'>
                  <FormControl>
                    <Input
                      type='password'
                      placeholder='비밀번호'
                      className={`lg:h-16 h-11 px-4 lg:text-xl md:text-base placeholder-blue-400 rounded-xl bg-blue-200 ${fieldState.invalid ? 'border-2 border-state-error' : ''}`}
                      {...field}
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
            className={`w-full lg:max-w-[640px] md:max-w-[384px] lg:h-16 h-11 bg-black-500 text-white lg:text-xl md:text-base rounded-xl md:mb-[10px] mb-[11px] ${!form.formState.isValid ? 'bg-blue-300' : 'bg-black-500'}`}
          >
            로그인
          </Button>
        </form>
      </Form>
      <div className=' flex justify-end items-center gap-2 w-full lg:max-w-[640px] md:max-w-[384px] md:px-0 px-6 md:mb-[60px] mb-[50px]'>
        <h2 className=' text-blue-400 lg:text-xl md:text-base sm:text-sm'>회원이 아니신가요?</h2>
        <Link href='/auth/SignUp'>
          <Button type='button' variant='link' className='lg:text-xl md:text-base sm:text-sm p-0 underline'>
            가입하기
          </Button>
        </Link>
      </div>
      <div className='flex gap-4'>
        <Link
          href={`https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}&state=${'test'}&redirect_uri=${process.env.NEXT_PUBLIC_NAVER_REDIRECT_URI}`}
        >
          <Image src='/logo-naver.svg' alt='logo-naver' width={60} height={60} className='md:size-[60px] size-10' />
        </Link>
        {/* // FIXME: 구글 간편 로그인 리다이렉트시 500에러가 발생하는 부분으로 주석 처리하였음  */}
        {/* <Link
          href={`https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}&response_type=code&scope=email%20profile`}
        > */}
        <Image src='/logo-google.svg' alt='logo-google' width={60} height={60} className='md:size-[60px] size-10' />
        {/* </Link> */}
        <Link href={`https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}&response_type=code`}>
          <Image src='/logo-kakao.svg' alt='logo-kakao' width={60} height={60} className='md:size-[60px] size-10' />
        </Link>
      </div>
    </div>
  );
}
