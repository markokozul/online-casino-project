import { useParams } from 'react-router';
import Loader from '../../components/Loader';
import Footer from '../../components/layout/Footer';
import Header from '../../components/layout/Header';
import Main from '../../components/layout/Main';
import useFetch from '../../hooks/useFetch';
import GameShowcase from '../home/GameShowcase';
import Details from './Details';
export default function GameDetails() {
  let { id } = useParams(); //get id of a game from url
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
        <Details name={data.title} img={data.img} id={id} />
        <GameShowcase title='Check out other games' />
      </Main>
      <Footer />
    </div>
  );
}
