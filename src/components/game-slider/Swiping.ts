function handleTouchStart(
  e: any,
  setTouchStart: any,
  setTouchEnd: any,
  setPrevTouchEnd: any,
  setAnimation: any
) {
  setAnimation(false); //remove animation from slider when swiping
  setTouchEnd(0);
  setTouchStart(e.targetTouches[0].clientX);
  setPrevTouchEnd(0);
}

function handleTouchMove(
  e: any,
  touchStart: any,
  touchEnd: any,
  sliderSize: any,
  move: any,
  setMove: any,
  sliderContainerSize: number,
  prevTouchEnd: number,
  setPrevTouchEnd: any,
  setTouchEnd: any
) {
  setTouchEnd(e.targetTouches[0].clientX);
  if (touchStart - touchEnd > 0) {
    if (sliderSize - Math.abs(move) > sliderContainerSize && touchEnd) {
      setMove(
        (prev: any) =>
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
        (prev: any) =>
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
