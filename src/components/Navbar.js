import React from 'react';
import '../styles/Navbar.css';

export default function Navbar({ theme, onToggleTheme }) {
  return (
    <header className="masthead page-width">
      <a className="wordmark" href="#intro" aria-label="Su Kaplan — back to opening">su kaplan<span aria-hidden="true">.</span></a>
      <span className="masthead-note micro">Software, with intention.</span>
      <nav className="main-nav" aria-label="Main navigation">
        <a href="#work">Work</a><a href="#about">About</a><a href="#contact">Contact <span aria-hidden="true">↗</span></a>
      </nav>
      <button className="light-switch" type="button" onClick={onToggleTheme} aria-label={theme === 'dark' ? 'Turn on the lights' : 'Turn off the lights'} aria-pressed={theme === 'light'}>
        <span className="switch-label">Turn {theme === 'dark' ? 'on' : 'off'}<br />the lights</span>
        <span className="pull-cord" aria-hidden="true"><span className="cord-thread" /><span className="cord-handle" /></span>
      </button>
    </header>
  );
}
