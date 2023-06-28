import { Route, Routes } from 'react-router-dom';
import Home from './home/Home';

export default function Router() {
  return (
    <Routes>
      <Route path='/' element={<Home />}></Route>
    </Routes>
  );
}
