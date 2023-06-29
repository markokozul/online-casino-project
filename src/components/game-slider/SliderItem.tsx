import { Link } from 'react-router-dom';
import { SliderItemProps } from '../../types/types';

export default function SliderItem({ img, title, refs }: SliderItemProps) {
  //function used for transforming a title to all-lowercase-no-spaces for usage in routing url
  const transformTitle = () => {
    let newTitle = title.toLocaleLowerCase();
    newTitle = newTitle.replace(/\s+/g, '');
    return newTitle;
  };

  return (
    <Link to={`/details/${transformTitle()}`}>
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
