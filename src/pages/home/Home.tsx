import Loader from '../../components/Loader';
import PaymentOptionsShowcase from '../../components/PaymentOptionsShowcase';
import PromoSlider from '../../components/PromoSlider';
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
        <Section styling='relative bg-backgr1 bg-cover bg-center  flex items-center justify-center flex-col gap-24 px-5 py-24  h-auto lg:px-16 lg:py-40'>
          <PromoSlider />
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
