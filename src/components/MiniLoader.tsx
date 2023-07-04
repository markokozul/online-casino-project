import { Oval } from 'react-loader-spinner';

export default function MiniLoader() {
  return (
    <div className='absolute'>
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
