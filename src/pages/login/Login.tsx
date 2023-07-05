import { signInWithEmailAndPassword } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Form from '../../components/Form';
import Heading from '../../components/Heading';
import MiniLoader from '../../components/MiniLoader';
import Header from '../../components/layout/Header';
import Main from '../../components/layout/Main';
import Section from '../../components/layout/Section';
import { auth } from '../../firebase/firebase';
import { FormFields, LoginFormData } from '../../types/types';

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [displayError, setDisplayError] = useState('');

  const navigate = useNavigate(); //used for navigating

  const handleError = (error: string) => {
    if (error === 'auth/wrong-password')
      setDisplayError('Your password is wrong.Please try again.');
    else if (error === 'auth/user-not-found')
      setDisplayError('User not found.Please try again.');
  };

  const handleSubmit = async (
    e: React.FormEvent<EventTarget>,
    data: LoginFormData
  ) => {
    e.preventDefault();
    setIsLoading(true);

    const { email, password } = data;
    await signInWithEmailAndPassword(auth, email, password) //firebase function for logging in
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        navigate('/'); //if login is successful,navigate to homepage
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        handleError(errorCode);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    const navigateToHomepage = () => {
      navigate('/');
    };
    window.addEventListener('popstate', navigateToHomepage); //when button for going back is pressed on browser,redirect to homepage

    return () => {
      window.removeEventListener('popstate', navigateToHomepage); //Cleanup of event listener
    };
  }, []);

  return (
    <div>
      <Header />
      <Main>
        <Section styling='flex flex-col justify-center items-center px-1 xxs:px-5 py-16 sm:py-24 h-screen lg:px-16'>
          <Heading title='Login' />
          {isLoading ? <MiniLoader /> : ''}
          <Form
            fields={{
              // input name: input type
              email: 'email',
              password: 'password',
            }}
            submit={handleSubmit}
            displayError={displayError}
          />
          <p>
            Don't have an account?Register{' '}
            <Link to={'/register'} className='underline decoration-1'>
              here
            </Link>
          </p>
        </Section>
      </Main>
    </div>
  );
}
