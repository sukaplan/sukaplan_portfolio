import React from 'react';
import SectionHeading from './SectionHeading';
import '../styles/About.css';

export default function About() {
  return (
    <section id="about" className="section page-width" aria-labelledby="about-title">
      <SectionHeading number="04" label="A little about me" title={<>Curiosity is the <em>constant.</em></>} id="about-title" />
      <div className="about-grid">
        <div><p className="about-pullquote">I like making<br />complicated things<br /><em>make sense.</em></p><p className="about-location micro">Berlin, Germany / Open to conversation</p></div>
        <div className="about-copy"><p>I’m a senior fullstack engineer based in Berlin. My work has centered on financial software for DenizBank through Intertech, especially funds, securities and investment products.</p><p>I enjoy breaking down complex problems, talking through the tradeoffs with teammates, and turning business needs into working software. That can mean a React interface, a domain model, or the test that makes a difficult refactor possible.</p><p>Learning languages is another way I stay curious. I speak Turkish and English, and I’m studying German. Away from code, there’s usually a film on my watchlist.</p><dl className="practice-list"><div><dt>Backend</dt><dd>C# · .NET · DDD · SQL · RabbitMQ</dd></div><div><dt>Frontend</dt><dd>React · Next.js · TypeScript</dd></div><div><dt>Delivery</dt><dd>Azure · AWS / S3 · Docker · Kubernetes</dd></div><div><dt>Quality</dt><dd>xUnit · NUnit · ELK · CI/CD</dd></div></dl><p className="about-certification">Microsoft Certified: Azure Fundamentals · 2021</p></div>
      </div>
    </section>
  );
}
