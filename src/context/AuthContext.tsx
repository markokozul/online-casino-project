import { onAuthStateChanged } from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase/firebase';

const AuthContext = createContext<any>(null);

export default function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<any>();
  const [error, setError] = useState<any>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser, setError);

    //unsubscribe when component umounts
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, error }}>
      {children}
    </AuthContext.Provider>
  );
}
//custom hook for auth
export function useAuth() {
  const auth = useContext(AuthContext);
  console.log(auth.user);
  if (auth === undefined) {
    throw new Error('Context must be used within a Provider');
  }
  return { auth, isAuthenticated: auth.user != null };
}
