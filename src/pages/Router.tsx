import { Route, Routes } from 'react-router-dom';
import Home from './home/Home';
import GameDetails from './game-details/GameDetails';
import AllGames from './all-games/AllGames';
import PlayGame from './play-game/PlayGame';

export default function Router() {
  return (
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/all-games' element={<AllGames />}></Route>
      <Route path='/details/:id' element={<GameDetails />}></Route>
      <Route path='/:id/play' element={<PlayGame />}></Route>
    </Routes>
  );
}
