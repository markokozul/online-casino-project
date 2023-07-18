import { ReactNode, createContext, useContext } from 'react';
import useFetch from '../hooks/useFetch';

const APIContext = createContext<any>(null);

export default function APIContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  // Fetch data using custom useFetch hook
  const { data, loading, error } = useFetch(
    'https://my-json-server.typicode.com/markokozul/online-casino-project/games/',
    1000
  );

  return (
    <APIContext.Provider value={{ data, loading, error }}>
      {children}
    </APIContext.Provider>
  );
}

// Create a hook to use the APIContext
export function useAPI() {
  const context = useContext(APIContext);
  if (context === undefined) {
    throw new Error('Context must be used within a Provider');
  }
  return context;
}
