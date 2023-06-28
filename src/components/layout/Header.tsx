import Button from '../Button';

export default function Header() {
  return (
    <div className='absolute top-0 flex items-center justify-end gap-6 w-full min-h-[60px] px-16 bg-transparent z-50'>
      <Button title='register' action={'/register'} />
      <Button title='login' action={''} />
    </div>
  );
}
