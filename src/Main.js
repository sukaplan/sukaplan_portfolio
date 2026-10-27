import React from 'react';
import Navbar from './components/Navbar';
import Intro from './components/Intro';
import DividerRunner from './components/DividerRunner';
import SelectedWork from './components/SelectedWork';
import Projects from './components/Projects';
import Experience from './components/Experience';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollEffects from './components/ScrollEffects';
import useTheme from './hooks/useTheme';

export default function Main() {
  const [theme, toggleTheme] = useTheme();
  return (
    <div className="portfolio">
      <a className="skip-link" href="#main">Skip to content</a>
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <main id="main" tabIndex="-1"><Intro /><DividerRunner /><SelectedWork /><Projects /><Experience /><About /><Contact /></main>
      <Footer />
      <ScrollEffects />
    </div>
  );
}
