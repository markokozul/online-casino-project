import { useContext } from 'react';
import { useAPI } from '../../context/APIContext';

export default function GameDetails() {
  const { data, loading } = useAPI();
  console.log(data);

  return <div>{data && data.map((item: any) => <h1>{item.title}</h1>)}</div>;
}
