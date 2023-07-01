import { useState } from 'react';

export default function Form({ fields, submit }: any) {
  const [data, setData] = useState({});

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prevValues) => {
      return { ...prevValues, [e.target.name]: e.target.value }; //set data dynamically
    });
  };
  const handleSubmit = (e: React.FormEvent<EventTarget>) => {
    submit(e, data);
  };
  return (
    <form onSubmit={handleSubmit}>
      {Object.keys(fields).map((item: string, i) => (
        <label htmlFor={item} key={i}>
          {item}
          <input
            name={item}
            type={fields[item]}
            required
            onInput={handleInput}
          />
        </label>
      ))}
      <input type='submit'></input>
    </form>
  );
}
