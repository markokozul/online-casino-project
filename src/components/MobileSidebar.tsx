import { useAuth } from '../context/AuthContext';
import { MobileSidebarProps } from '../types/types';
import Button from './Button';

export default function MobileSidebar({
  sidebarIsOpen,
  handleSidebar,
  logout,
}: MobileSidebarProps) {
  const { isAuthenticated } = useAuth();

  return (
    <div
      className={`fixed z-50 top-0 w-full h-screen bg-header-bg bg-center bg-cover md:hidden flex  items-center justify-start${
        sidebarIsOpen
          ? ' transition-all duration-200 ease-linear right-0'
          : 'transition-all duration-200 ease-linear right-[-100%]'
      }  `}
    >
      <div onClick={() => handleSidebar()} className='flex flex-col m-5 w-full'>
        <Button title='Home' navigate='/' type='link' />
        {isAuthenticated ? (
          <>
            <Button title='All Games' navigate='/all-games' type='link' />
            <Button title='Sign Out' type='link' action={() => logout()} />
          </>
        ) : (
          <>
            <Button title='Login' navigate='/login' type='link' />
            <Button title='Register' navigate='/register' type='link' />
          </>
        )}
      </div>
    </div>
  );
}
