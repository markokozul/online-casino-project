import { Oval } from 'react-loader-spinner';
import logo from '../assets/logowhite.png';

export default function Loader() {
  return (
    <div className='fixed h-full w-full bg-backgr2 bg-center bg-cover flex flex-col items-center justify-center gap-6 px-6'>
      <img src={logo} alt='loading-logo' />

      <Oval
        height={100}
        width={100}
        color='#ff9c19'
        wrapperStyle={{}}
        wrapperClass=''
        visible={true}
        ariaLabel='oval-loading'
        secondaryColor='#ffdd2d'
        strokeWidth={6}
        strokeWidthSecondary={6}
      />
    </div>
  );
}
