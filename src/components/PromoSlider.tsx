import { useState } from 'react';
import img1 from '../assets/img1.png';
import img2 from '../assets/img2.png';
import img3 from '../assets/img3.png';
import logo from '../assets/logowhite.png';
import Button from './Button';

export default function PromoSlider() {
  const [activeIndex, setActiveIndex] = useState(0);

  let arr = [img1, img2, img3];

  const handleNext = () => {
    if (activeIndex < arr.length - 1) setActiveIndex((prev) => prev + 1);
    else setActiveIndex(0);
  };
  const handlePrevious = () => {
    if (activeIndex === 0) setActiveIndex(arr.length - 1);
    else setActiveIndex((prev) => prev - 1);
  };

  return (
    <div className='relative w-full h-96'>
      {arr.map((item: string, i: number) => (
        <div
          key={i}
          className={`absolute inset-0 w-full xs:px-5 md:px-24 flex flex-col md:flex-row items-center justify-center gap-10 z-30 transition-all ease-in duration-300 ${
            i === activeIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className='flex flex-col items-center justify-center gap-12'>
            <img src={logo} alt='' className='w-64'></img>
            {i % 2 === 0 ? (
              <p className='flex-[60] text-center  px-12'>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Tenetur soluta dolorum temporibus voluptas dolorem, magni ipsum
                dicta beatae quasi voluptatum doloribus.
              </p>
            ) : (
              <p className='flex-[60] text-center px-12 '>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Tenetur soluta dolorum temporibus voluptas dolorem.
              </p>
            )}
            <Button
              title='Join Now'
              styling='button'
              navigate='/register'
            ></Button>
          </div>
          <img
            src={item}
            alt=''
            className='w-64 hidden lg:w-80 md:block pointer-events-none'
          ></img>
        </div>
      ))}

      <button
        className='absolute bottom-0 top-0 right-0 my-auto mx-0 w-12 h-12 z-40 text-white hidden xs:block'
        onClick={handleNext}
      >
        <i className='fa fa-chevron-right fa-2x' aria-hidden='true'></i>
      </button>

      <button
        className='absolute my-auto mx-0 bottom-0 top-0 hidden  w-12 h-12 z-40 text-white xs:block'
        onClick={handlePrevious}
      >
        <i className='fa fa-chevron-left fa-2x' aria-hidden='true'></i>
      </button>
      <div className='absolute bottom-0 left-0 right-0 flex flex-row items-center justify-center gap-4 '>
        {arr.map((item: string, i: number) => (
          <div
            key={i}
            className={` w-3 h-3 rounded-full  ${
              activeIndex === i ? 'bg-[#ff9c19]' : 'bg-white'
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}
