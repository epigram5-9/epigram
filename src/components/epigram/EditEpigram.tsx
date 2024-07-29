// import React, { KeyboardEvent, useCallback, useEffect, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useRouter } from 'next/router';
// import Header from '@/components/Header/Header';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
// import { Textarea } from '@/components/ui/textarea';
// import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
// import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
// import { AddEpigramFormSchema, AddEpigramFormType } from '@/schema/addEpigram';
// import useTagManagement from '@/hooks/useTagManagementHook';
// import { useMeQuery } from '@/hooks/userQueryHooks';

// function EditEpigram() {
//   const router = useRouter();
//   const { id } = router.query;
//   const { data: userData, isPending, isError } = useMeQuery();
//   const [isAlertOpen, setIsAlertOpen] = useState(false);
//   const [alertContent, setAlertContent] = useState({ title: '', description: '' });
//   const [selectedAuthorOption, setSelectedAuthorOption] = useState('directly');
//   const [isFormValid, setIsFormValid] = useState(false);

//   const form = useForm<AddEpigramFormType>({
//     resolver: zodResolver(AddEpigramFormSchema),
//     defaultValues: {
//       content: '',
//       author: '',
//       referenceTitle: '',
//       referenceUrl: '',
//       tags: [],
//     },
//   });

//   // TODO: Implement useEditEpigram hook
//   // const editEpigramMutation = useEditEpigram({
//   //   onSuccess: () => {
//   //     setAlertContent({
//   //       title: '수정 완료',
//   //       description: '수정이 완료되었습니다.',
//   //     });
//   //     setIsAlertOpen(true);
//   //   },
//   //   onError: () => {
//   //     setAlertContent({
//   //       title: '수정 실패',
//   //       description: '다시 시도해주세요.',
//   //     });
//   //     setIsAlertOpen(true);
//   //   },
//   // });

//   // TODO: Fetch existing epigram data and set form values

//   // ... (rest of the component logic, similar to AddEpigram)

//   const handleSubmit = (data: AddEpigramFormType) => {
//     const submitData = { ...data };

//     if (!submitData.referenceUrl) {
//       delete submitData.referenceUrl;
//     }

//     if (!submitData.referenceTitle) {
//       delete submitData.referenceTitle;
//     }

//     // TODO: Call editEpigramMutation instead of addEpigramMutation
//     // editEpigramMutation.mutate({ id, ...submitData });
//     console.log('Edit epigram:', submitData);
//   };

//   return (
//     <>
//       <Header icon='search' routerPage='/search' isLogo insteadOfLogo='' isProfileIcon isShareIcon={false} isButton={false} textInButton='' disabled={false} onClick={() => {}} />
//       <div className='border-t-2 w-full flex flex-col justify-center items-center'>
//         <h1 className='text-2xl font-bold my-4'>에피그램 수정</h1>
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(handleSubmit)} className='flex flex-col justify-center item-center gap-6 lg:gap-8 w-[312px] md:w-[384px] lg:w-[640px] py-6'>
//             {/* Form fields (same as AddEpigram) */}
//             {/* ... */}
//             <Button
//               className='h-11 lg:h-16 rounded-xl text-semibold lg:text-2xl text-white bg-black-500 disabled:bg-blue-400'
//               type='submit'
//               // disabled={editEpigramMutation.isPending || !isFormValid}
//             >
//               {/* {editEpigramMutation.isPending ? '수정 중...' : '수정 완료'} */}
//               수정 완료
//             </Button>
//           </form>
//         </Form>
//       </div>

//       <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
//         <AlertDialogContent className='bg-white'>
//           <AlertDialogHeader>
//             <AlertDialogTitle>{alertContent.title}</AlertDialogTitle>
//             <AlertDialogDescription>{alertContent.description}</AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <AlertDialogAction onClick={() => router.push(`/epigram/${id}`)}>확인</AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
//     </>
//   );
// }

// export default EditEpigram;
