import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useAPI } from '../../context/APIContext';
import Button from '../Button';
import SliderItem from './SliderItem';

//used for preventing unnecessary re-renders
import debounce from 'lodash.debounce';

export default function GameSlider() {
  //custom hook for Context
  const { data } = useAPI();

  const [move, setMove] = useState(0);
  const [sliderSize, setSliderSize] = useState(0);
  const [sliderContainerSize, setSliderContainerSize] = useState(0);
  const [sliderItem, setsliderItemSize] = useState(0);

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
    //update slider container width when resize state changes
    [resize]
  );

  const sliderItemRef = useCallback((node: HTMLDivElement) => {
    if (node) {
      setsliderItemSize(node.getBoundingClientRect().width);
    }
  }, []);

  const handleResize = () => {
    //sliderContainerSize will update after resize updates
    setResize((prevValue) => prevValue + 1);

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

    //update state when resizing window(width of element changes)
    window.addEventListener('resize', debounceHandleResize);

    //Cleanup
    return () => {
      window.removeEventListener('resize', debounceHandleResize);
    };
  }, [data, debounceHandleResize]);

  const handleNext = () => {
    if (sliderSize - (Math.abs(move) + sliderItem) <= sliderContainerSize) {
      setMove(
        (prevValue) =>
          prevValue - (sliderSize - Math.abs(move) - sliderContainerSize)
      );
    } else {
      setMove((prevValue) => prevValue - sliderItem);
    }
  };
  const handlePrevious = () => {
    if (Math.abs(move) < sliderItem) {
      setMove((prevValue) => prevValue + Math.abs(move));
    } else {
      setMove((prevValue) => prevValue + sliderItem);
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
          //if slider size is smaller than container,set slider on center of container
          sliderSize < sliderContainerSize
            ? {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }
            : undefined
        }
      >
        <div
          className={`inline-flex  transition-all ease-in-out duration-200`}
          //inline conditional styling-easier than tailwind conditional styling
          style={
            //adjust position of a slider
            sliderSize < sliderContainerSize
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
          {data &&
            data.map((item: any) => (
              /*
              onTouchStart={(touchStartEvent) =>
                handleTouchStart(touchStartEvent)
              }
              onTouchMove={(touchMoveEvent) => handleTouchMove(touchMoveEvent)}
              onTouchEnd={() => handleTouchEnd()}
              */

              <SliderItem
                key={item.id}
                //prevent unnecessary re-renders by putting ref on only one item to get item's width
                refs={item.id === 1 ? sliderItemRef : undefined}
                img={item.img}
                title={item.title}
              ></SliderItem>
            ))}
        </div>
      </div>
      <Button title='>' action={handleNext}></Button>
    </div>
  );
}
