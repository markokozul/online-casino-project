import { Suspense, lazy } from 'react';
import Loader from '../../components/Loader';
import { GameShowcaseProps } from '../../types/types';
const GameSlider = lazy(
  () => import('../../components/game-slider/GameSlider')
);

export default function GameShowcase({ title }: GameShowcaseProps) {
  return (
    <div className='w-full px-10 flex justify-center items-center flex-col'>
      <h1 className='text-white text-3xl self-start'>{title}</h1>

      {
        //Used for lazy loading
      }
      <Suspense fallback={<Loader />}>
        <GameSlider />
      </Suspense>
    </div>
  );
}
