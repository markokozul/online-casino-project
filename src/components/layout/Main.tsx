import React, { ReactNode } from 'react';

export default function Main({ children }: { children: ReactNode }) {
  return (
    <div className='bg-bg-main flex items-center justify-center flex-col px-24 py-24 gap-24'>
      {children}
    </div>
  );
}
