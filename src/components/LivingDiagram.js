import React, { useEffect, useState } from 'react';
import useReducedMotion from '../hooks/useReducedMotion';

const stages = [
  { title: 'Understand the need', label: 'A human need', subtitle: 'Begin with the why.', text: 'Clarify the problem, understand the domain, and ask the questions that shape the solution.' },
  { title: 'Shape the experience', label: 'A clear interface', subtitle: 'Make complexity usable.', text: 'Connect useful information to thoughtful interfaces, from investment dashboards to fullstack products.' },
  { title: 'Build the foundation', label: 'A reliable system', subtitle: 'Care for what sits underneath.', text: 'Define clear boundaries, test the important behavior, and make the system easier to change.' },
];

export default function LivingDiagram() {
  const [active, setActive] = useState(0);
  const reducedMotion = useReducedMotion();
  useEffect(() => {
    if (reducedMotion) return undefined;
    const timer = window.setInterval(() => {
      if (!document.hidden) setActive(current => (current + 1) % stages.length);
    }, 3000);
    return () => window.clearInterval(timer);
  }, [reducedMotion]);
  return (
    <figure className="living-diagram" aria-label="An interactive study of how I approach software">
      <div className="diagram-eyebrow micro"><span>Fig. 01 / An idea, connected</span><span aria-hidden="true">↓</span></div>
      <div className="living-canvas">
        <svg className="living-path" viewBox="0 0 440 400" aria-hidden="true">
          <path className="path-foundation" d="M65 55H300C420 55 420 200 300 200H140C20 200 20 345 140 345H355" />
          <path className="path-progress" pathLength="1" style={{ strokeDashoffset: [0.77, 0.36, 0][active] }} d="M65 55H300C420 55 420 200 300 200H140C20 200 20 345 140 345H355" />
          <path className="path-sketch" d="M189 90c22-16 48-16 69-4m-19-7 19 7-17 9M245 265c-21 15-47 15-66 2m19 7-19-7 17-8" />
          <text x="182" y="121" className="path-annotation">form follows purpose</text>
          <text x="173" y="300" className="path-annotation">the details connect</text>
        </svg>
        {stages.map((stage, index) => (
          <button className={`diagram-stop diagram-stop--${index + 1}${active === index ? ' is-active' : ''}`} key={stage.title} type="button" aria-pressed={active === index} aria-controls="diagram-explanation" onClick={() => setActive(index)}>
            <span className="stop-index micro">0{index + 1}</span><span className="stop-point" aria-hidden="true" /><span className="stop-label">{stage.label}</span>
          </button>
        ))}
      </div>
      <figcaption className="diagram-explanation" id="diagram-explanation" aria-live="off" aria-atomic="true">
        <span className="micro">0{active + 1} / {stages[active].title}</span>
        <p key={active}><strong>{stages[active].subtitle}</strong> {stages[active].text}</p>
      </figcaption>
      <p className="diagram-hint micro">Three seconds per step. Select any point to explore.</p>
    </figure>
  );
}
