import React, { useEffect, useState } from 'react';
import useReducedMotion from '../hooks/useReducedMotion';

const greetings = [
  { word: 'Hello', language: 'English', code: 'en' },
  { word: 'Merhaba', language: 'Türkçe', code: 'tr' },
  { word: 'Hallo', language: 'Deutsch', code: 'de' },
  { word: 'Bonjour', language: 'Français', code: 'fr' },
  { word: 'Hola', language: 'Español', code: 'es' },
  { word: 'こんにちは', language: '日本語', code: 'ja' },
];

export default function Greeting() {
  const reducedMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (reducedMotion) return undefined;
    const timer = window.setInterval(() => {
      if (!document.hidden) setIndex(previous => (previous + 1) % greetings.length);
    }, 3200);
    return () => window.clearInterval(timer);
  }, [reducedMotion]);
  const greeting = greetings[reducedMotion ? 0 : index];
  return (
    <div className="greeting">
      <span className="greeting-dot" aria-hidden="true" />
      <span className="sr-only">Hello, I’m Su Kaplan.</span>
      <span className="greeting-word" aria-hidden="true" key={greeting.word} lang={greeting.code}>{greeting.word}<span className="greeting-comma">,</span></span>
      <span className="greeting-language micro" aria-hidden="true">{greeting.language}</span>
    </div>
  );
}
