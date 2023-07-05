import '@testing-library/jest-dom';
import React from 'react';
import GameSlider from '../components/game-slider/GameSlider';
import { render, screen } from '@testing-library/react';
import APIContextProvider from '../context/APIContext';

describe('first', () => {
  render(
    <APIContextProvider>
      <GameSlider />
    </APIContextProvider>
  );
  it('Slider div rendering', () => {
    const slider = screen.getByRole('contentinfo');
    expect(slider).toBeInTheDocument();
    expect(slider).toHaveAttribute('role', 'contentinfo');
  });
});
