import React from 'react';
import { useRouter } from 'next/router';
import { getMe } from '@/apis/user';

interface StartButtonProps {
  className?: string;
  children: React.ReactNode;
}

function StartButton({ className = '', children }: StartButtonProps) {
  const router = useRouter();

  const handleClick = async () => {
    try {
      const user = await getMe();
      if (user) {
        router.push('/epigrams');
      } else {
        router.push('/auth/SignIn');
      }
    } catch (error) {
      router.push('/auth/SignIn');
    }
  };

  return (
    <button
      type='button'
      className={`bg-zinc-700 justify-center items-center gap-2 inline-flex 
                  w-[112px] h-[48px] px-4 
                  md:w-[112px] md:h-[48px] md:px-4 
                  lg:w-[286px] lg:h-[64px] lg:px-4 
                  rounded-[12px]
                  opacity-100 
                  ${className}`}
      onClick={handleClick}
    >
      <div className='text-white text-[16px] lg:text-[20px] font-semibold font-pretendard leading-loose'>{children}</div>
    </button>
  );
}

export default StartButton;
