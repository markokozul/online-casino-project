import { signOut } from 'firebase/auth';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logowhite.png';
import { useAuth } from '../../context/AuthContext';
import { auth } from '../../firebase/firebase';
import Button from '../Button';
import MobileSidebar from '../MobileSidebar';

export default function Header() {
  const [visible, setVisible] = useState(true);
  const [backgr, setBackgr] = useState(false);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

  const header = useRef<HTMLDivElement>(null);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful
        navigate('/');
        console.log('Signed out successfully');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSidebar = () => {
    setSidebarIsOpen((prev) => !prev);
  };

  useEffect(() => {
    let previousScrollPosition = 0;
    let currentScrollPosition = 0;

    const handleScroll = () => {
      // Get the new Value
      currentScrollPosition = window.scrollY;

      if (currentScrollPosition === 0) {
        setBackgr(false);
      } else if (currentScrollPosition > 60) {
        setBackgr(true);
      }

      //Subtract the two and conclude
      if (previousScrollPosition - currentScrollPosition < 0) {
        setVisible(false);
      } else if (previousScrollPosition - currentScrollPosition > 0) {
        setVisible(true);
      }
      // Update the previous value
      previousScrollPosition = currentScrollPosition;
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll); //cleanup of event listener
  }, []);
  return (
    <div>
      <div
        ref={header}
        className={` ${backgr ? 'bg-header-bg/80' : 'bg-transparent'} ${
          visible
            ? 'fixed  transition-all duration-300 ease-linear'
            : 'absolute '
        }  flex items-center justify-end w-full min-h-[60px] px-16  z-[51]`}
      >
        <Link to={'/'}>
          <img
            src={logo}
            className=' hidden w-40 absolute left-8 top-2 xxs:block'
            alt='logo'
          />
        </Link>

        <div className='hidden md:flex items-center gap-6'>
          <Button title='All Games' navigate={'/all-games'} styling='button' />
          {isAuthenticated ? (
            <Button title='sign out' action={handleLogout} styling='button' />
          ) : (
            <>
              <Button title='Login' navigate={'/login'} styling='button' />
              <Button
                title='Register'
                navigate={'/register'}
                styling='button'
              />
            </>
          )}
        </div>
        <i
          className='fa fa-bars fa-2x absolute right-0 mr-4 md:hidden text-white hover:cursor-pointer'
          onClick={handleSidebar}
          aria-hidden='true'
        ></i>
      </div>
      <MobileSidebar
        sidebarIsOpen={sidebarIsOpen}
        handleSidebar={handleSidebar}
        logout={handleLogout}
      />
    </div>
  );
}
