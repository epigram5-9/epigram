import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { PostSignUpRequest, PostSignUpRequestType } from '@/schema/auth';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import useRegisterMutation from '@/hooks/useRegisterMutation';
import useRefreshToken from '@/hooks/useRefreshToken';

export default function SignUp() {
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const { mutate: refreshAccessToken } = useRefreshToken();
  const router = useRouter();

  useEffect(() => {
    const refreshToken = typeof window !== 'undefined' ? localStorage.getItem('refreshToken') : null;

    if (refreshToken) {
      refreshAccessToken({ refreshToken });
      router.push('/epigrams');
    }
  }, [refreshAccessToken]);

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

  const { setFocus, setValue, trigger } = form;

  const handleFieldError = (field: 'email' | 'nickname') => {
    setFocus(field);
    setFocusedField(field);
  };

  const mutationRegister = useRegisterMutation(handleFieldError);

  const trimWhitespace = (fieldName: keyof PostSignUpRequestType, value: string) => {
    setValue(fieldName, value.trim(), { shouldValidate: true, shouldDirty: true });
    trigger(fieldName);
  };

  return (
    <div className='flex flex-col justify-center items-center bg-background-100 w-full min-h-screen'>
      <header className='h-full mb-[50px] md:mb-[60px]'>
        <Link href='/'>
          <Image src='/lg.svg' alt='logo' width={172} height={48} />
        </Link>
      </header>
      <div className='w-full'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit((values: PostSignUpRequestType) => mutationRegister.mutate(values))} className='flex flex-col items-center w-full h-full px-6'>
            <FormField
              control={form.control}
              name='email'
              render={({ field, fieldState }) => (
                <FormItem className='flex flex-col w-full lg:max-w-[640px] md:max-w-[384px] space-y-0 md:mb-10 mb-5'>
                  <FormLabel className={`md:mb-5 mb-4 font-pretendard lg:text-xl md:text-base sm:text-sm ${fieldState.invalid || focusedField === 'email' ? 'text-state-error' : 'text-blue-900'}`}>
                    이메일
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type='text'
                      placeholder='이메일'
                      onBlur={(e) => {
                        trimWhitespace('email', e.target.value);
                      }}
                      className={`lg:h-16 h-11 px-4 lg:text-xl md:text-base placeholder-blue-400 rounded-xl bg-blue-200 font-pretendard ${
                        fieldState.invalid || focusedField === 'email' ? 'border-2 border-state-error' : 'focus:border-blue-500'
                      }`}
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
                      {...field}
                      type='password'
                      placeholder='비밀번호'
                      onBlur={(e) => trimWhitespace('password', e.target.value)}
                      className={`lg:h-16 h-11 px-4 lg:text-xl md:text-base placeholder-blue-400 rounded-xl bg-blue-200 font-pretendard ${fieldState.invalid ? 'border-2 border-state-error' : 'focus:border-blue-500'}`}
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
                      {...field}
                      type='password'
                      placeholder='비밀번호 확인'
                      onBlur={(e) => trimWhitespace('passwordConfirmation', e.target.value)}
                      className={`lg:h-16 h-11 px-4 lg:text-xl md:text-base placeholder-blue-400 rounded-xl bg-blue-200 font-pretendard ${fieldState.invalid ? 'border-2 border-state-error' : 'focus:border-blue-500'}`}
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
                  <FormLabel className={`md:mb-5 mb-4 font-pretendard lg:text-xl md:text-base sm:text-sm ${fieldState.invalid || focusedField === 'nickname' ? 'text-state-error' : 'text-blue-900'}`}>
                    닉네임
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type='text'
                      placeholder='닉네임'
                      onBlur={(e) => trimWhitespace('nickname', e.target.value)}
                      className={`lg:h-16 h-11 px-4 lg:text-xl md:text-base placeholder-blue-400 rounded-xl bg-blue-200 font-pretendard ${fieldState.invalid || focusedField === 'nickname' ? 'border-2 border-state-error' : 'focus:border-blue-500'}`}
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
    </div>
  );
}
