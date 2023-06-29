import NavigateButton from '../../components/NavigateButton';
import PaymentOptionsShowcase from '../../components/PaymentOptionsShowcase';
import Footer from '../../components/layout/Footer';
import Header from '../../components/layout/Header';
import GameShowcase from './GameShowcase';
import { GamesContext } from '../../context/Context';
import { useEffect, useState } from 'react';
import { GameData } from '../../types/types';
import Loader from '../../components/Loader';
import useFetch from '../../hooks/useFetch';

export default function Home() {
  const [games, setGames] = useState<GameData['games']>([]);

  const [loading, error] = useFetch('http://localhost:8001/games', setGames);

  if (error) console.log(error);

  if (loading) return <Loader />;

  return (
    <div>
      <GamesContext.Provider value={games}>
        <Header />

        <div className='relative w-full  h-[100vh] bg-new-bg bg-cover bg-center  flex items-center justify-center flex-col'>
          <h1 className='text-white text-6xl z-10'>xCASINO</h1>
          <NavigateButton
            title='Join Now'
            navigate='/register'
          ></NavigateButton>

          <PaymentOptionsShowcase />
        </div>
        <div className='bg-bg-main flex items-center justify-center flex-col'>
          <GameShowcase />
          <GameShowcase />
          <GameShowcase />
        </div>
        <Footer />
      </GamesContext.Provider>
    </div>
  );
}
