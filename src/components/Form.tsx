import { useState } from 'react';
import { FormProps, LoginFormData } from '../types/types';
import Button from './Button';

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
    <form className='w-[90%]  flex flex-col justify-center items-center  gap-8 px-10 py-16 bg-white/30 shadow-md rounded sm:w-96 lg:w-[500px]'>
      {Object.keys(fields).map((item: string, i) => (
        <label htmlFor={item} key={i} className='w-full '>
          <span>{item}</span>
          <input
            className='w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            name={item}
            type={fields[item]}
            required
            onInput={handleInput}
          />
        </label>
      ))}
      <Button title='Submit' action={handleSubmit} />
    </form>
  );
}
