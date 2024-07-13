import Image from 'next/image';
import { UserProfileProps } from '@/types/user';
import { Input } from '@/components/ui/input';

export default function ProfileEdit({ profileImage, nickname }: UserProfileProps) {
  return (
    <div className='w-full h-full flex flex-col justify-center items-center fixed top-0 bg-background-100'>
      <div className='w-[1200px]'>
        <div className='w-full h-[600px] py-[50px] px-[100px] flex justify-center gap-[60px] shadow-3xl'>
          <div className='w-[400px] flex flex-col gap-8 justify-center items-start'>
            <button type='button' className='rounded-xl bg-blue-400 text-white shadow-sm text-lg p-3'>
              프로필 사진 변경
            </button>
            <Input type='text' value={nickname} className='text-lg p-3' />
          </div>
          <div className='w-[500px] flex flex-col gap-8 justify-center items-center'>
            <div className='w-[200px] h-[200px] rounded-full overflow-hidden cursor-pointer'>
              <Image src={profileImage} alt='유저 프로필' className='w-full h-full object-cover' width={120} height={120} priority />
            </div>
            <p className='text-3xl'>{nickname}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
