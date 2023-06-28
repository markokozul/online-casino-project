import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useDeferredValue,
} from 'react';
import Button from './Button';
import { GameData } from '../types/types';
//swiping npm package
import { useSwipeable } from 'react-swipeable';

export default function GameSlider({ games }: GameData) {
  const [move, setMove] = useState(0);
  const [sliderSize, setSliderSize] = useState(0);
  const [sliderParentSize, setSliderParentSize] = useState(0);
  const [item, setItem] = useState(0);
  //accessing slider DOM element
  const slider = useRef<HTMLDivElement>(null);

  const [resize, setResize] = useState(0);
  //accessing DOM elements using callback refs(cant use useRef because DOM isn't loaded on first render)
  const sliderParent = useCallback(
    (node: HTMLDivElement) => {
      if (node) {
        setSliderParentSize(node.getBoundingClientRect().width);
        console.log(node.getBoundingClientRect().width);
      }
    },
    [resize]
  );

  const sliderItem = useCallback((node: HTMLDivElement) => {
    if (node) {
      setItem(node.getBoundingClientRect().width);
    }
  }, []);

  const handleResize = () => {
    setResize((prevValue) => prevValue + 1);
    console.log(resize);
  };

  //used for swiping feature
  const handlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handlePrevious(),
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  useEffect(() => {
    if (games) {
      setSliderSize(
        slider.current ? slider.current.getBoundingClientRect().width : 0
      );
    }
    const debounceHandleResize: any = () => {
      setTimeout(() => {
        handleResize();
      }, 1000);
    };

    //update state when resizing window(width of element changes)
    window.addEventListener('resize', debounceHandleResize);

    return () => {
      window.removeEventListener('resize', debounceHandleResize);
    };
  }, [games]);

  const handleNext = () => {
    if (sliderSize - (Math.abs(move) + item) <= sliderParentSize) {
      setMove(
        (prevValue) =>
          prevValue - (sliderSize - Math.abs(move) - sliderParentSize)
      );
    } else {
      setMove((prevValue) => prevValue - item);
    }
  };
  const handlePrevious = () => {
    if (Math.abs(move) < item) {
      setMove((prevValue) => prevValue + Math.abs(move));
    } else {
      setMove((prevValue) => prevValue + item);
    }
  };
  return (
    <div className='h-[100vh] w-[100vw] flex justify-center items-center flex-row '>
      <button
        className='bg-yellow-400'
        //disable 'Previous' button if slider is at the beginning
        disabled={move === 0 ? true : false}
        onClick={handlePrevious}
      >
        prev
      </button>

      <div
        className='overflow-hidden w-[80%] h-[200px] border-2 border-purple-800 relative py-10'
        ref={sliderParent}
        //inline conditional styling-easier than tailwind conditional styling

        style={
          sliderSize < sliderParentSize
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
          className={`bg-black p-10  inline-flex  transition-all ease-in-out duration-200`}
          //inline conditional styling-easier than tailwind conditional styling
          style={
            sliderSize < sliderParentSize
              ? {
                  position: undefined,
                }
              : {
                  left:
                    sliderSize - Math.abs(move) < sliderParentSize ? '' : move,
                  position: 'absolute',
                  right:
                    sliderSize - Math.abs(move) < sliderParentSize ? 0 : '',
                }
          }
          ref={slider}
        >
          {games.map((item) => (
            <div
              key={item.id}
              className='w-[200px] h-[200px] bg-slate-400 '
              ref={sliderItem}
            >
              <img src={item.img} className='mx-2' alt=''></img>
            </div>
          ))}
        </div>
      </div>

      <button
        className='bg-yellow-400'
        //disable 'Next' button if slider is at the end

        onClick={handleNext}
      >
        next
      </button>
    </div>
  );
}
