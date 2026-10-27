import React from 'react';

const diagrams = {
  modernization: {
    number: '02', title: 'Boundaries make space for change.',
    description: 'Illustrative progression from legacy methods through domain boundaries to modular APIs, supported by unit and integration tests.',
    steps: [['Legacy methods', 'Existing securities behavior'], ['Domain boundaries', 'Clear responsibilities'], ['Modular APIs', 'Independently deployable services']],
    note: 'A safety net of unit + integration tests.',
  },
  gateway: {
    number: '03', title: 'Two channels. A focused gateway.',
    description: 'Illustrative progression from mobile and internet banking to FundChannelGateway and fund operations.',
    steps: [['Mobile + internet banking', 'Two customer channels'], ['FundChannelGateway', 'A dedicated .NET microservice'], ['Fund operations', 'Reworked service logic']],
    note: 'Bring related operations together.',
  },
  dashboard: {
    number: '04', title: 'From information to understanding.',
    description: 'Illustrative relationship between securities, funds and pensions, ASP.NET Core APIs, and the React dashboard.',
    steps: [['Securities · Funds · Pensions', 'Asset information'], ['ASP.NET Core APIs', 'Connecting data and interface'], ['React dashboard', 'A view across asset types']],
    note: 'The interface is part of the system.',
  },
};

export default function SystemDiagram({ type }) {
  const diagram = diagrams[type];
  return (
    <figure className={`system-figure system-figure--${type}`}>
      <div className="figure-top micro"><span>Fig. {diagram.number}</span><span>A system study</span></div>
      <p className="diagram-title">{diagram.title}</p>
      <div className="diagram-flow" role="img" aria-label={diagram.description}>
        {diagram.steps.map(([title, note], index) => <div className="diagram-node" key={title} aria-hidden="true"><span className="node-marker">0{index + 1}</span><div><strong>{title}</strong><span>{note}</span></div></div>)}
      </div>
      <p className="figure-note">{diagram.note}</p>
      <figcaption>Illustrative concept · Not production architecture</figcaption>
    </figure>
  );
}
