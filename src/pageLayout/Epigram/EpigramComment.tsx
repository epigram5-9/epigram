import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';

function CommentSection() {
  return (
    <div className='bg-background-100 flex justify-center h-[500px]'>
      <div className='w-[640px] h-full pt-12 pb-36'>
        <div className='flex flex-col gap-6'>
          <h3 className='px-2 text-xl'>댓글(3)</h3>
          <div className='flex gap-6'>
            <div className='w-12 h-12'>
              <Image src='/profile.svg' alt='프로필 사진' width={48} height={48} />
            </div>
            <Textarea
              className='bg-background-100 w-full text-black p-4 text-xl border-solid border-line-200 border-2 rounded-lg resize-none focus-visible:ring-0'
              placeholder='100자 이내로 입력해 주세요.'
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentSection;
