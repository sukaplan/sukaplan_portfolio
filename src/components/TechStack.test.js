import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import TechStack from './TechStack';
import About from './About';

test('selecting a discipline reveals its tools and relevant work', () => {
  render(<TechStack />);
  expect(screen.getByRole('tabpanel')).toHaveTextContent('C# + .NET');
  fireEvent.click(screen.getByRole('tab', { name: /Cloud & delivery/ }));
  expect(screen.getByRole('tabpanel')).toHaveTextContent('Azure + AWS');
  expect(screen.getByRole('tabpanel')).toHaveTextContent('moving shared-folder file workflows into Amazon S3');
  expect(screen.getByRole('tab', { name: /Cloud & delivery/ })).toHaveAttribute('aria-selected', 'true');
});

test('the toolkit supports keyboard selection and focus', () => {
  render(<TechStack />);
  fireEvent.keyDown(screen.getByRole('tab', { name: /Backend & architecture/ }), { key: 'ArrowDown' });
  expect(screen.getByRole('tab', { name: /Frontend & interaction/ })).toHaveFocus();
  expect(screen.getByRole('tabpanel')).toHaveTextContent('React + TypeScript');
  fireEvent.keyDown(screen.getByRole('tab', { name: /Frontend & interaction/ }), { key: 'End' });
  expect(screen.getByRole('tabpanel')).toHaveTextContent('xUnit + NUnit');
});

test('the biography has the corrected certificate year and no current location', () => {
  render(<About />);
  expect(screen.getByText('Microsoft Certified: Azure Fundamentals · 2023')).toBeInTheDocument();
  expect(screen.queryByText(/Berlin|Based in/i)).not.toBeInTheDocument();
});
