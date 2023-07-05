import PaymentOptionsShowcase from '../PaymentOptionsShowcase';
import logo from '../../assets/logowhite.png';
import Button from '../Button';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { signOut } from '@firebase/auth';
import { auth } from '../../firebase/firebase';

export default function Footer() {
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

  const { isAuthenticated } = useAuth();
  return (
    <div className='bg-backgr3 bg-cover relative text-white flex flex-col text-sm xs:text-base xxl:text-lg'>
      <PaymentOptionsShowcase />
      <div className='flex flex-col items-center justify-center gap-6 xs:flex-row px-5 py-12 lg:px-16'>
        <div className='flex flex-col flex-[70] items-start  gap-6'>
          <Link to={'/'}>
            <img src={logo} className='w-[150px]' alt='logo' />
          </Link>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique,
            quo ipsam. Dolorum accusamus illo animi laudantium doloremque
            similique voluptas. Laboriosam nostrum eius laborum ut facilis,
            neque ipsam sint eveniet fugiat.
          </p>
        </div>
        <div className='flex flex-col xs-flex-row flex-[30] items-center justify-center gap-6'>
          <Button title='All Games' navigate={'/all-games'} styling='link' />

          {isAuthenticated ? (
            <Button title='Sign Out' action={handleLogout} styling='link' />
          ) : (
            <>
              <Button title='Login' navigate='/login' styling='link'></Button>
              <Button
                title='Register'
                navigate='/Register'
                styling='link'
              ></Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
