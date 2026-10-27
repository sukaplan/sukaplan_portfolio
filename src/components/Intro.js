import React from 'react';
import Greeting from './Greeting';
import LivingDiagram from './LivingDiagram';
import '../styles/Intro.css';

export default function Intro() {
  return (
    <section id="intro" className="hero page-width" aria-labelledby="intro-title">
      <div className="hero-topline micro"><span>Senior fullstack engineer</span><span>Based in Berlin, Germany</span></div>
      <div className="hero-layout">
        <div className="hero-copy">
          <Greeting />
          <h1 id="intro-title"><span className="hero-name">I’m Su Kaplan.</span>Between<br /><em>logic</em> &amp; feeling<span className="name-period">.</span></h1>
          <p className="hero-opening">I build thoughtful digital experiences and the reliable systems behind them.</p>
          <p className="hero-context">From React interfaces to the architecture of financial software. Currently modernizing securities and investment systems at Intertech.</p>
          <div className="hero-actions"><a className="button" href="#work">Explore the work <span aria-hidden="true">↘</span></a><a className="text-link" href="#contact">Let’s talk <span aria-hidden="true">↗</span></a></div>
        </div>
        <LivingDiagram />
      </div>
      <div className="hero-end"><a className="micro" href="#work">A closer look <span aria-hidden="true">↓</span></a></div>
    </section>
  );
}
