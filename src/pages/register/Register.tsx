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

export default function Register() {
  const navigate = useNavigate();

  const handleSubmit = async (e: any, data: RegisterFormData) => {
    e.preventDefault();

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
      });
  };
  return (
    <div>
      <Header />
      <Main>
        <Section styling='flex flex-col justify-center items-center gap-10 px-5 py-24 h-auto lg:px-16 '>
          <Heading title='Register' />
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
