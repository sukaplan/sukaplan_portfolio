import { act, fireEvent, render, screen, within } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  window.localStorage.clear();
  document.documentElement.removeAttribute('data-theme');
  window.matchMedia = jest.fn().mockImplementation(() => ({ matches: false, addEventListener: jest.fn(), removeEventListener: jest.fn() }));
});
afterEach(() => jest.useRealTimers());

test('presents the portfolio sections and working local navigation', () => {
  render(<App />);
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('I’m Su Kaplan.');
  expect(screen.getAllByRole('heading', { level: 2 }).map(heading => heading.id)).toEqual(['toolkit-title', 'work-title', 'projects-title', 'experience-title', 'about-title', 'contact-title']);
  screen.getAllByRole('link').forEach(link => {
    if (link.getAttribute('href').startsWith('#')) expect(document.querySelector(link.getAttribute('href'))).toBeInTheDocument();
  });
});

test('provides complete work stories and labels conceptual diagrams', () => {
  render(<App />);
  const work = screen.getByRole('region', { name: 'The thinking. The making.' });
  const stories = within(work).getAllByRole('article');
  expect(stories).toHaveLength(3);
  stories.forEach(story => {
    ['Challenge', 'My contribution', 'Result'].forEach(label => expect(within(story).getByText(label)).toBeInTheDocument());
    expect(within(story).getByText('Illustrative concept · Not production architecture')).toBeInTheDocument();
    expect(within(story).getByRole('img')).toHaveAccessibleName();
  });
  expect(within(work).getByText(/estimated 75% reduction/)).toBeInTheDocument();
  expect(within(work).getByText(/scale of the platform/)).toBeInTheDocument();
});

test('the living diagram selects and explains each stage', () => {
  render(<App />);
  const stage = screen.getByRole('button', { name: /A reliable system/ });
  fireEvent.click(stage);
  expect(stage).toHaveAttribute('aria-pressed', 'true');
  expect(screen.getByRole('button', { name: /A human need/ })).toHaveAttribute('aria-pressed', 'false');
  expect(screen.getByText(/Define clear boundaries, test the important behavior/)).toBeInTheDocument();
});

test('multilingual greetings rotate without a pause/play control', () => {
  jest.useFakeTimers();
  render(<App />);
  expect(screen.queryByRole('button', { name: /greetings/ })).not.toBeInTheDocument();
  expect(screen.queryByText('People → interfaces → systems')).not.toBeInTheDocument();
  act(() => jest.advanceTimersByTime(3200));
  expect(screen.getByText('Merhaba')).toBeInTheDocument();
  act(() => jest.advanceTimersByTime(3200));
  expect(screen.getByText('Hallo')).toBeInTheDocument();
});

test('the opening diagram starts immediately and cycles every three seconds', () => {
  jest.useFakeTimers();
  render(<App />);
  expect(screen.getByRole('button', { name: /A human need/ })).toHaveAttribute('aria-pressed', 'true');
  act(() => jest.advanceTimersByTime(2999));
  expect(screen.getByRole('button', { name: /A human need/ })).toHaveAttribute('aria-pressed', 'true');
  act(() => jest.advanceTimersByTime(1));
  expect(screen.getByRole('button', { name: /A clear interface/ })).toHaveAttribute('aria-pressed', 'true');
  act(() => jest.advanceTimersByTime(3000));
  expect(screen.getByRole('button', { name: /A reliable system/ })).toHaveAttribute('aria-pressed', 'true');
  act(() => jest.advanceTimersByTime(3000));
  expect(screen.getByRole('button', { name: /A human need/ })).toHaveAttribute('aria-pressed', 'true');
});

test('reduced motion keeps the greeting static', () => {
  window.matchMedia.mockImplementation(() => ({ matches: true, addEventListener: jest.fn(), removeEventListener: jest.fn() }));
  jest.useFakeTimers();
  render(<App />);
  act(() => jest.advanceTimersByTime(9600));
  expect(screen.getByText('Hello')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /A human need/ })).toHaveAttribute('aria-pressed', 'true');
  expect(screen.queryByRole('button', { name: 'Pause greetings' })).not.toBeInTheDocument();
});

test('preserves contact destinations and the CV’s project link', () => {
  render(<App />);
  const contact = screen.getByRole('region', { name: 'Let’s make something matter.' });
  expect(within(contact).getByRole('link', { name: /Email/ })).toHaveAttribute('href', 'mailto:suukaplan@outlook.com');
  expect(within(contact).getByRole('link', { name: /GitHub/ })).toHaveAttribute('href', 'https://github.com/sukaplan');
  expect(within(contact).getByRole('link', { name: /LinkedIn/ })).toHaveAttribute('href', 'https://www.linkedin.com/in/su-kaplan/');
  expect(screen.getByRole('link', { name: /Visit the app/ })).toHaveAttribute('href', 'https://basketball-fantasy-league.vercel.app');
});


test('neutral off-white is the default and the pull cord remembers explicit choices', () => {
  // Earlier versions saved dark even without an explicit user choice.
  window.localStorage.setItem('su-theme', 'dark');
  const first = render(<App />);
  expect(document.documentElement).toHaveAttribute('data-theme', 'light');
  fireEvent.click(screen.getByRole('button', { name: 'Turn off the lights' }));
  expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
  expect(window.localStorage.getItem('su-theme-preference')).toBe('dark');
  expect(screen.getByRole('button', { name: 'Turn on the lights' })).toHaveAttribute('aria-pressed', 'false');
  first.unmount();
  render(<App />);
  expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
  fireEvent.click(screen.getByRole('button', { name: 'Turn on the lights' }));
  expect(document.documentElement).toHaveAttribute('data-theme', 'light');
});

test('scrolling advances case-study connections and updates heading position', () => {
  jest.useFakeTimers();
  const rect = jest.spyOn(Element.prototype, 'getBoundingClientRect');
  let top = 900;
  rect.mockImplementation(() => ({ top, height: 700, bottom: top + 700, width: 1000, left: 0, right: 1000 }));
  try {
    const { container } = render(<App />);
    const story = container.querySelector('.work-story');
    expect(story.querySelectorAll('.is-current')).toHaveLength(1);
    expect(container.querySelector('#work').style.getPropertyValue('--entry-shift')).toBe('38px');
    top = window.innerHeight * .55;
    fireEvent.scroll(window);
    act(() => jest.advanceTimersByTime(32));
    const entry = Number(container.querySelector('#work').style.getPropertyValue('--entry-progress'));
    expect(entry).toBeGreaterThan(0);
    expect(entry).toBeLessThan(.5);
    expect(story.querySelectorAll('.is-current')).toHaveLength(1);
    top = -300;
    fireEvent.scroll(window);
    act(() => jest.advanceTimersByTime(32));
    expect(story.querySelectorAll('.is-current')).toHaveLength(3);
    expect(container.querySelector('#work').style.getPropertyValue('--entry-shift')).toBe('0px');
  } finally { rect.mockRestore(); }
});


test('mobile case-study steps wait for the diagram after the story text', () => {
  jest.useFakeTimers();
  const originalWidth = window.innerWidth;
  window.innerWidth = 390;
  const rect = jest.spyOn(Element.prototype, 'getBoundingClientRect');
  let diagramTop = 1000;
  rect.mockImplementation(function () {
    const top = this.classList.contains('diagram-flow') ? diagramTop : -300;
    return { top, height: 300, bottom: top + 300, width: 350, left: 0, right: 350 };
  });
  try {
    const { container } = render(<App />);
    const story = container.querySelector('.work-story');
    expect(story.style.getPropertyValue('--story-progress')).toBe('0');
    diagramTop = window.innerHeight * .55;
    fireEvent.scroll(window);
    act(() => jest.advanceTimersByTime(32));
    expect(Number(story.style.getPropertyValue('--story-progress'))).toBeGreaterThan(0);
    expect(story.querySelectorAll('.is-current')).toHaveLength(1);
    diagramTop = -300;
    fireEvent.scroll(window);
    act(() => jest.advanceTimersByTime(32));
    expect(story.querySelectorAll('.is-current')).toHaveLength(3);
  } finally { rect.mockRestore(); window.innerWidth = originalWidth; }
});
