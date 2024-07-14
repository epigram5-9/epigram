import Image from 'next/image';
import { UserProfileEditProps } from '@/types/user';
import { Input } from '@/components/ui/input';
import { useRef, useState } from 'react';
import X_ICON from '../../../public/icon/x-icon_md.svg';

export default function ProfileEdit({ profileImage, nickname, onModalClose }: UserProfileEditProps) {
  // 미리보기 이미지
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  // 닉네임
  const [editNickname, setEditNickname] = useState<string>(nickname);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // 프로필 사진 클릭
  const handleImageEditClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // input onChange될 경우, 이미지 인코딩한 뒤 state에 담기
  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const { files } = e.currentTarget;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setPreviewImage(reader.result as string);
      };
    }
  }

  // nickname 변경
  function handleNicknameChange(e) {
    setEditNickname(e.target.value);
  }

  return (
    <div className='w-full h-full fixed top-0 flex flex-col justify-center items-center bg-background-100'>
      <div className='w-[1200px] relative rounded-sm bg-white'>
        <button className='absolute top-4 right-4 w-5 h-5 lg:w-9 lg:h-9' type='button' aria-label='닫기 버튼' onClick={onModalClose}>
          <Image src={X_ICON} alt='뒤로가기 버튼 이미지' />
        </button>
        <div className='w-full h-[700px] py-[60px] px-[100px] flex justify-center gap-[60px] shadow-3xl'>
          <div className='w-[400px] flex flex-col gap-8 justify-center items-start'>
            <button type='button' className='rounded-xl bg-blue-400 text-white shadow-sm text-lg p-3' onClick={handleImageEditClick} onKeyDown={handleImageEditClick}>
              프로필 사진 변경
            </button>
            <Input type='file' accept='image/*' onChange={(e) => handleImageChange(e)} className='hidden' ref={fileInputRef} />
            <Input type='text' value={editNickname} className='text-lg p-3' onChange={(e) => handleNicknameChange(e)} />
          </div>
          <div className='w-[500px] flex flex-col gap-8 justify-center items-center border border-blue-300 rounded-lg bg-background-100'>
            <div className='w-[200px] h-[200px] rounded-full overflow-hidden cursor-pointer'>
              <Image src={previewImage || profileImage} alt='유저 프로필' className='w-full h-full object-cover' width={120} height={120} priority />
            </div>
            <p className='text-3xl'>{editNickname}</p>
            <button type='button' className='rounded-xl bg-black-600 text-white shadow-sm text-lg p-3 w-[100px]'>
              저장
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
