import GameSlider from '../../components/game-slider/GameSlider';
import { GameShowcaseProps } from '../../types/types';

export default function GameShowcase({ title, theme }: GameShowcaseProps) {
  return (
    <div className='w-full flex justify-center items-center flex-col'>
      <h1 className='text-white text-3xl self-start'>{title}</h1>
      <GameSlider theme={theme} />
    </div>
  );
}
