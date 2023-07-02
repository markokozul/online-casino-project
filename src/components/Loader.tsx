import React from 'react';
import { Oval } from 'react-loader-spinner';

export default function Loader() {
  return (
    <div className='absolute h-full w-full bg-backgr2 bg-center bg-cover flex flex-col items-center justify-center'>
      <img src={require('../assets/logowhite.png')} alt='loading-logo' />

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
