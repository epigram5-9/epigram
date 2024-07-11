import Image from 'next/image';
import { UserProfileProps } from '@/types/user';
import { ChangeEvent, useRef } from 'react';
import { useCreatePresignedUrl } from '@/hooks/userQueryHooks';
import { MAX_FILE_SIZE, sampleImage } from '../util/constants';

export default function Profile({ profileImage, nickname }: UserProfileProps) {
  const { mutate: createPresignedUrl } = useCreatePresignedUrl();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // TODO: 여러개의 샘플 이미지 랜덤하게 뜨도록 추가 할 예정
  const image = profileImage || sampleImage[1];

  // 이미지 업로드
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      // [이미지 파일, 최대 용량은 5MB입니다.]
      if (file.size > MAX_FILE_SIZE) {
        // NOTE: CI 테스트용 alert, toast로 변경 예정
        // eslint-disable-next-line no-alert
        alert('파일 크기가 5MB를 초과합니다.');
      }

      try {
        const presignedUrl = await createPresignedUrl({ image: file.name });
        console.log(presignedUrl); // eslint-disable-line no-console
      } catch (error) {
        console.error('file upload error:', error); // eslint-disable-line no-console
      }
    }
  };

  // 프로필 사진 클릭
  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className='w-[130px] h-[240px] flex flex-col justify-center items-center absolute top-[-50px]'>
      <div>
        <div role='button' tabIndex={0} className='w-[120px] h-[120px] rounded-full overflow-hidden cursor-pointer' onClick={handleImageClick} onKeyDown={handleImageClick}>
          <Image src={image} alt='유저 프로필' className='w-full h-full object-cover' width={120} height={120} priority />
        </div>
        <input type='file' accept='image/*' onChange={handleFileChange} className='hidden' ref={fileInputRef} />
      </div>
      <p className='mt-4 mb-6'>{nickname}</p>
      <div className='w-[100px] h-12 pl-4 pr-3.5 py-1.5 bg-zinc-100 rounded-[100px] justify-start items-center gap-1.5 inline-flex'>
        <div className="text-neutral-400 text-xl font-medium font-['Pretendard'] leading-loose">로그아웃</div>
      </div>
    </div>
  );
}
