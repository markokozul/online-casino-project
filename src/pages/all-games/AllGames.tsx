import { Link } from 'react-router-dom';
import Heading from '../../components/Heading';
import Loader from '../../components/Loader';
import Footer from '../../components/layout/Footer';
import Header from '../../components/layout/Header';
import Main from '../../components/layout/Main';
import Section from '../../components/layout/Section';
import { useAPI } from '../../context/APIContext';
import { APIDataItem } from '../../types/types';

export default function AllGames() {
  const { data, loading, error } = useAPI();

  if (loading) return <Loader />;
  if (error) console.log(error);

  return (
    <div>
      <Header />
      <Main>
        <Section styling='bg-backgr3 bg-cover bg-center  flex items-center justify-center flex-col gap-12 px-5 py-24 h-auto lg:px-16 '>
          <Heading title='All Games' />
          <div className='flex items-center justify-center flex-row flex-wrap gap-2'>
            {data &&
              data.map((item: APIDataItem) => (
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
      <Footer />
    </div>
  );
}
