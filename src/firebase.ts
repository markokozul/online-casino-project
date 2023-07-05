// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD7ILHnzhS7qteOwUP9lkGGbHr3HnJN11Q',
  authDomain: 'online-casino-8b213.firebaseapp.com',
  projectId: 'online-casino-8b213',
  storageBucket: 'online-casino-8b213.appspot.com',
  messagingSenderId: '179483480264',
  appId: '1:179483480264:web:ce0145e46b9295dd4915fd',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;
