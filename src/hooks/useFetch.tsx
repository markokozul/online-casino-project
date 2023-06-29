import axios from 'axios';
import { useEffect, useState } from 'react';

export default function useFetch(url: string, timeout: number) {
  const [data, setData] = useState<any>();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      axios
        .get(url)
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          setError(err);
        })
        .finally(() => setLoading(false));
      //show loader for specified amount of time
    }, timeout);
  }, [url, setData, timeout]);

  return { data, loading, error };
}
