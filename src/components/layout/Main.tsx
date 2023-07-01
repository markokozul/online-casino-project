import React, { ReactNode } from 'react';

export default function Main({ children }: { children: ReactNode }) {
  return (
    <div className='bg-bg-main flex items-center justify-center flex-col gap-24 px-5 lg:px-16'>
      {children}
    </div>
  );
}
