import { useState, useEffect } from 'react';
import GameSlider from '../../components/GameSlider';

import { GameData } from '../../types/types';

export default function GameShowcase() {
  const [data, setData] = useState<GameData['games']>([]);

  useEffect(() => {
    fetch('http://localhost:8001/games')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log(data);
      });
  }, []);

  return (
    <div className=' w-full'>
      <h1>Popular Games</h1>
      <GameSlider games={data} />
    </div>
  );
}
