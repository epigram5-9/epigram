import React from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog_dim';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface UserProfileModalProps {
  username: string;
  profileImage: string;
  children: React.ReactNode;
}

function UserProfileModal({ username, profileImage, children }: UserProfileModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='sm:max-w-[425px] bg-white'>
        <div className='flex items-center space-x-4 p-6'>
          <Avatar className='h-12 w-12'>
            <AvatarImage src={profileImage} alt={username} />
            <AvatarFallback>{username[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h4 className='text-lg font-medium'>{username}</h4>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default UserProfileModal;
