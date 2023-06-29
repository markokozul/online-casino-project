import Loader from '../../components/Loader';
import NavigateButton from '../../components/NavigateButton';
import PaymentOptionsShowcase from '../../components/PaymentOptionsShowcase';
import Footer from '../../components/layout/Footer';
import Header from '../../components/layout/Header';
import { useAPI } from '../../context/APIContext';
import GameShowcase from './GameShowcase';

export default function Home() {
  const { loading, error } = useAPI();

  if (loading) return <Loader />;
  if (error) console.log(error);
  return (
    <div>
      <Header />

      <div className='relative w-full  h-[100vh] bg-new-bg bg-cover bg-center  flex items-center justify-center flex-col'>
        <h1 className='text-white text-6xl z-10'>xCASINO</h1>
        <NavigateButton title='Join Now' navigate='/register'></NavigateButton>

        <PaymentOptionsShowcase />
      </div>
      <div className='bg-bg-main flex items-center justify-center flex-col'>
        <GameShowcase />
        <GameShowcase />
        <GameShowcase />
      </div>
      <Footer />
    </div>
  );
}
