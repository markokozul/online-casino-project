import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AuthContextProvider from '../context/AuthContext';
import Details from '../pages/game-details/Details';

describe('GameDetails', () => {
  render(
    <AuthContextProvider>
      <BrowserRouter>
        <Details name='test' img='test' id='1' />
      </BrowserRouter>
    </AuthContextProvider>
  );
  it('Correct button attributes', async () => {
    const btn = screen.getByText('Play');
    expect(btn).toHaveAttribute('href', '/1/play');
  });
});
