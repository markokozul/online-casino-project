import Button from '../../components/Button';
import PaymentOptionsShowcase from '../../components/PaymentOptionsShowcase';
import Footer from '../../components/layout/Footer';
import Header from '../../components/layout/Header';
import GameShowcase from './GameShowcase';

export default function Home() {
  return (
    <div>
      <Header />
      <div className='relative w-full h-[100vh] bg-mobile-hero bg-cover bg-center sm:bg-hero-img sm:bg-cover sm:bg-center flex items-center justify-center flex-col'>
        <h1 className='text-white text-[64px]'>xCASINO</h1>
        <Button title='Join Now'></Button>
        <PaymentOptionsShowcase />
      </div>
      <div className='h-[100vh] bg-bg-main'>
        <GameShowcase />
      </div>
      <Footer />
    </div>
  );
}
