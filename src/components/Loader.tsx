import React from 'react';
import { Oval } from 'react-loader-spinner';

export default function Loader() {
  return (
    <div className='absolute h-full w-full bg-bg-main flex items-center justify-center'>
      <Oval
        height={100}
        width={100}
        color='#ff9c19'
        wrapperStyle={{}}
        wrapperClass=''
        visible={true}
        ariaLabel='oval-loading'
        secondaryColor='#ffdd2d'
        strokeWidth={4}
        strokeWidthSecondary={2}
      />
      <h1>xCASINO</h1>
    </div>
  );
}
