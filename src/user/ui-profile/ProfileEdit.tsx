import Image from 'next/image';
import { UserProfileProps } from '@/types/user';
import { Input } from '@/components/ui/input';
import { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { useCreatePresignedUrl, useUpdateMe } from '@/hooks/userQueryHooks';
import * as Yup from 'yup';
import X_ICON from '../../../public/icon/x-icon_md.svg';
import fileNameChange from '../util/fileNameChange';

interface UserProfileEditProps {
  initialValues: {
    image: string;
    nickname: string;
  };
  onModalClose: () => void;
}

const validationSchema = Yup.object().shape({
  nickname: Yup.string().min(1, '닉네임은 1자 이상 30자 이하여야 합니다.').max(30, '닉네임은 1자 이상 30자 이하여야 합니다.').required('닉네임은 필수 항목입니다.'),
});

export default function ProfileEdit({ initialValues, onModalClose }: UserProfileEditProps) {
  const createPresignedUrl = useCreatePresignedUrl();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { mutate: updateMe } = useUpdateMe({
    onSuccess: () => {
      // 모달창닫기
      onModalClose();
    },
  });

  const formik = useFormik<UserProfileProps>({
    initialValues: {
      image: '',
      nickname: '',
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        // 프로필 업데이트
        await updateProfile(values);
        setSubmitting(false);
      } catch (error) {
        // 에러 처리
      } finally {
        setSubmitting(false);
      }
    },
  });

  const updateProfile = async (values: UserProfileProps) => {
    try {
      await updateMe(values);
    } catch (error) {
      // 에러 처리
    }
  };

  // 프로필 사진 변경 클릭
  const handleImageEditClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // 이미지 변경 시
  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>): Promise<void> {
    const { files } = e.currentTarget;
    if (files && files.length > 0) {
      const file = files[0];

      try {
        // 중복된 파일명 및 한글파일이 저장되지 않도록 파일이름 포멧 변경
        const newFileName = fileNameChange();
        const newFile = new File([file], `${newFileName}.${file.name.split('.').pop()}`, { type: file.type });
        // presignedUrl 구하는 함수 (s3 업로드까지 같이)
        const { url } = await createPresignedUrl.mutateAsync({ image: newFile });
        formik.setFieldValue('image', url);
      } catch (error) {
        // 에러 처리
      }
    }
  }

  useEffect(() => {
    formik.setValues(initialValues);
  }, [initialValues]);

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
              <Input type='text' name='nickname' value={formik.values.nickname} className='text-lg p-3' onChange={formik.handleChange} />
            </div>
            <div className='w-[500px] flex flex-col gap-8 justify-center items-center border border-blue-300 rounded-lg bg-background-100'>
              <div className='w-[200px] h-[200px] rounded-full overflow-hidden cursor-pointer'>
                <Image src={formik.values.image || initialValues.image} alt='유저 프로필' className='w-full h-full object-cover' width={200} height={200} priority />
              </div>
              <p className='text-3xl'>{formik.values.nickname}</p>
              <button type='submit' disabled={!formik.isValid || formik.isSubmitting} className='rounded-xl bg-black-600 text-white shadow-sm text-lg p-3 w-[100px]'>
                저장
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
