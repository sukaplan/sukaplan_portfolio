import React from 'react';
import SectionHeading from './SectionHeading';
import '../styles/Projects.css';

export default function Projects() {
  return (
    <section id="projects" className="section page-width" aria-labelledby="projects-title">
      <SectionHeading number="02" label="Beyond banking" title={<>Same curiosity.<br /><em>Different playgrounds.</em></>} id="projects-title" />
      <div className="project-row"><span className="project-index micro">01 / Fullstack</span><div><h3>Fantasy Basketball League</h3><p>From the first draft pick to live scoring: league creation, drafting, roster management and scoring in a fullstack TypeScript application.</p><p className="micro project-tech">Next.js / TypeScript / SSR / API routes / Vercel</p></div><a href="https://basketball-fantasy-league.vercel.app" target="_blank" rel="noopener noreferrer" className="text-link">Visit the app <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a></div>
      <div className="project-row"><span className="project-index micro">02 / Computer vision</span><div><h3>Driver Fatigue Detection</h3><p>A real-time prototype combining convolutional neural networks, facial landmarks and eye tracking to detect driver fatigue.</p><p className="micro project-tech">Python / CNN / Computer vision</p></div><span className="project-type micro">Research prototype</span></div>
    </section>
  );
}
