import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Main from '../../components/layout/Main';
import { useParams } from 'react-router';
import useFetch from '../../hooks/useFetch';
import Loader from '../../components/Loader';
export default function PlayGame() {
  const { id } = useParams();

  const { data, loading, error } = useFetch(
    `http://localhost:8001/games/${id}`,
    0 //set timeout to 0
  );

  if (loading) return <Loader />;
  if (error) console.log(error);
  return (
    <div>
      <Header />
      <Main>
        <img src={data && data.img} alt=''></img>
      </Main>
      <Footer />
    </div>
  );
}
