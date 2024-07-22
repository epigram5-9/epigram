import Image from 'next/image';
import { UserProfileProps } from '@/types/user';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Label from '@/components/ui/label';
import { DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { useEffect, useRef } from 'react';
import { Form, Formik, useFormik } from 'formik';
import { useCreatePresignedUrl, useUpdateMe } from '@/hooks/userQueryHooks';
import * as Yup from 'yup';
import fileNameChange from '../utill/fileNameChange';

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

  const { toast } = useToast();

  const handleSubmit = async () => {
    await formik.submitForm(); // Formik의 submitForm 함수 호출
  };

  const { mutate: updateMe } = useUpdateMe({
    onSuccess: () => {
      onModalClose();
      toast({
        description: '프로필 수정이 완료되었습니다.',
      });
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

  const updateProfile = (values: UserProfileProps) => {
    try {
      updateMe(values);
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
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ isSubmitting }) => (
        <Form>
          <DialogHeader>
            <DialogTitle>프로필 수정</DialogTitle>
            <div className='flex flex-col justify-center items-center pt-8'>
              <div className='w-[200px] h-[200px] rounded-full overflow-hidden cursor-pointer border border-gray-300 shadow-sm'>
                <Image src={formik.values.image || initialValues.image} alt='유저 프로필' className='w-full h-full object-cover' width={200} height={200} priority onClick={handleImageEditClick} />
                <Input type='file' accept='image/*' name='image' onChange={(e) => handleImageChange(e)} className='hidden' ref={fileInputRef} />
              </div>
              <div className='mt-10 flex flex-col items-start gap-4'>
                <Label htmlFor='name'>닉네임</Label>
                <Input type='text' name='nickname' value={formik.values.nickname} className='text-lg p-3' onChange={formik.handleChange} />
              </div>
            </div>
            <DialogFooter>
              <Button type='submit' className='bg-slate-600 text-white' disabled={!formik.isValid || isSubmitting}>
                수정하기
              </Button>
            </DialogFooter>
          </DialogHeader>
        </Form>
      )}
    </Formik>
  );
}
