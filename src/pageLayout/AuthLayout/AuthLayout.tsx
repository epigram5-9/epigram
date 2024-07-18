import { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <div className='flex flex-col justify-center items-center bg-background-100 w-full h-screen'>{children}</div>;
}
