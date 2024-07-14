import Image from 'next/image';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';

function MoreOptionsMenu() {
  return (
    <div className='relative'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button type='button'>
            <Image src='/meatballIcon.svg' alt='더 보기 아이콘' width={36} height={36} />
          </button>
        </DropdownMenuTrigger>
        {/* NOTE: width를 조정할려면 Dropdown컴포넌트에서 min-w 수정 필요 */}
        <DropdownMenuContent className='absolute top-[-36px] left-5 z-10 bg-white'>
          <DropdownMenuItem className='hover:text-illust-blue cursor-pointer text-center'>수정</DropdownMenuItem>
          <DropdownMenuItem className='hover:text-illust-blue cursor-pointer text-center'>삭제</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default MoreOptionsMenu;
