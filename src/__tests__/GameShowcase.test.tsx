import { render, screen } from '@testing-library/react';
import GameShowcase from '../pages/home/GameShowcase';

test('GameShowcase', () => {
  it('h1 element displays correct text', () => {
    render(<GameShowcase title='game showcase' />);
    expect(screen.getByRole('heading').textContent).toMatch('game showcase');
  });
});
