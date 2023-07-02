import Button from '../Button';
import NavigateButton from '../NavigateButton';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
export default function Header() {
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
  return (
    <div className='absolute top-0 flex items-center justify-end gap-6 w-full min-h-[60px] px-16 bg-transparent z-50'>
      <img
        src={require('../../assets/logowhite.png')}
        className='w-[150px]'
        alt='logo'
      />
      <NavigateButton title='Games' navigate={'/all-games'} />
      <NavigateButton title='home' navigate={'/'} />

      {isAuthenticated ? (
        <Button title='sign out' action={handleLogout}></Button>
      ) : (
        <>
          <NavigateButton title='register' navigate={'/register'} />
          <NavigateButton title='login' navigate={'/login'} />
        </>
      )}
    </div>
  );
}
