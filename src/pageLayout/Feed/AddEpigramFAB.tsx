import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';

function AddEpigramFAB() {
  const router = useRouter();

  const handleAddEpigramClick = () => {
    router.push('/addEpigram');
  };

  return (
    <Button
      variant='default'
      size='lg'
      onClick={handleAddEpigramClick}
      className='z-10 bottom-[140px] md:bottom-[160px] right-6 h-12 lg:h-16 px-3.5 lg:px-5 py-3 lg:py-4 bg-[#2c394d] text-white rounded-[100px] shadow-lg justify-center items-center gap-1 inline-flex fixed cursor-pointer'
      role='button'
      aria-label='Add Epigram'
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleAddEpigramClick();
        }
      }}
    >
      <div className='w-6 h-6 relative'>
        <Image src='/icon/plus-icon.svg' alt='add icon' layout='fill' objectFit='contain' />
      </div>
      <span className='text-sm lg:text-xl font-semibold font-pretendard leading-normal lg:leading-loose'>에피그램 만들기</span>
    </Button>
  );
}

export default AddEpigramFAB;
