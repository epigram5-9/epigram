import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import useDeleteEpigram from '@/hooks/useDeleteEpigramHook';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { toast } from '../ui/use-toast';
import { Button } from '../ui/button';
import DeleteAlertModal from './DeleteAlertModal';

interface MoreOptionsMenuProps {
  epigram: number;
}

function MoreOptionsMenu({ epigram }: MoreOptionsMenuProps) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { mutate: deleteEpigram } = useDeleteEpigram({
    onSuccess: (data) => {
      toast({
        title: '삭제 완료',
        description: `에피그램 ${data.id}가 성공적으로 삭제되었습니다.`,
      });
      router.push('/');
    },
    onError: () => {
      toast({
        title: '삭제 실패',
        description: '에피그램 삭제 중 오류가 발생했습니다.',
        variant: 'destructive',
      });
    },
  });

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    deleteEpigram(epigram);
    setIsModalOpen(false);
  };

  return (
    <div className='relative'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button type='button'>
            <Image src='/meatballIcon.svg' alt='더 보기 아이콘' width={36} height={36} />
          </Button>
        </DropdownMenuTrigger>
        {/* NOTE: width를 조정할려면 Dropdown컴포넌트에서 min-w 수정 필요 */}
        <DropdownMenuContent className='absolute top-[-36px] left-5 z-10 bg-white'>
          <DropdownMenuItem className='hover:text-illust-blue cursor-pointer text-center'>수정</DropdownMenuItem>
          <DropdownMenuItem className='hover:text-red-500 cursor-pointer text-center' onClick={handleDeleteClick}>
            삭제
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteAlertModal isOpen={isModalOpen} onOpenChange={setIsModalOpen} onConfirm={handleDeleteConfirm} title='에피그램을 삭제하시겠어요?' />
    </div>
  );
}

export default MoreOptionsMenu;
