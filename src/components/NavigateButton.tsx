import { NavigateButtonProps } from '../types/types';
import { Link } from 'react-router-dom';

export default function NavigateButton({
  title,
  navigate,
}: NavigateButtonProps) {
  return (
    <div className='px-6 py-[8px] bg-gradient-to-t from-[#ff9c19] to-[#ffdd2d]  text-gray-800 font-bold rounded-xl text-lg z-10'>
      <Link to={navigate}>{title}</Link>
    </div>
  );
}