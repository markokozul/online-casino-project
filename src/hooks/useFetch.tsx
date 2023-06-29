import axios from 'axios';
import { useEffect, useState } from 'react';

export default function useFetch(url: string, setData: any) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      axios
        .get(url)
        .then((res) => setData(res.data))
        .catch((err) => {
          setError(err);
        })
        .finally(() => setLoading(false));
      //show loader for atleast 1 second
    }, 1000);
  }, [url, setData]);

  return [loading, error];
}
