import { sizeStyles } from '@/styles/CommentCardStyles';

export default function NoComment() {
  return (
    <div className={`flex justify-center ${sizeStyles.sm} ${sizeStyles.md} ${sizeStyles.lg}`}>
      <p className='text-xl'>댓글을 작성해보세요!</p>
    </div>
  );
}
