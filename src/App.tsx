import { BrowserRouter } from 'react-router-dom';
import Router from './router/Router';
import APIContextProvider from './context/APIContext';
import AuthContextProvider from './context/AuthContext';
function App() {
  return (
    <AuthContextProvider>
      <APIContextProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </APIContextProvider>
    </AuthContextProvider>
  );
}

export default App;
