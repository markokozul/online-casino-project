import { signOut } from 'firebase/auth';
import { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logowhite.png';
import { useAuth } from '../../context/AuthContext';
import { auth } from '../../firebase/firebase';
import Button from '../Button';
import NavigateButton from '../NavigateButton';

export default function Header() {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [backgr, setBackgr] = useState(false);

  const header = useRef<HTMLDivElement>(null);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate('/');
        console.log('Signed out successfully');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleScroll = () => {
    console.log('lol');
    const currentScrollPos = window.scrollY;

    if (currentScrollPos > prevScrollPos) {
      setVisible(false);
    } else {
      setVisible(true);
    }

    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    if (window.scrollY === 0) {
      //if page is at the top,set transparent header background
      setBackgr(false);
    } else {
      setBackgr(true);
    }
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  });
  return (
    <div
      ref={header}
      className={`${backgr ? 'bg-header-bg/80' : 'bg-transparent'} ${
        visible ? 'fixed  transition-all duration-300 ease-linear' : 'absolute '
      }  flex items-center justify-end gap-6 w-full min-h-[60px] px-16  z-50`}
    >
      <Link to={'/'}>
        <img src={logo} className='w-40 absolute left-8 top-2' alt='logo' />
      </Link>
      <NavigateButton title='All Games' navigate={'/all-games'} />

      {isAuthenticated ? (
        <Button title='sign out' action={handleLogout}></Button>
      ) : (
        <>
          <NavigateButton title='login' navigate={'/login'} />
          <NavigateButton title='register' navigate={'/register'} />
        </>
      )}
    </div>
  );
}
