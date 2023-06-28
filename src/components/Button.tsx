import { ButtonProps } from '../types/types';

export default function Button({ title, action }: ButtonProps) {
  return (
    <button
      onClick={action}
      className='px-4 py-6 bg-gradient-to-t from-[#ff9c19] to-[#ffdd2d]  text-gray-800 font-bold rounded-xl text-lg z-10'
    >
      {title}
    </button>
  );
}
