import { Link } from 'react-router-dom';

import { SliderItemProps } from '../../types/types';

export default function SliderItem({ img, title, id, refs }: SliderItemProps) {
  return (
    <div ref={refs} className='p-2 w-40 h-full xs:w-44 sm:w-48  lg:w-52'>
      <Link to={`/details/${id}`}>
        <img
          loading='lazy' //images that are on the screen have higher priority of loading
          src={img}
          alt={title}
        ></img>
      </Link>
    </div>
  );
}
