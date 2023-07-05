import React from 'react';
import { render, screen } from '@testing-library/react';
import GameShowcase from '../pages/home/GameShowcase';
import { BrowserRouter } from 'react-router-dom';
import APIContextProvider from '../context/APIContext';

describe('Game showcase', () => {
  it('heading displays correct text', () => {
    render(
      <BrowserRouter>
        <APIContextProvider>
          <GameShowcase title='testing' />
        </APIContextProvider>
      </BrowserRouter>
    );
    expect(screen.getByRole('heading').textContent).toMatch(/testing/i);
  });
});
