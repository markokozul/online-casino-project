import { Suspense, lazy } from 'react';
import Loader from '../../components/Loader';
const GameSlider = lazy(
  () => import('../../components/game-slider/GameSlider')
);

export default function GameShowcase() {
  return (
    <div className='w-full px-10 flex justify-center items-center flex-col'>
      <h1 className='text-white text-3xl self-start'>Popular Games</h1>

      {
        //Used for lazy loading
      }
      <Suspense fallback={<Loader />}>
        <GameSlider />
      </Suspense>
    </div>
  );
}
