import { useParams } from 'react-router';
import Loader from '../../components/Loader';
import Footer from '../../components/layout/Footer';
import Header from '../../components/layout/Header';
import Main from '../../components/layout/Main';
import Section from '../../components/layout/Section';
import useFetch from '../../hooks/useFetch';
import GameShowcase from '../home/GameShowcase';
import Details from './Details';
export default function GameDetails() {
  let { id } = useParams(); //get id of a game from url

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
        <Section styling='h-auto relative bg-backgr2 bg-cover bg-center  flex items-center justify-center flex-col gap-24 lg:gap-48 px-5 py-36 lg:px-16 lg:py-48 xl:py-64'>
          <Details name={data?.title} img={data?.img} id={id} />
          <GameShowcase title='Check out other games' />
        </Section>
      </Main>
      <Footer />
    </div>
  );
}
