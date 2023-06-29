import React, { ReactNode } from 'react';

export default function Main({ children }: { children: ReactNode }) {
  return (
    <div className='bg-bg-main flex items-center justify-center flex-col  gap-24 sm:px-20 sm:py-20'>
      {children}
    </div>
  );
}
