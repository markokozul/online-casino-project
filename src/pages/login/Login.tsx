import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Form from '../../components/Form';
import { auth } from '../../firebase/firebase';

export default function Login() {
  const navigate = useNavigate(); //used for navigating

  const handleSubmit = async (e: React.FormEvent<EventTarget>, data: any) => {
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
  return (
    <div>
      <Form
        fields={{ email: 'email', password: 'password', name: 'text' }}
        submit={handleSubmit}
      />
    </div>
  );
}
