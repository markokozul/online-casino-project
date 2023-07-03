import Button from '../../components/Button';
import { DetailsProps } from '../../types/types';

export default function Details({ name, img, id }: DetailsProps) {
  return (
    <div className='w-full flex flex-col-reverse items-center justify-around sm:flex-row'>
      <div className='flex flex-col gap-10 flex-[60] items-center justify-center text-white px-5 '>
        <h1>{name}</h1>
        <p className='text-center'>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequuntur
          soluta debitis sapiente suscipit temporibus? A officiis, explicabo
          libero eveniet magnam assumenda nam totam amet. Aspernatur quod
          temporibus incidunt assumenda eaque.
        </p>
        <Button title='Play' navigate={`/${id}/play`} type='button' />
      </div>
      <div className='flex flex-[40]  items-center justify-center'>
        <img src={img} className='w-72 h-auto' alt=''></img>
      </div>
    </div>
  );
}
