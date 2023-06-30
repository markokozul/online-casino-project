import NavigateButton from '../../components/NavigateButton';
import { DetailsProps } from '../../types/types';

export default function Details({ name, img, id }: DetailsProps) {
  return (
    <div className='flex flex-row items-center content-center'>
      <>
        <h1>{name}</h1>
        <NavigateButton title='Play' navigate={`/${id}/play`} />
      </>

      <img src={img} alt=''></img>
    </div>
  );
}
