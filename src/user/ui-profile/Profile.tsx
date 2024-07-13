import Image from 'next/image';
import { UserProfileProps } from '@/types/user';
import { useState } from 'react';

import { sampleImage } from '../util/constants';
import ProfileEdit from './ProfileEdit';

export default function Profile({ profileImage, nickname }: UserProfileProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // TODO: 여러개의 샘플 이미지 랜덤하게 뜨도록 추가 할 예정
  const image = profileImage || sampleImage[1];

  const handleProfileEditOpen = () => {
    setIsModalOpen(true);
  };

  const handleProfileEditClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className='w-[130px] h-[240px] flex flex-col justify-center items-center absolute top-[-50px]'>
        <div>
          <div role='button' tabIndex={0} className='w-[120px] h-[120px] rounded-full overflow-hidden cursor-pointer'>
            <Image src={image} alt='유저 프로필' className='w-full h-full object-cover' width={120} height={120} priority />
          </div>
        </div>
        <p className='mt-4 mb-6'>{nickname}</p>
        <div className='w-[130px] h-12 pl-4 pr-3.5 py-1.5 bg-zinc-100 rounded-[100px] justify-center items-center gap-1.5 inline-flex'>
          <button type='button' className="text-neutral-400 text-xl font-medium font-['Pretendard'] leading-loose" onClick={handleProfileEditOpen}>
            프로필 수정
          </button>
        </div>
      </div>

      {isModalOpen && <ProfileEdit profileImage={image} nickname={nickname} onModalClose={handleProfileEditClose} />}
    </>
  );
}
