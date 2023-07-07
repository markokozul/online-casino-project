import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Main from '../../components/layout/Main';
import { useParams } from 'react-router';
import useFetch from '../../hooks/useFetch';
import Loader from '../../components/Loader';
import Section from '../../components/layout/Section';
export default function PlayGame() {
  const { id } = useParams();

  const { data, loading, error } = useFetch(
    `https://my-json-server.typicode.com/markokozul/online-casino-project/games/${id}`,
    0 //set timeout to 0
  );

  if (loading) return <Loader />;
  if (error) console.log(error);
  return (
    <div>
      <Header />
      <Main>
        <Section styling='h-screen bg-backgr3 bg-center bg-cover flex items-center justify-center py-24'>
          <img src={data && data.img} alt=''></img>
        </Section>
      </Main>
      <Footer />
    </div>
  );
}
