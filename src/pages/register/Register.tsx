import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Form from '../../components/Form';
import { auth } from '../../firebase/firebase';
import { RegisterFormData } from '../../types/types';

export default function Register() {
  const navigate = useNavigate();

  const handleSubmit = async (e: any, data: RegisterFormData) => {
    e.preventDefault();

    const { email, password } = data;
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        navigate('/');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };
  return (
    <div>
      <Form
        fields={{ email: 'email', password: 'password' }}
        submit={handleSubmit}
      />{' '}
    </div>
  );
}
