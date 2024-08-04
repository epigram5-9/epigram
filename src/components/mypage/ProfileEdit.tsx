import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useRef } from 'react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useCreatePresignedUrl } from '@/hooks/userQueryHooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { PatchMeRequestType, PatchMeRequest } from '@/schema/user';
import fileNameChange from '../../user/utill/fileNameChange';

interface UserProfileEditProps {
  initialValues: {
    image: string;
    nickname: string;
  };
  onModalClose: () => void;
}

export default function ProfileEdit({ initialValues, onModalClose }: UserProfileEditProps) {
  const createPresignedUrl = useCreatePresignedUrl();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const form = useForm<PatchMeRequestType>({
    resolver: zodResolver(PatchMeRequest),
    mode: 'onBlur',
    defaultValues: initialValues,
  });

  const { setValue, getValues } = form;

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

      // 중복된 파일명 및 한글파일이 저장되지 않도록 파일이름 포멧 변경
      const newFileName = fileNameChange();
      const newFile = new File([file], `${newFileName}.${file.name.split('.').pop()}`, { type: file.type });

      createPresignedUrl.mutate(
        { image: newFile },
        {
          onSuccess: (data) => {
            setValue('image', data.url);
            onModalClose();
          },
        },
      );
    }
  }

  return (
    <Form {...form}>
      <form>
        <DialogHeader>
          <DialogTitle>프로필 수정</DialogTitle>
          <div className='flex flex-col justify-center items-center pt-8'>
            <div className='w-[200px] h-[200px] rounded-full overflow-hidden cursor-pointer border border-gray-300 shadow-sm'>
              <Image src={getValues('image') || initialValues.image} alt='유저 프로필' className='w-full h-full object-cover' width={200} height={200} priority onClick={handleImageEditClick} />
              <Input type='file' accept='image/*' name='image' onChange={(e) => handleImageChange(e)} className='hidden' ref={fileInputRef} />
            </div>
            <div className='mt-10 flex flex-col items-start gap-4'>
              <FormField
                control={form.control}
                name='nickname'
                render={({ field, fieldState }) => (
                  <FormItem className='flex flex-col w-full lg:max-w-[640px] md:max-w-[384px] space-y-0 md:mb-10 mb-5'>
                    <FormLabel className={`md:mb-5 mb-4 font-pretendard lg:text-xl md:text-base sm:text-sm ${fieldState.invalid ? 'text-state-error' : 'text-blue-900'}`}>닉네임</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type='text'
                        placeholder='닉네임'
                        onBlur={(e) => setValue('nickname', e.target.value.trim())}
                        className={`lg:h-16 h-11 px-4 lg:text-xl md:text-base placeholder-blue-400 rounded-xl bg-blue-200 font-pretendard ${fieldState.invalid ? 'border-2 border-state-error' : 'focus:border-blue-500'}`}
                      />
                    </FormControl>
                    <FormMessage className='flex justify-end text-[13px] text-state-error' />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type='submit' className='bg-slate-600 text-white' disabled={!form.formState.isValid}>
              수정하기
            </Button>
          </DialogFooter>
        </DialogHeader>
      </form>
    </Form>
  );
}
