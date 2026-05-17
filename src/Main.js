import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Navbar from './components/Navbar';
import Intro from './components/Intro';
import About from './components/About';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';

const theme = createTheme({
  palette: {
    mode: 'light',
    background: { default: '#f9f5ff', paper: '#ede5ff' },
    text: { primary: '#1a0f3d', secondary: '#4d3b7a' },
    primary: { main: '#6d4fc2' },
  },
  typography: {
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
  },
});

export default function Main() {
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Intro />
      <div className="section-divider" />
      <About />
      <div className="section-divider" />
      <Experience />
      <div className="section-divider" />
      <Contact />
      <Footer />
    </ThemeProvider>
  );
}
