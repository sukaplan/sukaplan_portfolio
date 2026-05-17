import React, { useRef, useEffect } from 'react';
import '../styles/Experience.css';

const jobs = [
  {
    title: 'Senior Software Engineer',
    company: 'Intertech',
    duration: 'Jan 2026 – Present',
    desc: [
      'Leading the modernization of legacy banking systems into microservices using .NET 8 and Domain-Driven Design.',
      'Overseeing architecture decisions for core Securities and Investment modules serving 20M+ customers.',
    ],
  },
  {
    title: 'Expert Software Engineer',
    company: 'Intertech',
    duration: 'Jul 2023 – Jan 2026',
    desc: [
      'Refactored 850+ legacy monolithic methods into modular RESTful APIs with clean architecture, enabling independent service deployment and reducing time-to-production.',
      'Authored 6,000+ unit and integration tests across core financial workflows, raising coverage and building a safety net for high-stakes banking operations.',
    ],
  },
  {
    title: 'Software Engineer',
    company: 'Intertech',
    duration: 'Jan 2022 – Jul 2023',
    desc: [
      'Designed and developed a full-stack asset dashboard using React.js and ASP.NET Core, providing visibility into securities, funds, and pension assets for retail and private banking users.',
      'Designed and led internal technical workshops on the ELK stack (Elasticsearch, Logstash, Kibana), upskilling a cross-functional team in observability and log monitoring.',
    ],
  },
  {
    title: 'Software Engineer Intern',
    company: 'infoTRON',
    duration: 'Summer 2021',
    desc: [
      'Worked with the Department of Simulation and Virtual Reality Technologies.',
      'Performed unit tests on a virtual environment project built in Unity using C#.',
    ],
  },
  {
    title: 'Software Engineer Intern',
    company: 'Karşıyaka Municipality',
    duration: 'Summer 2020',
    desc: [
      'Trained alongside the database administrator working with Oracle Database.',
      'Diagnosed and resolved performance issues in stored functions and triggers.',
    ],
  },
  {
    title: 'Software Engineer Intern',
    company: 'Dokuz Eylül University',
    duration: 'Summer 2019',
    desc: [
      'Built a Smart Home System monitoring temperature, pressure, and an RFID door lock using Arduino Uno and the Ubidots IoT platform.',
    ],
  },
];

export default function JobList() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible'); },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="timeline fade-up" ref={ref}>
      {jobs.map((job, i) => (
        <div className="timeline-item" key={i}>
          <div className="timeline-dot" />
          <div className="timeline-content">
            <div className="timeline-header">
              <span className="timeline-title">{job.title}</span>
              <span className="timeline-company">@ {job.company}</span>
            </div>
            <p className="timeline-date">{job.duration}</p>
            <ul className="timeline-desc">
              {job.desc.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
