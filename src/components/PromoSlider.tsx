import { useState } from 'react';
import img1 from '../assets/img1.png';
import img2 from '../assets/img2.png';
import img3 from '../assets/img3.png';
import logo from '../assets/logowhite.png';
import Button from './Button';
import { useAuth } from '../context/AuthContext';
import { useEffect, useRef } from 'react';

export default function PromoSlider() {
  const { isAuthenticated } = useAuth();

  const timeoutRef = useRef(0);

  const [activeIndex, setActiveIndex] = useState(0);

  //used for swiping
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  let arr = [img1, img2, img3];
  const handleNext = () => {
    if (activeIndex < arr.length - 1) setActiveIndex((prev) => prev + 1);
    else setActiveIndex(0);
  };
  const handlePrevious = () => {
    if (activeIndex === 0) setActiveIndex(arr.length - 1);
    else setActiveIndex((prev) => prev - 1);
  };

  //used for swiping
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchEnd(0);
    setTouchStart(e.targetTouches[0].clientX);
  };
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  const handleTouchEnd = () => {
    if (touchEnd && touchStart - touchEnd > 60) {
      console.log(touchStart - touchEnd);
      handleNext();
    } else if (touchEnd && touchStart - touchEnd < -60) {
      handlePrevious();
    }
  };

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }
  useEffect(() => {
    resetTimeout();

    timeoutRef.current = window.setTimeout(() => {
      handleNext();
    }, 7000);

    //show next slide every 7 seconds

    return () => resetTimeout();
  });

  return (
    <div className='relative w-full h-96'>
      {arr.map((item: string, i: number) => (
        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          key={i}
          className={`absolute inset-0 w-full xs:px-5 md:px-24 flex flex-col md:flex-row items-center justify-center gap-10 z-30 transition-all ease-in duration-300 ${
            i === activeIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className='flex flex-col items-center justify-center gap-6'>
            <img src={logo} alt='' className='w-64'></img>
            {i % 2 === 0 ? ( //changing text based on even numbers(purely for a showcase of two different text sizes on a slider)
              <p className='flex-[60] text-center px-12 md:px-0 lg:px-12 xl:px-24'>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Tenetur soluta dolorum temporibus voluptas dolorem, magni ipsum
                dicta beatae quasi voluptatum doloribus.
              </p>
            ) : (
              <p className='flex-[60] text-center px-12'>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Tenetur soluta dolorum temporibus voluptas dolorem.
              </p>
            )}
            {isAuthenticated ? (
              ''
            ) : (
              <Button
                title='Join Now'
                styling='button'
                navigate='/register'
              ></Button>
            )}
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
      <div className='absolute bottom-0 left-0 right-0 flex flex-row items-center justify-center gap-4 z-30'>
        {arr.map((item: string, i: number) => (
          <div
            key={i}
            className={` w-3 h-3 rounded-full hover:cursor-pointer  ${
              activeIndex === i ? 'bg-[#ff9c19]' : 'bg-white'
            }`}
            onClick={() => setActiveIndex(i)}
          ></div>
        ))}
      </div>
    </div>
  );
}
