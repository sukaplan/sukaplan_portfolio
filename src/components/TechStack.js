import React, { useRef, useState } from 'react';
import '../styles/TechStack.css';

const disciplines = [
  { id: 'backend', name: 'Backend & architecture', lead: 'C# + .NET', tools: '.NET 10 · ASP.NET Core · DDD · SQL · RabbitMQ', description: 'Breaking down securities and investment logic into clear domain models, service boundaries and modular APIs.', steps: ['Domain', 'API', 'Data'], footnote: 'Clear responsibilities. Space to evolve.' },
  { id: 'frontend', name: 'Frontend & interaction', lead: 'React + TypeScript', tools: 'React · Next.js · TypeScript · SSR · API integration', description: 'Turning financial data into usable investment views, and building fullstack experiences from league drafting to live scoring.', steps: ['Intent', 'Interface', 'Feedback'], footnote: 'The human side of the system.' },
  { id: 'delivery', name: 'Cloud & delivery', lead: 'Azure + AWS', tools: 'Azure · AWS / S3 · Docker · Kubernetes · CI/CD', description: 'Working across cloud infrastructure and delivery, including moving shared-folder file workflows into Amazon S3.', steps: ['Build', 'Deploy', 'Operate'], footnote: 'From working code to working software.' },
  { id: 'quality', name: 'Testing & observability', lead: 'xUnit + NUnit', tools: 'Unit tests · Integration tests · Elasticsearch · Logstash · Kibana', description: 'Adding a regression safety net around critical financial workflows, and sharing practices for logs and troubleshooting.', steps: ['Behavior', 'Tests', 'Signals'], footnote: 'Make change easier to trust.' },
];

export default function TechStack() {
  const [active, setActive] = useState(0);
  const buttons = useRef([]);
  const selected = disciplines[active];
  const onKey = event => {
    let next;
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = (active + 1) % disciplines.length;
    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = (active + disciplines.length - 1) % disciplines.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = disciplines.length - 1;
    if (next !== undefined) { event.preventDefault(); setActive(next); buttons.current[next].focus(); }
  };
  return (
    <section id="toolkit" className="toolkit page-width" aria-labelledby="toolkit-title">
      <div className="toolkit-intro"><h2 id="toolkit-title">Tools, with a <em>purpose.</em></h2><p className="micro">Choose a discipline to explore</p></div>
      <div className="toolkit-layout">
        <div className="toolkit-index" role="tablist" aria-label="Engineering disciplines" aria-orientation="vertical" onKeyDown={onKey}>
          {disciplines.map((discipline, index) => <button type="button" role="tab" className="toolkit-tab" key={discipline.id} id={`toolkit-tab-${discipline.id}`} aria-selected={active === index} aria-controls={`toolkit-panel-${discipline.id}`} tabIndex={active === index ? 0 : -1} ref={element => { buttons.current[index] = element; }} onClick={() => setActive(index)}><span className="micro">0{index + 1}</span><span>{discipline.name}</span><span aria-hidden="true">↗</span></button>)}
        </div>
        {disciplines.map((discipline, index) => <div key={discipline.id} role="tabpanel" className="toolkit-panel" id={`toolkit-panel-${discipline.id}`} aria-labelledby={`toolkit-tab-${discipline.id}`} hidden={active !== index}>
          <div className="toolkit-content" key={selected.id}>
            <p className="toolkit-lead">{discipline.lead}</p><p className="toolkit-tools">{discipline.tools}</p><p className="toolkit-description">{discipline.description}</p>
            <div className="toolkit-flow" aria-label={`Illustrative workflow: ${discipline.steps.join(', ')}`}>{discipline.steps.map((step, stepIndex) => <React.Fragment key={step}>{stepIndex > 0 && <span className="toolkit-wire" aria-hidden="true" />}<span className="toolkit-step"><span className="toolkit-point" aria-hidden="true" />{step}</span></React.Fragment>)}</div>
            <p className="toolkit-footnote">{discipline.footnote}</p>
          </div>
        </div>)}
      </div>
    </section>
  );
}
