import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useAPI } from '../../context/APIContext';
import Button from '../Button';
import SliderItem from './SliderItem';
import debounce from 'lodash.debounce'; //used for preventing unnecessary re-renders
import { GameSliderProps } from '../../types/types';

export default function GameSlider({ theme }: GameSliderProps) {
  const { data } = useAPI(); //custom hook for Context

  const [move, setMove] = useState(0); // how much has slider moved in pixels
  const [sliderSize, setSliderSize] = useState(0);
  const [sliderContainerSize, setSliderContainerSize] = useState(0);
  const [sliderItemSize, setsliderItemSize] = useState(0); //
  const [filteredGames, setFilteredGames] = useState<any>(null);

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
    [resize] //update slider container width when resize state changes
  );

  const sliderItemRef = useCallback((node: HTMLDivElement) => {
    if (node) {
      console.log('lmao');
      setsliderItemSize(node.getBoundingClientRect().width);
    }
  }, []);

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
    if (theme) {
      setFilteredGames(data.filter((item: any) => item.theme === theme)); //filter game data if theme is provided
    }
    //get width of a slider when games are loaded
    if (data) {
      setSliderSize(
        slider.current ? slider.current.getBoundingClientRect().width : 0
      );
    }

    window.addEventListener('resize', debounceHandleResize); //update state when resizing window(width of element changes)

    //Cleanup of event listener
    return () => {
      window.removeEventListener('resize', debounceHandleResize);
    };
  }, [data, debounceHandleResize]);

  //function for scrolling right
  const handleNext = () => {
    console.log(move, sliderSize, sliderContainerSize, sliderItemSize);
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
    if (Math.abs(move) < sliderItemSize) {
      setMove((prevValue) => prevValue + Math.abs(move));
    } else {
      setMove((prevValue) => prevValue + sliderItemSize);
    }
  };
  /*
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);


  function handleTouchStart(e: any) {
    setTouchStart(e.targetTouches[0].clientX);
  }

  function handleTouchMove(e: any) {
    setTouchEnd(e.targetTouches[0].clientX);
  }

  function handleTouchEnd() {
    if (touchStart - touchEnd > 80) {
      // do your stuff here for left swipe
      handleNext();
    }

    if (touchStart - touchEnd < -80) {
      // do your stuff here for right swipe
      handlePrevious();
    }
  }
  */
  return (
    <div className='w-full flex items-center justify-center flex-row'>
      <Button title='<' action={handlePrevious}></Button>

      <div
        className='overflow-hidden w-full h-[200px] sm:h-[230px] relative'
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
        <div
          /*
        onTouchStart={(touchStartEvent) =>
          handleTouchStart(touchStartEvent)
        }
        onTouchMove={(touchMoveEvent) => handleTouchMove(touchMoveEvent)}
        onTouchEnd={() => handleTouchEnd()}
        */
          className={`inline-flex  transition-all ease-in-out duration-200`}
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
          {filteredGames
            ? filteredGames.map((item: any) => (
                <SliderItem
                  key={item.id}
                  refs={item.id === 1 ? sliderItemRef : undefined} //prevent unnecessary re-renders by putting ref on only one item to get item's width
                  img={item.img}
                  id={item.id}
                  title={item.title}
                ></SliderItem>
              ))
            : data.map((item: any) => (
                <SliderItem
                  key={item.id}
                  refs={item.id === 1 ? sliderItemRef : undefined} //prevent unnecessary re-renders by putting ref on only one item to get item's width
                  img={item.img}
                  id={item.id}
                  title={item.title}
                ></SliderItem>
              ))}
        </div>
      </div>
      <Button title='>' action={handleNext}></Button>
    </div>
  );
}