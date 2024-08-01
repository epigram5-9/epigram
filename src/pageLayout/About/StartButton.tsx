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
    <button type='button' className={`w-[286px] h-16 px-4 bg-zinc-700 rounded-xl justify-center items-center gap-2 inline-flex ${className}`} onClick={handleClick}>
      <div className='text-white text-xl font-semibold font-pretendard leading-loose'>{children}</div>
    </button>
  );
}

export default StartButton;
