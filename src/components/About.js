import React from 'react';
import SectionHeading from './SectionHeading';
import '../styles/About.css';

export default function About() {
  return (
    <section id="about" className="section page-width" aria-labelledby="about-title">
      <SectionHeading number="04" label="A little about me" title={<>Curiosity is the <em>constant.</em></>} id="about-title" />
      <div className="about-grid">
        <p className="about-pullquote">I like making<br />complicated things<br /><em>make sense.</em></p>
        <div className="about-copy"><p>I’m a senior fullstack engineer. My work has centered on financial software for DenizBank through Intertech, especially funds, securities and investment products.</p><p>I enjoy breaking down complex problems, talking through the tradeoffs with teammates, and turning business needs into working software. That can mean a React interface, a domain model, or the test that makes a difficult refactor possible.</p><p>Learning languages is another way I stay curious. I speak Turkish and English, and I’m studying German. Away from code, there’s usually a film on my watchlist.</p><p className="about-certification">Microsoft Certified: Azure Fundamentals · 2023</p></div>
      </div>
    </section>
  );
}
