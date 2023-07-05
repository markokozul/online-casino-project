import { useState } from 'react';
import Button from './Button';
import { FormProps } from 'react-router-dom';
import { FormComponentProps, FormFields } from '../types/types';

export default function Form({
  fields,
  submit,
  displayError,
}: FormComponentProps) {
  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prevValues) => {
      return { ...prevValues, [e.target.name]: e.target.value }; //set data dynamically
    });
  };
  const handleSubmit = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    submit(e, data); //call handleSubmit from parent
  };
  return (
    <form
      onSubmit={handleSubmit}
      className='w-[90%] xs:w-96 lg:w-[500px] xl:w-[650px]  flex flex-col justify-center items-center  gap-8 px-4 xxs:px-8 py-16 xl:py-20  bg-white/40 shadow-md rounded  '
    >
      {displayError ? (
        <p className='text-red-900 text-center'>{displayError}</p>
      ) : (
        ''
      )}

      {Object.keys(fields).map((item: string, i) => (
        <label htmlFor={item} key={i} className='w-full max-w-[400px]'>
          <span>{item}</span>
          <input
            className={`w-full max-w-[400px] shadow appearance-none border rounded py-2 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            name={item}
            type={fields[item as keyof FormFields]}
            onInput={handleInput}
            minLength={fields[item as keyof FormFields] === 'password' ? 6 : 1}
            maxLength={
              fields[item as keyof FormFields] === 'password' ? 20 : 40
            }
            required
          />
        </label>
      ))}

      <Button title='Submit' styling='button' type='submit' />
    </form>
  );
}
