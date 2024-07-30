import Image from 'next/image';
import { UserProfileProps } from '@/types/user';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog';
import { sampleImage } from '../utill/constants';
import ProfileEdit from './ProfileEdit';

export default function Profile({ image, nickname }: UserProfileProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProfileEditClose = () => {
    setIsModalOpen(false);
  };

  // TODO: 여러개의 샘플 이미지 랜덤하게 뜨도록 추가 할 예정
  const profileImage = image || sampleImage;

  return (
    <div className='w-[130px] h-[240px] flex flex-col justify-center items-center absolute top-[-50px]'>
      <div>
        <div role='button' tabIndex={0} className='w-[120px] h-[120px] rounded-full overflow-hidden cursor-pointer'>
          <Image src={profileImage} alt='유저 프로필' className='w-full h-full object-cover' width={120} height={120} priority />
        </div>
      </div>
      <p className='mt-4 mb-6'>{nickname}</p>
      <div className='w-[130px] h-12 pl-4 pr-3.5 py-1.5 bg-zinc-100 rounded-[100px] justify-center items-center gap-1.5 inline-flex'>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button variant='outline' className='border-none'>
              프로필 수정
            </Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[425px] md:max-w-[1200px] bg-white' aria-describedby={undefined}>
            <ProfileEdit initialValues={{ image: profileImage, nickname }} onModalClose={handleProfileEditClose} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}