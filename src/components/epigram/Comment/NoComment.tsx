import { sizeStyles } from '@/styles/CommentCardStyles';
import Image from 'next/image';

export default function NoComment() {
  return (
    <div className={`flex flex-col items-center text-center p-10 ${sizeStyles.sm} ${sizeStyles.md} ${sizeStyles.lg}`}>
      <Image className='w-24 h-24 lg:w-36 lg:h-36' src='/noComment.svg' width={96} height={96} alt='댓글없을때 이미지' />
      <p className='text-sm lg:text-xl'>
        아직 댓글이 없어요!
        <br />
        댓글을 달고 다른 사람들과 교류해보세요.
      </p>
    </div>
  );
}
