import React from 'react';
import { useAPI } from '../../context/APIContext';
import Header from '../../components/layout/Header';
import Main from '../../components/layout/Main';
import Section from '../../components/layout/Section';
import { Link } from 'react-router-dom';

export default function AllGames() {
  const { data } = useAPI();

  return (
    <div>
      <Header />
      <Main>
        <Section styling='bg-backgr3 bg-cover bg-center  flex items-center justify-center flex-row flex-wrap gap-2 px-5 py-32 h-auto lg:px-16 lg:py-44'>
          {data &&
            data.map((item: any) => (
              <Link to={`/details/${item.id}`}>
                <img
                  key={item.id}
                  className=' w-40 h-full sm:w-48 small:w-44 lg:w-56'
                  src={item.img}
                  alt=''
                  loading='lazy'
                ></img>
              </Link>
            ))}
        </Section>
      </Main>
    </div>
  );
}
