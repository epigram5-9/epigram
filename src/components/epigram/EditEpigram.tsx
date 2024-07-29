import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { AddEpigramFormSchema, AddEpigramFormType, EditEpigramRequestType } from '@/schema/addEpigram';
import useEpigramQuery from '@/hooks/useEpigramQueryHook';
import useEditEpigram from '@/hooks/useEditEpigramHook';
import useTagManagement from '@/hooks/useTagManagementHook';
import { EpigramRequestSchema } from '@/schema/epigram';
import Header from '../Header/Header';

function EditEpigram() {
  const router = useRouter();
  const { id } = router.query;
  const [isAlertOpen, setIsAlertOpen] = React.useState(false);
  const [alertContent, setAlertContent] = React.useState({ title: '', description: '' });

  const parsedId = EpigramRequestSchema.safeParse({ id });

  const { data: epigram, isLoading, error } = useEpigramQuery(parsedId.success ? parsedId.data : undefined, parsedId.success);

  const form = useForm<AddEpigramFormType>({
    resolver: zodResolver(AddEpigramFormSchema),
    defaultValues: {
      content: '',
      author: '',
      referenceTitle: '',
      referenceUrl: '',
      tags: [],
    },
  });

  useEffect(() => {
    if (epigram) {
      form.reset({
        content: epigram.content,
        author: epigram.author,
        referenceTitle: epigram.referenceTitle || '',
        referenceUrl: epigram.referenceUrl || '',
        tags: epigram.tags.map((tag) => tag.name),
      });
    }
  }, [epigram, form]);

  const { currentTag, setCurrentTag, handleAddTag, handleRemoveTag } = useTagManagement({
    setValue: form.setValue,
    getValues: form.getValues,
    setError: form.setError,
  });

  const editEpigramMutation = useEditEpigram({
    onSuccess: () => {
      setAlertContent({
        title: '수정 완료',
        description: '에피그램이 성공적으로 수정되었습니다.',
      });
      setIsAlertOpen(true);
    },
    onError: () => {
      setAlertContent({
        title: '수정 실패',
        description: '에피그램 수정 중 오류가 발생했습니다. 다시 시도해주세요.',
      });
      setIsAlertOpen(true);
    },
  });

  const handleSubmit = (data: AddEpigramFormType) => {
    if (parsedId.success) {
      const editRequest: EditEpigramRequestType = {
        id: Number(parsedId.data.id), // id를 number로 변환
        ...data,
      };
      editEpigramMutation.mutate(editRequest);
    }
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (!parsedId.success) return <div>잘못된 Epigram ID입니다.</div>;
  if (error) return <div>에러 발생!! {(error as Error).message}</div>;
  if (!epigram) return <div>Epigram을 찾을 수 없습니다.</div>;

  return (
    <>
      <Header icon='back' routerPage={`/epigram/${id}`} isLogo insteadOfLogo='에피그램 수정' isProfileIcon isShareIcon={false} isButton={false} textInButton='' disabled={false} onClick={() => {}} />
      <div className='flex flex-col items-center p-4'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4 w-full max-w-md'>
            <FormField
              control={form.control}
              name='content'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>내용</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder='에피그램 내용을 입력하세요.' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='author'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>저자</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='저자를 입력하세요.' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='referenceTitle'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>참조 제목</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='참조 제목을 입력하세요.' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='referenceUrl'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>참조 URL</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='참조 URL을 입력하세요.' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='tags'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>태그</FormLabel>
                  <FormControl>
                    <div>
                      <Input value={currentTag} onChange={(e) => setCurrentTag(e.target.value)} placeholder='태그를 입력하세요.' />
                      <Button type='button' onClick={handleAddTag}>
                        태그 추가
                      </Button>
                    </div>
                  </FormControl>
                  <div className='flex flex-wrap gap-2 mt-2'>
                    {field.value.map((tag) => (
                      <div key={tag} className='bg-gray-200 px-2 py-1 rounded'>
                        {tag}
                        <Button type='button' onClick={() => handleRemoveTag(tag)} className='ml-2 text-red-500'>
                          X
                        </Button>
                      </div>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit' disabled={editEpigramMutation.isPending}>
              {editEpigramMutation.isPending ? '수정 중...' : '수정 완료'}
            </Button>
          </form>
        </Form>

        <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{alertContent.title}</AlertDialogTitle>
              <AlertDialogDescription>{alertContent.description}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={() => router.push(`/epigram/${id}`)}>확인</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
}

export default EditEpigram;
