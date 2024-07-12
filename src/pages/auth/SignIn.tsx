import Image from 'next/image';
import Link from 'next/link';
import AuthLayout from '@/pageLayout/AuthLayout/AuthLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';

// 스키마 정의
const formSchema = z.object({
  email: z.string().min(1, { message: '이메일은 필수 입력입니다.' }).email({ message: '올바른 이메일 주소가 아닙니다.' }),
  password: z.string().min(1, { message: '비밀번호는 필수 입력입니다.' }),
});

export default function SignIn() {
  // 폼 정의
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // NOTE : 테스트를 위해서 콘솔 넣음
    /* eslint-disable no-console */
    console.log(values);
  }

  // TODO: 나중에 컴포넌트 분리하기
  return (
    <AuthLayout>
      <header className='mb-[50px] md:mb-[60px]'>
        <Link href='/'>
          <Image src='/lg.svg' alt='logo' width={172} height={48} />
        </Link>
      </header>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col items-center lg:gap-6 gap-5 w-full px-6'>
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
        <Link href='/'>
          <Button type='button' variant='link' className='lg:text-xl md:text-base sm:text-sm p-0 underline'>
            가입하기
          </Button>
        </Link>
      </div>
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
