import { useEffect } from 'react';

// Vercel serves this same-origin collector only after Web Analytics is enabled.
// Reports stay in the authenticated Vercel dashboard; nothing is rendered here.
export function installVisitorAnalytics({ production, location = window.location, respectPrivacy = true } = {}) {
  if (!production || location.protocol !== 'https:' || /^(localhost|127\.0\.0\.1)$/.test(location.hostname)) return;
  if (respectPrivacy && (navigator.doNotTrack === '1' || navigator.globalPrivacyControl === true)) return;
  if (document.querySelector('script[data-portfolio-analytics]')) return;
  window.va = window.va || function (...args) { (window.vaq = window.vaq || []).push(args); };
  window.va('beforeSend', event => {
    // Page counts only: discard URL query strings/fragments and custom events.
    if (event.type !== 'pageview') return null;
    try {
      const url = new URL(event.url);
      return { ...event, url: `${url.origin}${url.pathname}` };
    } catch { return null; }
  });
  const script = document.createElement('script');
  script.src = '/_vercel/insights/script.js';
  script.defer = true;
  script.dataset.portfolioAnalytics = 'true';
  document.head.appendChild(script);
}

export default function VisitorAnalytics() {
  useEffect(() => { installVisitorAnalytics({ production: process.env.NODE_ENV === 'production' }); }, []);
  return null;
}
