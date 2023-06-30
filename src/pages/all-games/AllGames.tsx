import React from 'react';
import { useAPI } from '../../context/APIContext';
import Header from '../../components/layout/Header';
import Main from '../../components/layout/Main';

export default function AllGames() {
  const { data } = useAPI();

  return (
    <div>
      <Header />
      <Main>
        <div className='flex flex-row flex-wrap items-center justify-center'>
          {data &&
            data.map((item: any) => (
              <img
                key={item.id}
                className='w-[200px] h-auto'
                src={item.img}
                alt=''
                loading='lazy'
              ></img>
            ))}
        </div>
      </Main>
    </div>
  );
}
