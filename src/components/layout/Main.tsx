import { ReactNode } from 'react';

export default function Main({ children }: { children: ReactNode }) {
  return (
    <div className='bg-backgr3 text-white text-xs xs:text-base'>{children}</div>
  );
}
