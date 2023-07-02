import Loader from '../../components/Loader';
import NavigateButton from '../../components/NavigateButton';
import PaymentOptionsShowcase from '../../components/PaymentOptionsShowcase';
import Footer from '../../components/layout/Footer';
import Header from '../../components/layout/Header';
import Main from '../../components/layout/Main';
import Section from '../../components/layout/Section';
import { useAPI } from '../../context/APIContext';
import GameShowcase from './GameShowcase';

export default function Home() {
  const { loading, error } = useAPI();

  if (loading) return <Loader />;
  if (error) console.log(error);
  return (
    <div>
      <Header />

      <Main>
        <Section styling='relative bg-backgr1 bg-cover bg-center  flex items-center justify-center flex-col gap-24 px-5 py-36  h-auto lg:px-16 lg:py-48'>
          <img
            src={require('../../assets/logowhite.png')}
            className='w-[300px]'
            alt='logo'
          />{' '}
          <NavigateButton
            title='Join Now'
            navigate='/register'
          ></NavigateButton>
          <PaymentOptionsShowcase position='absolute' />
        </Section>

        <Section styling='bg-backgr3 bg-cover bg-center  flex items-center justify-center flex-col gap-24 px-5 py-5 h-auto lg:px-16 lg:py-10'>
          <GameShowcase title='Popular Games' />
          <GameShowcase title='Water Themed Games' theme='water' />
          <GameShowcase title='Egypt Themed Games' theme='egypt' />
        </Section>
      </Main>

      <Footer />
    </div>
  );
}
