import Image from 'next/image';
import { UserProfileEditProps, UserFormikValues } from '@/types/user';
import { Input } from '@/components/ui/input';
import { useRef } from 'react';
import { useFormik } from 'formik';
import { useCreatePresignedUrl } from '@/hooks/userQueryHooks';
import X_ICON from '../../../public/icon/x-icon_md.svg';
import imageUploadS3 from '../util/imageUploadS3';

export default function ProfileEdit({ initialValues, onModalClose }: UserProfileEditProps) {
  const createPresignedUrl = useCreatePresignedUrl();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const formik = useFormik<UserFormikValues>({
    initialValues: {
      profileImage: initialValues.profileImage,
      nickname: initialValues.nickname,
      file: null,
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        if (values.file) {
          // 1. presigned URL 생성
          const { url } = await createPresignedUrl.mutateAsync({ image: values.file });
          // 2. s3 이미지 업로드
          await imageUploadS3(url, values.file); // S3로 이미지 업로드
        }
        // 2. s3 업로드

        // 3. 프로필 수정
      } catch (error) {
        // 에러 처리
      } finally {
        setSubmitting(false);
      }
    },
  });

  // 프로필 사진 변경 클릭
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
        formik.setValues({
          profileImage: reader.result as string,
          nickname: formik.values.nickname,
          file,
        });
      };
    }
  }

  return (
    <div className='w-full h-full fixed top-0 flex flex-col justify-center items-center bg-background-100'>
      <form onSubmit={formik.handleSubmit}>
        <div className='w-[1200px] relative rounded-sm bg-white'>
          <button className='absolute top-4 right-4 w-5 h-5 lg:w-9 lg:h-9' type='button' aria-label='닫기 버튼' onClick={onModalClose}>
            <Image src={X_ICON} alt='뒤로가기 버튼 이미지' />
          </button>
          <div className='w-full h-[700px] py-[60px] px-[100px] flex justify-center gap-[60px] shadow-3xl'>
            <div className='w-[400px] flex flex-col gap-8 justify-center items-start'>
              <button type='button' className='rounded-xl bg-blue-400 text-white shadow-sm text-lg p-3' onClick={handleImageEditClick} onKeyDown={handleImageEditClick}>
                프로필 사진 변경
              </button>
              <Input type='file' accept='image/*' name='image' onChange={(e) => handleImageChange(e)} className='hidden' ref={fileInputRef} />
              <Input type='text' value={formik.values.nickname} className='text-lg p-3' onChange={formik.handleChange} />
            </div>
            <div className='w-[500px] flex flex-col gap-8 justify-center items-center border border-blue-300 rounded-lg bg-background-100'>
              <div className='w-[200px] h-[200px] rounded-full overflow-hidden cursor-pointer'>
                <Image src={formik.values.profileImage} alt='유저 프로필' className='w-full h-full object-cover' width={120} height={120} priority />
              </div>
              <p className='text-3xl'>{formik.values.nickname}</p>
              <button type='submit' disabled={formik.isSubmitting} className='rounded-xl bg-black-600 text-white shadow-sm text-lg p-3 w-[100px]'>
                저장
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
