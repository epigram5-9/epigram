import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useEpigramQuery from '@/hooks/useEpigramQueryHook';
import { useMeQuery } from '@/hooks/userQueryHooks';
import { EpigramRequestSchema } from '@/schema/epigram';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import EditEpigram from '@/components/epigram/EditEpigram';

function EditPage() {
  const router = useRouter();
  const { id } = router.query;
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertContent, setAlertContent] = useState({ title: '', description: '' });

  const parsedId = EpigramRequestSchema.safeParse({ id });

  const { data: epigram, isLoading: isEpigramLoading, error: epigramError } = useEpigramQuery(parsedId.success ? parsedId.data : undefined, parsedId.success);
  const { data: currentUser, isLoading: isUserLoading } = useMeQuery();

  useEffect(() => {
    if (!isEpigramLoading && !isUserLoading && epigram && currentUser) {
      if (epigram.writerId !== currentUser.id) {
        setAlertContent({
          title: '접근 제한',
          description: '작성자만 수정할 수 있습니다.',
        });
        setIsAlertOpen(true);
      }
    }
  }, [epigram, currentUser, isEpigramLoading, isUserLoading]);

  const handleAlertClose = () => {
    setIsAlertOpen(false);
    router.push('/');
  };

  if (isEpigramLoading || isUserLoading) return <div>로딩 중...</div>;
  if (!parsedId.success) return <div>잘못된 Epigram ID입니다.</div>;
  if (epigramError) return <div>에러 발생!! {(epigramError as Error).message}</div>;
  if (!epigram) return <div>Epigram을 찾을 수 없습니다.</div>;

  if (epigram.writerId !== currentUser?.id) {
    return (
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent className='bg-white'>
          <AlertDialogHeader>
            <AlertDialogTitle>{alertContent.title}</AlertDialogTitle>
            <AlertDialogDescription>{alertContent.description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleAlertClose}>확인</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return <EditEpigram epigram={epigram} />;
}

export default EditPage;
