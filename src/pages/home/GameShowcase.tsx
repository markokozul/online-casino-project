import { useContext } from 'react';
import GameSlider from '../../components/GameSlider';
import { GamesContext } from '../../context/Context';

export default function GameShowcase() {
  const games = useContext(GamesContext);
  return (
    <div className='w-full px-10 flex justify-center items-center flex-col'>
      <h1 className='text-white text-3xl self-start'>Popular Games</h1>
      <GameSlider games={games} />
    </div>
  );
}
