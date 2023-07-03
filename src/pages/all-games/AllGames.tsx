import React from 'react';
import { useAPI } from '../../context/APIContext';
import Header from '../../components/layout/Header';
import Main from '../../components/layout/Main';
import Section from '../../components/layout/Section';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader';

export default function AllGames() {
  const { data, loading, error } = useAPI();

  if (loading) return <Loader />;
  if (error) console.log(error);

  return (
    <div>
      <Header />
      <Main>
        <Section styling='bg-backgr3 bg-cover bg-center  flex items-center justify-center px-5 py-32 h-auto lg:px-16 lg:py-44'>
          <div className='flex flex-row flex-wrap gap-2'>
            {data &&
              data.map((item: any) => (
                <Link to={`/details/${item.id}`} key={item.id}>
                  <img
                    className=' w-32 h-full xs:w-40 sm:w-48  lg:w-52'
                    src={item.img}
                    alt=''
                    loading='lazy'
                  ></img>
                </Link>
              ))}
          </div>
        </Section>
      </Main>
    </div>
  );
}
