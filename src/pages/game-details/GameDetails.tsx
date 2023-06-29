import { useParams } from 'react-router';
import Loader from '../../components/Loader';
import Header from '../../components/layout/Header';
import useFetch from '../../hooks/useFetch';
import Main from '../../components/layout/Main';
import Footer from '../../components/layout/Footer';
import GameShowcase from '../home/GameShowcase';
import Details from './Details';
import Button from '../../components/Button';
export default function GameDetails() {
  //get id of a game from url
  let { id } = useParams();

  const { data, loading, error } = useFetch(
    `http://localhost:8001/games/${id}`
  );

  if (loading) return <Loader />;

  return (
    <div>
      <Header />
      <Main>
        <Details name={data.title} img={data.img} />
        <GameShowcase title='Check out other games' />
      </Main>
      <Footer />
    </div>
  );
}
