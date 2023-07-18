import debounce from 'lodash.debounce'; //used for preventing unnecessary re-renders
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useAPI } from '../../context/APIContext';
import { APIDataItem, GameSliderProps } from '../../types/types';
import SliderItem from './SliderItem';
import { handleTouchStart, handleTouchMove } from './Swiping';

export default function GameSlider({ theme }: GameSliderProps) {
  const { data } = useAPI(); //get game data from custom hook for API Context

  const [move, setMove] = useState(0); // how much has slider moved in pixels
  const [sliderSize, setSliderSize] = useState(0);
  const [sliderContainerSize, setSliderContainerSize] = useState(0);
  const [sliderItemSize, setsliderItemSize] = useState(0);
  const [resize, setResize] = useState(0);

  //used for swiping
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [prevTouchEnd, setPrevTouchEnd] = useState(0);
  const [animation, setAnimation] = useState(false);

  //accessing slider DOM element
  const slider = useRef<HTMLDivElement>(null);

  //accessing DOM elements using callback refs(cant use useRef because DOM isn't loaded on first render)
  const sliderContainerRef = useCallback(
    (node: HTMLDivElement) => {
      if (node) {
        setSliderContainerSize(node.getBoundingClientRect().width);
      }
    },
    [resize] //update slider container width when resize state changes
  );

  const sliderItemRef = useCallback(
    (node: HTMLDivElement) => {
      if (node) {
        setsliderItemSize(node.getBoundingClientRect().width);
      }
    },
    [resize] //update slider item width when resize state changes
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
    setAnimation(true); //set animation on slider only when clicking buttons(not when sliding)
    if (sliderSize - (Math.abs(move) + sliderItemSize) <= sliderContainerSize) {
      setMove(
        (prevValue) =>
          prevValue - (sliderSize - Math.abs(move) - sliderContainerSize)
      );
    } else if (
      sliderSize - (Math.abs(move) + sliderItemSize) >
      sliderContainerSize
    ) {
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

  return (
    <div className='w-full flex items-center justify-center flex-row'>
      <div
        className='group relative overflow-hidden w-full h-40 xs:h-44 sm:h-48 lg:h-52 flex flex-row justify-between items-center'
        ref={sliderContainerRef}
        //inline conditional styling-easier than tailwind conditional styling
        style={
          sliderSize < sliderContainerSize //if slider size is smaller than container,set slider on center of container
            ? {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }
            : undefined
        }
      >
        <button
          disabled={move >= 0 ? true : false}
          onClick={handlePrevious}
          className='z-30 bg-gradient-to-t from-[#ff9c19] to-[#ffdd2d] text-white rounded px-4 py-4 group-hover:opacity-90 opacity-0 '
        >
          <i className='fa fa-chevron-left' aria-hidden='true'></i>
        </button>

        <div
          role='contentinfo' //used for testing
          onTouchStart={(e) =>
            handleTouchStart(
              e,
              setTouchStart,
              setTouchEnd,
              setPrevTouchEnd,
              setAnimation
            )
          }
          onTouchMove={(e) =>
            handleTouchMove(
              e,
              touchStart,
              touchEnd,
              sliderSize,
              move,
              setMove,
              sliderContainerSize,
              prevTouchEnd,
              setPrevTouchEnd,
              setTouchEnd
            )
          }
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
          {theme //if theme is provided,filter items with given theme
            ? data &&
              data
                .filter((item: APIDataItem) => item.theme === theme) //filter items by theme then map them
                .map((item: APIDataItem, i: number) => {
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
            : data && // else just display all items
              data.map((item: APIDataItem, i: number) => (
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
          disabled={
            sliderSize - Math.abs(move) <= sliderContainerSize ? true : false
          }
          onClick={handleNext}
          className='z-30 bg-gradient-to-t from-[#ff9c19] to-[#ffdd2d] text-white px-4 py-4 rounded group-hover:opacity-90 opacity-0 '
        >
          <i className='fa fa-chevron-right' aria-hidden='true'></i>
        </button>
      </div>
    </div>
  );
}
