import React from 'react';
import { render } from '@testing-library/react';
import VisitorAnalytics, { installVisitorAnalytics } from './VisitorAnalytics';

const live = { protocol: 'https:', hostname: 'portfolio.vercel.app' };
beforeEach(() => {
  document.querySelectorAll('script[data-portfolio-analytics]').forEach(script => script.remove());
  delete window.va;
  delete window.vaq;
});
afterEach(() => { document.querySelectorAll('script[data-portfolio-analytics]').forEach(script => script.remove()); });

test('analytics adds no visitor-facing content and never runs in development or file previews', () => {
  const { container } = render(<VisitorAnalytics />);
  expect(container).toBeEmptyDOMElement();
  installVisitorAnalytics({ production: false, location: live });
  installVisitorAnalytics({ production: true, location: { protocol: 'file:', hostname: '' } });
  installVisitorAnalytics({ production: true, location: { protocol: 'https:', hostname: 'localhost' } });
  expect(document.querySelector('script[data-portfolio-analytics]')).toBeNull();
});

test('production loads one same-origin collector and only sends sanitized pageviews', () => {
  installVisitorAnalytics({ production: true, location: live, respectPrivacy: false });
  installVisitorAnalytics({ production: true, location: live, respectPrivacy: false });
  const scripts = document.querySelectorAll('script[data-portfolio-analytics]');
  expect(scripts).toHaveLength(1);
  expect(scripts[0].getAttribute('src')).toBe('/_vercel/insights/script.js');
  expect(scripts[0].defer).toBe(true);
  const sanitize = window.vaq[0][1];
  expect(sanitize({ type: 'pageview', url: 'https://portfolio.vercel.app/?email=private@example.com#private' }).url).toBe('https://portfolio.vercel.app/');
  expect(sanitize({ type: 'event', url: 'https://portfolio.vercel.app/' })).toBeNull();
  expect(sanitize({ type: 'pageview', url: 'not a URL' })).toBeNull();
});

test('Do Not Track disables collection', () => {
  const original = Object.getOwnPropertyDescriptor(navigator, 'doNotTrack');
  Object.defineProperty(navigator, 'doNotTrack', { configurable: true, value: '1' });
  try {
    installVisitorAnalytics({ production: true, location: live });
    expect(document.querySelector('script[data-portfolio-analytics]')).toBeNull();
  } finally {
    if (original) Object.defineProperty(navigator, 'doNotTrack', original);
    else delete navigator.doNotTrack;
  }
});
