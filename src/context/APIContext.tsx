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
    'https://api.jsonstorage.net/v1/json/dfc0526f-6e02-4fd9-b65f-b51ecfc20067/394422d9-3764-433e-86b5-3c2824fc4ef6',
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
