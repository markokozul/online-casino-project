import { Link } from 'react-router-dom';
import { SliderItemProps } from '../../types/types';

export default function SliderItem({ img, title, id, refs }: SliderItemProps) {
  return (
    <Link to={`/details/${id}`}>
      <div
        ref={refs}
        className='w-[200px] h-[200px] p-4 sm:w-[230px] sm:h-[230px] '
      >
        <img
          loading='lazy' //images that are on the screen have higher priority of loading
          src={img}
          className='border-2 border-[#ffdd2d]'
          alt={title}
        ></img>
      </div>
    </Link>
  );
}
