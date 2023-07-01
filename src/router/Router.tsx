import { Route, Routes } from 'react-router-dom';
import Home from '../pages/home/Home';
import GameDetails from '../pages/game-details/GameDetails';
import AllGames from '../pages/all-games/AllGames';
import PlayGame from '../pages/play-game/PlayGame';
import Register from '../pages/register/Register';
import Login from '../pages/login/Login';
import ProtectedRoute from './ProtectedRoute';
export default function Router() {
  return (
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route
        path='/all-games'
        element={<AllGames />}
        key={document.location.href}
      ></Route>
      <Route path='/details/:id' element={<GameDetails />}></Route>
      <Route
        path='/:id/play'
        element={
          <ProtectedRoute>
            <PlayGame />
          </ProtectedRoute>
        }
      ></Route>

      {
        //auth routes
      }
      <Route path='/register' element={<Register />}></Route>
      <Route path='/login' element={<Login />}></Route>
    </Routes>
  );
}
