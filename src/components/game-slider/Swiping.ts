function handleTouchStart(
  e: React.TouchEvent<HTMLDivElement>,
  setTouchStart: React.Dispatch<React.SetStateAction<number>>,
  setTouchEnd: React.Dispatch<React.SetStateAction<number>>,
  setPrevTouchEnd: React.Dispatch<React.SetStateAction<number>>,
  setAnimation: React.Dispatch<React.SetStateAction<boolean>>
) {
  setAnimation(false); //remove animation from slider when swiping
  setTouchEnd(0);
  setTouchStart(e.targetTouches[0].clientX);
  setPrevTouchEnd(0);
}

function handleTouchMove(
  e: React.TouchEvent<HTMLDivElement>,
  touchStart: number,
  touchEnd: number,
  sliderSize: number,
  move: number,
  setMove: React.Dispatch<React.SetStateAction<number>>,
  sliderContainerSize: number,
  prevTouchEnd: number,
  setPrevTouchEnd: React.Dispatch<React.SetStateAction<number>>,
  setTouchEnd: React.Dispatch<React.SetStateAction<number>>
) {
  // document.body.style.overflowY = 'hidden'; //disable vertical scroll on a page when swiping through slider
  setTouchEnd(e.targetTouches[0].clientX);
  if (touchStart - touchEnd > 0) {
    if (sliderSize - Math.abs(move) > sliderContainerSize && touchEnd) {
      setMove(
        (prev: number) =>
          move -
          2 + //speed up sliding
          (prevTouchEnd ? touchEnd - prevTouchEnd : touchEnd - touchStart)
      );
      setPrevTouchEnd(touchEnd);
    }

    // do your stuff here for left swipe
  }

  if (touchStart - touchEnd < 0) {
    // do your stuff here for right swipe
    if (move < 0 && touchEnd) {
      setMove(
        (prev: number) =>
          move +
          2 - //speed up sliding
          (prevTouchEnd ? prevTouchEnd - touchEnd : touchStart - touchEnd)
      );
      setPrevTouchEnd(touchEnd);
    } else if (move >= 0) {
      setMove(0);
    }
  }
}

export { handleTouchStart, handleTouchMove };
