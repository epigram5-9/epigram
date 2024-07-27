import React from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../ui/alert-dialog';

interface ConfirmationModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  title: string;
}
// NOTE: 댓글 삭제기능에도 쓰일거같아 컴포넌트 분리
function DeleteAlertModal({ isOpen, onOpenChange, onConfirm, title }: ConfirmationModalProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent className='w-[312px] md:w-96 lg:w-[400px] h-40 md:h-[216px] lg:h-56 px-7 py-9 gap-3 bg-white z-50 flex flex-col justify-center items-center rounded-lg'>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter className='flex flex-row gap-2'>
          <AlertDialogCancel className='w-28 px-4 bg-blue-200 rounded-lg'>취소</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} className='w-28 bg-state-error text-white rounded-lg'>
            삭제하기
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteAlertModal;
