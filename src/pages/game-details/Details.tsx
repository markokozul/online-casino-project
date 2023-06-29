import React from 'react';
import { DetailsProps } from '../../types/types';
import Button from '../../components/Button';

export default function Details({ name, img }: DetailsProps) {
  return (
    <div className='flex flex-row items-center content-center'>
      <>
        <h1>{name}</h1>
        <Button title='Play' />
      </>

      <img src={img} alt=''></img>
    </div>
  );
}
