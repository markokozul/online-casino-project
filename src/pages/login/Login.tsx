import { signInWithEmailAndPassword } from 'firebase/auth';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Form from '../../components/Form';
import Header from '../../components/layout/Header';
import Main from '../../components/layout/Main';
import Section from '../../components/layout/Section';
import { auth } from '../../firebase/firebase';
import { LoginFormData } from '../../types/types';
import Heading from '../../components/Heading';

export default function Login() {
  const navigate = useNavigate(); //used for navigating

  const handleSubmit = async (
    e: React.FormEvent<EventTarget>,
    data: LoginFormData
  ) => {
    e.preventDefault();

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
      });
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
        <Section styling='flex flex-col justify-center items-center gap-10 px-5 py-24 h-auto lg:px-16 '>
          <Heading title='Login' />
          <Form
            fields={{
              email: 'email',
              password: 'password',
            }} // input name: input type
            submit={handleSubmit}
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
