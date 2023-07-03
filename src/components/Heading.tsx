import React from 'react';

export default function Heading({ title }: { title: string }) {
  return <h1 className='text-5xl text-center m-10'>{title}</h1>;
}
