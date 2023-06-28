import { ButtonProps } from '../types/types';
import { Link } from 'react-router-dom';

export default function Button({ title, action }: ButtonProps) {
  return (
    <div className='px-6 py-[8px] bg-gradient-to-t from-[#ff9c19] to-[#ffdd2d]  text-gray-800 font-bold rounded-xl text-lg z-10'>
      <Link to={action}>{title}</Link>
    </div>
  );
}
