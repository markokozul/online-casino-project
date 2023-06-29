import { SliderItemProps } from '../../types/types';

export default function SliderItem({ img, title, refs }: SliderItemProps) {
  return (
    <div
      ref={refs}
      className='w-[200px] h-[200px] p-4 sm:w-[230px] sm:h-[230px] '
    >
      <img
        loading='lazy'
        src={img}
        className='border-2 border-[#ffdd2d]'
        alt={title}
      ></img>
    </div>
  );
}
