import { useEffect, useState } from 'react';

export default function useTheme() {
  const [theme, setTheme] = useState(() => {
    try { return window.localStorage.getItem('su-theme') === 'light' ? 'light' : 'dark'; }
    catch { return 'dark'; }
  });
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = theme === 'light' ? '#f5f4f2' : '#090f1c';
    try { window.localStorage.setItem('su-theme', theme); } catch { /* The switch also works when storage is unavailable. */ }
  }, [theme]);
  return [theme, () => setTheme(current => current === 'dark' ? 'light' : 'dark')];
}
