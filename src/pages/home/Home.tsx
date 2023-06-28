import NavigateButton from '../../components/NavigateButton';
import PaymentOptionsShowcase from '../../components/PaymentOptionsShowcase';
import Footer from '../../components/layout/Footer';
import Header from '../../components/layout/Header';
import GameShowcase from './GameShowcase';
import { GamesContext } from '../../context/Context';
import { useEffect, useState } from 'react';
import { GameData } from '../../types/types';

export default function Home() {
  const [games, setGames] = useState<GameData['games']>([]);

  useEffect(() => {
    fetch('http://localhost:8001/games')
      .then((res) => res.json())
      .then((data) => {
        setGames(data);
      });
  }, []);
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
