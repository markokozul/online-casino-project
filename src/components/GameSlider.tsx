import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { GamesContext } from '../context/Context';
import Button from './Button';
//used for preventing unnecessary re-renders
import debounce from 'lodash.debounce';

//swiping npm package
import { useSwipeable } from 'react-swipeable';

export default function GameSlider() {
  const games = useContext(GamesContext);

  const [move, setMove] = useState(0);
  const [sliderSize, setSliderSize] = useState(0);
  const [sliderContainerSize, setSliderContainerSize] = useState(0);
  const [sliderItemSize, setsliderItemSize] = useState(0);
  //accessing slider DOM element
  const slider = useRef<HTMLDivElement>(null);

  const [resize, setResize] = useState(0);
  //accessing DOM elements using callback refs(cant use useRef because DOM isn't loaded on first render)
  const sliderContainer = useCallback(
    (node: HTMLDivElement) => {
      if (node) {
        setSliderContainerSize(node.getBoundingClientRect().width);
        console.log(node.getBoundingClientRect().width);
      }
    },
    //update slider container width when resize state changes
    [resize]
  );

  const sliderItem = useCallback((node: HTMLDivElement) => {
    if (node) {
      setsliderItemSize(node.getBoundingClientRect().width);
      console.log(node.getBoundingClientRect().width);
    }
  }, []);

  const handleResize = () => {
    //sliderContainerSize will update after resize updates
    setResize((prevValue) => prevValue + 1);

    //update slider size(width changed after a breakpoint)
    setSliderSize(
      slider.current ? slider.current.getBoundingClientRect().width : 0
    );
    console.log(resize);
  };

  //used for swipe feature
  const handlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handlePrevious(),
    preventScrollOnSwipe: true,
    trackMouse: true,
    trackTouch: true,
  });
  //prevent unnecessary re-renders when resizing window
  const debounceHandleResize = useMemo(() => debounce(handleResize, 800), []);

  useEffect(() => {
    //get width of a slider when games are loaded
    if (games) {
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
  }, [games, debounceHandleResize]);

  const handleNext = () => {
    if (sliderSize - (Math.abs(move) + sliderItemSize) <= sliderContainerSize) {
      setMove(
        (prevValue) =>
          prevValue - (sliderSize - Math.abs(move) - sliderContainerSize)
      );
    } else {
      setMove((prevValue) => prevValue - sliderItemSize);
    }
  };
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
    <div className='w-full flex justify-center items-center flex-row'>
      <Button title='<' action={handlePrevious}></Button>

      <div
        className='overflow-hidden w-full h-[200px] sm:h-[230px] relative'
        ref={sliderContainer}
        //inline conditional styling-easier than tailwind conditional styling

        style={
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
          {...handlers}
          className={`inline-flex  transition-all ease-in-out duration-200`}
          //inline conditional styling-easier than tailwind conditional styling
          style={
            sliderSize < sliderContainerSize
              ? {
                  position: undefined,
                }
              : {
                  left:
                    sliderSize - Math.abs(move) < sliderContainerSize
                      ? undefined
                      : move,
                  position: 'absolute',
                  right:
                    sliderSize - Math.abs(move) < sliderContainerSize
                      ? 0
                      : undefined,
                }
          }
          ref={slider}
        >
          {games &&
            games.map((item) => (
              <div
                /*
              onTouchStart={(touchStartEvent) =>
                handleTouchStart(touchStartEvent)
              }
              onTouchMove={(touchMoveEvent) => handleTouchMove(touchMoveEvent)}
              onTouchEnd={() => handleTouchEnd()}
              */
                key={item.id}
                className='w-[200px] h-[200px] p-4 sm:w-[230px] sm:h-[230px] '
                //set ref to only one sliderItemSize in slider(prevent unnecessary state updates in sliderItem callback function)
                ref={item.id === 1 ? sliderItem : undefined}
              >
                <img
                  loading='lazy'
                  src={item.img}
                  className='border-2 border-[#ffdd2d]'
                  alt={item.title}
                ></img>
              </div>
            ))}
        </div>
      </div>
      <Button title='>' action={handleNext}></Button>
    </div>
  );
}
