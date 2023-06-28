import NavigateButton from '../NavigateButton';
export default function Header() {
  return (
    <div className='absolute top-0 flex items-center justify-end gap-6 w-full min-h-[60px] px-16 bg-transparent z-50'>
      <NavigateButton title='register' navigate={'/register'} />
      <NavigateButton title='login' navigate={''} />
    </div>
  );
}
