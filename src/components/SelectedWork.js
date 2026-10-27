import React from 'react';
import SectionHeading from './SectionHeading';
import SystemDiagram from './SystemDiagram';
import '../styles/SelectedWork.css';

const stories = [
  {
    id: 'modernization', number: '01', category: 'Architecture / Securities', title: 'A clearer structure. Room to evolve.', tools: '.NET 8 → .NET 10 / DDD / Clean Architecture',
    challenge: 'Modernize a legacy Securities module without losing the financial behavior that people depend on.',
    contribution: 'I restructured 850+ legacy methods into modular .NET 8 REST APIs and authored 6,000+ unit and integration tests with xUnit and NUnit. I now lead the modernization roadmap toward .NET 10 microservices, defining domain models and service boundaries.',
    result: 'Independently deployable services with regression coverage for previously untested financial workflows.',
    metric: '850+', metricLabel: 'methods restructured', secondaryMetric: '6,000+', secondaryLabel: 'tests authored',
  },
  {
    id: 'gateway', number: '02', category: 'Backend / Digital banking', title: 'Less waiting. A more focused service.', tools: 'C# / .NET / Microservices',
    challenge: 'Improve the fund services used by mobile and internet banking while moving their operations into a microservice architecture.',
    contribution: 'I transformed the existing fund-service logic into FundChannelGateway, a dedicated C#/.NET microservice shared by the two digital channels.',
    result: 'An estimated 75% reduction in service response times, with fund-related backend operations brought into a dedicated channel gateway.',
    metric: '~75%', metricLabel: 'lower service response time · estimated',
  },
  {
    id: 'dashboard', number: '03', category: 'Fullstack / Investment experience', title: 'The whole picture, in one view.', tools: 'React / TypeScript / ASP.NET Core',
    challenge: 'Help retail and private banking customers see and understand their securities, funds and pension assets.',
    contribution: 'I built and shipped AssetDashboard with React and ASP.NET Core, developed investment analysis screens, and connected them to backend REST APIs.',
    result: 'A single view across asset categories, giving customers access to their investment information and analysis through the dashboard.',
    metric: 'One view', metricLabel: 'securities, funds & pensions',
  },
];

export default function SelectedWork() {
  return (
    <section id="work" className="section page-width" aria-labelledby="work-title">
      <SectionHeading number="01" label="Selected work" title={<>The thinking.<br />The <em>making.</em></>} id="work-title">Selected work at Intertech, a DenizBank subsidiary. From the underlying system to the customer’s experience.</SectionHeading>
      {stories.map(story => (
        <article className="work-story" key={story.id} aria-labelledby={`${story.id}-title`}>
          <div className="story-margin"><span className="story-number">{story.number}</span><p className="micro">Case study</p></div>
          <div className="story-content">
            <p className="eyebrow story-category">{story.category}</p>
            <h3 id={`${story.id}-title`}>{story.title}</h3>
            <p className="story-tools micro">{story.tools}</p>
            <dl className="story-details"><div><dt>Challenge</dt><dd>{story.challenge}</dd></div><div><dt>My contribution</dt><dd>{story.contribution}</dd></div><div><dt>Result</dt><dd>{story.result}</dd></div></dl>
            <div className="story-results"><div className="story-result"><span>{story.metric}</span><p>{story.metricLabel}</p></div>{story.secondaryMetric && <div className="story-result"><span>{story.secondaryMetric}</span><p>{story.secondaryLabel}</p></div>}</div>
          </div>
          <SystemDiagram type={story.id} />
        </article>
      ))}
      <div className="additional-work">
        <p className="eyebrow">Also in the details</p>
        <details><summary><span>Shared folders → Amazon S3</span><span className="detail-indicator" aria-hidden="true">+</span></summary><div className="detail-body"><p>I migrated file persistence from shared server folders to Amazon S3 and adapted the file-handling workflows. Average upload time fell by 83%, alongside improvements to download and read/write performance.</p><span className="micro">Cloud object storage / File workflows</span></div></details>
        <details><summary><span>Forward value-dated orders &amp; accounting</span><span className="detail-indicator" aria-hidden="true">+</span></summary><div className="detail-body"><p>I rewrote the end-to-end C#/.NET logic for future value-dated outright buy/sell orders, covering distribution across the bank’s securities inventory positions and the corresponding accounting entries.</p><span className="micro">Securities / C# / Domain logic</span></div></details>
      </div>
      <p className="work-context"><span className="micro">The wider environment</span>These contributions sit within banking systems serving 20M+ customers. That is the scale of the platform, not a measure of my individual reach. Diagrams are illustrative.</p>
    </section>
  );
}
