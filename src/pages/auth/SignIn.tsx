import Image from 'next/image';
import Link from 'next/link';
import AuthLayout from '@/pageLayout/AuthLayout/AuthLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function SignIn() {
  return (
    <AuthLayout>
      <header className='mb-[50px] md:mb-[60px]'>
        <Link href='/'>
          <Image src='/lg.svg' alt='logo' width={172} height={48} />
        </Link>
      </header>

      <form className='flex flex-col items-center w-full px-6'>
        <Input type='text' placeholder='이메일' className='lg:max-w-[640px] md:max-w-[384px] lg:h-16 px-4 lg:mb-4 mb-[10px] lg:text-xl md:text-base placeholder-blue-400 rounded-xl bg-blue-200' />
        <Input
          type='password'
          placeholder='비밀번호'
          className='lg:max-w-[640px] md:max-w-[384px] lg:h-16 px-4 lg:mb-6 mb-[20px] lg:text-xl md:text-base placeholder-blue-400 rounded-xl bg-blue-200'
        />
        <Button type='submit' className='w-full lg:max-w-[640px] md:max-w-[384px] lg:h-16 bg-black-500 text-white lg:text-xl md:text-base rounded-xl md:mb-[10px] mb-[11px]'>
          로그인
        </Button>
      </form>

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
          <Image src='/logo-naver.svg' alt='naver' width={60} height={60} className='md:size-[60px] size-10' />
        </Button>
        <Button type='button' className='md:size-[60px] p-0'>
          <Image src='/logo-google.svg' alt='naver' width={60} height={60} className='md:size-[60px] size-10' />
        </Button>
        <Button type='button' className='md:size-[60px] p-0'>
          <Image src='/logo-kakao.svg' alt='naver' width={60} height={60} className='md:size-[60px] size-10' />
        </Button>
      </div>
    </AuthLayout>
  );
}
