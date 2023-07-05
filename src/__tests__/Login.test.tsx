import '@testing-library/jest-dom';
import React from 'react';
import Login from '../pages/login/Login';
import { fireEvent, render, screen } from '@testing-library/react';
import AuthContextProvider from '../context/AuthContext';
import { BrowserRouter } from 'react-router-dom';

describe('Login tests', () => {
  render(
    <AuthContextProvider>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </AuthContextProvider>
  );
  it('Loader showing up on submit', () => {
    const btn = screen.getByText('Submit');
    fireEvent.click(btn);
    const loader = screen.getByRole('contentinfo');
    expect(loader).toBeInTheDocument();
  });
});
