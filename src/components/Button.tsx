import { link, linkSync } from 'fs';
import { ButtonProps } from '../types/types';
import { Link } from 'react-router-dom';

export default function Button({ title, navigate, type, action }: ButtonProps) {
  const linkStyle =
    'text-white font-bold text-lg border-b-[1px] p-2 hover:bg-[#431096]';
  const buttonStyle =
    'px-6 py-2  bg-gradient-to-t from-[#ff9c19] to-[#ffdd2d]  text-gray-800 font-bold rounded-xl text-lg';

  return (
    <>
      {navigate && !action ? ( //buttons mainly used for navigation
        type === 'link' ? (
          <Link to={navigate} className={linkStyle}>
            {title}
          </Link>
        ) : (
          <Link to={navigate} className={buttonStyle}>
            {title}
          </Link>
        )
      ) : type === 'link' ? ( //buttons mainly used for calling functions and submiting
        <button onClick={action} className={linkStyle}>
          {title}
        </button>
      ) : (
        <button onClick={action} className={buttonStyle}>
          {title}
        </button>
      )}
    </>
  );
}
