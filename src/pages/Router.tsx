import { Route, Routes } from 'react-router-dom';
import Home from './home/Home';
import GameDetails from './game-details/GameDetails';

export default function Router() {
  return (
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/details/:game' element={<GameDetails />}></Route>
    </Routes>
  );
}
