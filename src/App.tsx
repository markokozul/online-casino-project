import { BrowserRouter } from 'react-router-dom';
import Router from './pages/Router';
import APIContextProvider from './context/APIContext';
function App() {
  return (
    <APIContextProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </APIContextProvider>
  );
}

export default App;
