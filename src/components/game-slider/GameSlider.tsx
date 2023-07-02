import debounce from 'lodash.debounce'; //used for preventing unnecessary re-renders
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useAPI } from '../../context/APIContext';
import { GameSliderProps } from '../../types/types';
import SliderItem from './SliderItem';

export default function GameSlider({ theme }: GameSliderProps) {
  const { data } = useAPI(); //get game data from custom hook for Context

  const [move, setMove] = useState(0); // how much has slider moved in pixels
  const [sliderSize, setSliderSize] = useState(0);
  const [sliderContainerSize, setSliderContainerSize] = useState(0);
  const [sliderItemSize, setsliderItemSize] = useState(0); //
  const [animation, setAnimation] = useState(false);

  const [resize, setResize] = useState(0);

  //accessing slider DOM element
  const slider = useRef<HTMLDivElement>(null);

  //accessing DOM elements using callback refs(cant use useRef because DOM isn't loaded on first render)
  const sliderContainer = useCallback(
    (node: HTMLDivElement) => {
      if (node) {
        setSliderContainerSize(node.getBoundingClientRect().width);
      }
    },
    [resize] //update slider container width wresize state changes
  );

  const sliderItemRef = useCallback(
    (node: HTMLDivElement) => {
      if (node) {
        setsliderItemSize(node.getBoundingClientRect().width);
      }
    },
    [resize]
  );

  const handleResize = () => {
    setResize((prevValue) => prevValue + 1); //sliderContainerSize will update after resize updates

    //update slider size(width changed after a breakpoint)
    setSliderSize(
      slider.current ? slider.current.getBoundingClientRect().width : 0
    );
  };

  //prevent unnecessary re-renders when resizing window
  const debounceHandleResize = useMemo(() => debounce(handleResize, 500), []);

  useEffect(() => {
    //get width of a slider when games are loaded
    if (data) {
      setSliderSize(
        slider.current ? slider.current.getBoundingClientRect().width : 0
      );
    }
  }, [data]);

  useEffect(() => {
    window.addEventListener('resize', debounceHandleResize); //update state when resizing window(width of element changes)
    //Cleanup of event listener
    return () => {
      window.removeEventListener('resize', debounceHandleResize);
    };
  }, [debounceHandleResize]);

  //function for scrolling right
  const handleNext = () => {
    setAnimation(true); //set animation on slider only when clicking buttons
    if (sliderSize - (Math.abs(move) + sliderItemSize) <= sliderContainerSize) {
      setMove(
        (prevValue) =>
          prevValue - (sliderSize - Math.abs(move) - sliderContainerSize)
      );
    } else {
      setMove((prevValue) => prevValue - sliderItemSize);
    }
  };

  //function for scrolling left
  const handlePrevious = () => {
    setAnimation(true); //set animation on slider only when clicking buttons

    if (Math.abs(move) < sliderItemSize) {
      setMove((prevValue) => prevValue + Math.abs(move));
    } else {
      setMove((prevValue) => prevValue + sliderItemSize);
    }
  };

  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [end, setEnd] = useState(0);

  function handleTouchStart(e: any) {
    setAnimation(false); //remove animation from slider when swiping
    setTouchStart(e.targetTouches[0].clientX);
    setEnd(0);
  }

  function handleTouchMove(e: any) {
    setTouchEnd(e.targetTouches[0].clientX);
    console.log(touchEnd);
    if (touchStart - touchEnd > 0) {
      console.log(end);
      if (sliderSize - Math.abs(move) > sliderContainerSize && touchEnd) {
        setMove(
          (prev) => prev + (end ? touchEnd - end : touchEnd - touchStart)
        );
        setEnd(touchEnd);
      }

      // do your stuff here for left swipe
    }

    if (touchStart - touchEnd < 0) {
      // do your stuff here for right swipe
      if (move < 0 && touchEnd) {
        setMove(
          (prev) => prev - (end !== 0 ? end - touchEnd : touchStart - touchEnd)
        );
        setEnd(touchEnd);
      }
    }
  }

  function handleTouchEnd() {}

  return (
    <div className='w-full flex items-center justify-center flex-row'>
      <div
        className='relative overflow-x-hidden w-full h-40 small:h-44 sm:h-48 lg:h-56 flex flex-row justify-between items-center'
        ref={sliderContainer}
        //inline conditional styling-easier than tailwind conditional styling
        style={
          sliderSize < sliderContainerSize //if slider size is smaller than container,set slider on center of container
            ? {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }
            : undefined
        }
      >
        <button
          onClick={handlePrevious}
          className='z-30 bg-gradient-to-t from-[#ff9c19] to-[#ffdd2d] px-3 py-4 opacity-80 hover:opacity-100'
        >
          Prev
        </button>

        <div
          onTouchStart={(touchStartEvent) => handleTouchStart(touchStartEvent)}
          onTouchMove={(touchMoveEvent) => handleTouchMove(touchMoveEvent)}
          onTouchEnd={() => handleTouchEnd()}
          className={`flex h-full ${
            animation ? 'transition-all duration-200 ease-in-out' : ''
          }`}
          //inline conditional styling-easier than tailwind conditional styling
          style={
            sliderSize < sliderContainerSize //adjust position of a slider
              ? {
                  position: undefined,
                }
              : {
                  left:
                    sliderSize - Math.abs(move) < sliderContainerSize
                      ? undefined
                      : move,
                  right:
                    sliderSize - Math.abs(move) < sliderContainerSize
                      ? 0
                      : undefined,
                  position: 'absolute',
                }
          }
          ref={slider}
        >
          {theme
            ? data &&
              data
                .filter((item: any) => item.theme === theme) //filter items by theme then map them
                .map((item: any, i: number) => {
                  return (
                    <SliderItem
                      key={item.id}
                      refs={i === 0 ? sliderItemRef : undefined} //prevent unnecessary re-renders by geting only one item's width(every item has same width)
                      img={item.img}
                      id={item.id}
                      title={item.title}
                    ></SliderItem>
                  );
                })
            : data &&
              data.map((item: any, i: number) => (
                <SliderItem
                  key={item.id}
                  refs={i === 0 ? sliderItemRef : undefined} //prevent unnecessary re-renders by geting only one item's width(every item has same width)
                  img={item.img}
                  id={item.id}
                  title={item.title}
                ></SliderItem>
              ))}
        </div>
        <button
          onClick={handleNext}
          className='z-30 bg-gradient-to-t from-[#ff9c19] to-[#ffdd2d] px-3 py-4 opacity-80 hover:opacity-100'
        >
          Prev
        </button>
      </div>
    </div>
  );
}
