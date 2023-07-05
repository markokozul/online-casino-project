import '@testing-library/jest-dom';
import React from 'react';
import SliderItem from '../components/game-slider/SliderItem';
import { render, screen } from '@testing-library/react';
import APIContextProvider from '../context/APIContext';
import { BrowserRouter } from 'react-router-dom';

describe('first', () => {
  const test = {
    title: 'test',
    img: '/test',
    id: 1,
  };

  render(
    <APIContextProvider>
      <BrowserRouter>
        <SliderItem {...test} />
      </BrowserRouter>
    </APIContextProvider>
  );
  it('Slider item rendering', () => {
    const sliderItem = screen.getByRole('contentinfo');
    const sliderLink = screen.getByRole('link');
    expect(sliderItem).toBeInTheDocument();
    expect(sliderLink).toBeInTheDocument();

    expect(sliderItem).toHaveAttribute('src', '/test');
    expect(sliderItem).toHaveAttribute('alt', 'test');
    expect(sliderItem).toHaveAttribute('role', 'contentinfo');
  });
});
