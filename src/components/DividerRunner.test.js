import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import DividerRunner from './DividerRunner';

let trackTop;
let rect;
beforeEach(() => {
  jest.useFakeTimers();
  window.localStorage.clear();
  trackTop = 400;
  rect = jest.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(() => ({ top: trackTop, bottom: trackTop + 94, height: 94, width: 360, left: 0, right: 360 }));
});
afterEach(() => { rect.mockRestore(); jest.useRealTimers(); });
const space = target => {
  const event = new KeyboardEvent('keydown', { code: 'Space', key: ' ', bubbles: true, cancelable: true });
  fireEvent(target || document.body, event);
  return event;
};

test('Space starts only when the track is in view, and scrolling away pauses it', () => {
  render(<DividerRunner />);
  expect(space().defaultPrevented).toBe(true);
  expect(screen.getByRole('button', { name: 'Jump dinosaur' })).toBeInTheDocument();
  const held = new KeyboardEvent('keydown', { code: 'Space', key: ' ', repeat: true, bubbles: true, cancelable: true });
  fireEvent(document.body, held);
  expect(held.defaultPrevented).toBe(true);
  act(() => jest.advanceTimersByTime(100));
  trackTop = 1000;
  fireEvent.scroll(window);
  expect(screen.getByRole('button', { name: 'Resume dinosaur game' })).toBeInTheDocument();
  expect(space().defaultPrevented).toBe(false);
  trackTop = 400;
  fireEvent.scroll(window);
  space();
  expect(screen.getByRole('button', { name: 'Jump dinosaur' })).toBeInTheDocument();
});

test('typing and other controls retain their Space behavior', () => {
  render(<><DividerRunner /><input aria-label="Example input" /><button type="button">Other button</button></>);
  expect(space(screen.getByRole('textbox')).defaultPrevented).toBe(false);
  expect(space(screen.getByRole('button', { name: 'Other button' })).defaultPrevented).toBe(false);
  expect(screen.getByRole('button', { name: 'Start dinosaur game' })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Start dinosaur game' }));
  expect(screen.getByRole('button', { name: 'Jump dinosaur' })).toBeInTheDocument();
  fireEvent.keyDown(document.body, { key: 'Escape' });
  expect(screen.getByRole('button', { name: 'Resume dinosaur game' })).toBeInTheDocument();
});

test('collision saves the best score and Space restarts the game', () => {
  render(<DividerRunner />);
  space();
  act(() => jest.advanceTimersByTime(5000));
  expect(screen.getByRole('button', { name: 'Restart dinosaur game' })).toBeInTheDocument();
  expect(Number(window.localStorage.getItem('su-runner-best'))).toBeGreaterThan(0);
  space();
  expect(screen.getByRole('button', { name: 'Jump dinosaur' })).toBeInTheDocument();
  expect(screen.getByLabelText(/Score 0, best/)).toBeInTheDocument();
});
