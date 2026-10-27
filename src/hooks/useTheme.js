import { useEffect, useState } from 'react';

const PREFERENCE_KEY = 'su-theme-preference';

export default function useTheme() {
  const [theme, setTheme] = useState(() => {
    try { return window.localStorage.getItem(PREFERENCE_KEY) === 'dark' ? 'dark' : 'light'; }
    catch { return 'light'; }
  });
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = theme === 'light' ? '#f5f4f2' : '#090f1c';
  }, [theme]);
  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    try { window.localStorage.setItem(PREFERENCE_KEY, next); } catch { /* Switching also works without storage. */ }
  };
  return [theme, toggleTheme];
}
