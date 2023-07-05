import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import Form from '../../components/Form';
import { auth } from '../../firebase/firebase';
import { RegisterFormData } from '../../types/types';
import Header from '../../components/layout/Header';
import Main from '../../components/layout/Main';
import Section from '../../components/layout/Section';
import Heading from '../../components/Heading';
import { updateProfile } from 'firebase/auth';
import { useState } from 'react';
import MiniLoader from '../../components/MiniLoader';

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleError = (error: string) => {
    if (error === 'auth/email-already-in-use') {
      alert('This email is already in use.Please try again.');
    }
  };

  const handleSubmit = async (e: any, data: RegisterFormData) => {
    e.preventDefault();
    setIsLoading(true);
    const { email, password } = data;
    const { username } = data;
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        navigate('/');
        updateProfile(user, {
          displayName: username,
        });
      })

      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        handleError(errorCode);
      })
      .finally(() => setIsLoading(false));
  };
  return (
    <div>
      <Header />
      <Main>
        <Section styling='flex flex-col justify-center items-center  px-5 py-24 h-auto lg:px-16 '>
          <Heading title='Register' />
          {isLoading ? <MiniLoader /> : ''}

          <Form
            fields={{
              username: 'text',
              email: 'email',
              password: 'password',
            }} // input name: input type
            submit={handleSubmit}
          />
          <p>
            Already have an account?Login{' '}
            <Link to={'/register'} className='underline decoration-1'>
              here
            </Link>
          </p>
        </Section>
      </Main>
    </div>
  );
}
