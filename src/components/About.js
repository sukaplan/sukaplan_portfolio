import React, { useRef, useEffect } from 'react';
import '../styles/About.css';

const skills = {
  Languages:        ['C#', 'TypeScript', 'JavaScript', 'Python', 'Java', 'Go'],
  'Backend & Arch': ['.NET 8', 'ASP.NET Core', 'Microservices', 'DDD', 'REST APIs', 'EF Core'],
  Frontend:         ['React.js', 'TypeScript', 'RESTful API Integration'],
  'Cloud & DevOps': ['Azure', 'Docker', 'Kubernetes', 'CI/CD', 'Azure DevOps', 'Git'],
  'Observability':  ['ELK Stack', 'Elasticsearch', 'Kibana', 'Logstash'],
  'Testing & Data': ['xUnit', 'NUnit', 'SQL', 'Agile / Scrum'],
};

const About = () => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible'); },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="section fade-up" ref={ref}>
      <div className="section-label">About Me</div>
      <h2 className="section-heading">Who I am</h2>

      <div className="about-body">
        <div className="about-text">
          <p>
            Hey! I'm <strong>Su</strong>, a Senior Software Engineer with 4.5 years of
            experience in fintech, building and modernizing large-scale banking systems
            at <strong>Intertech</strong> — a platform serving 20M+ customers. My core
            focus is .NET 8 microservices with Domain-Driven Design, but I'm equally
            comfortable on the React.js frontend or deep in cloud infrastructure on Azure.
          </p>
          <p>
            Highlights include refactoring 850+ legacy monolithic methods into clean
            RESTful APIs and authoring a 6,000+ test suite that safeguards critical
            financial workflows. Outside of code, I love watching films, learning
            languages, and anything that pushes me to grow.
          </p>
        </div>

        <div className="about-skills">
          {Object.entries(skills).map(([category, items]) => (
            <div className="skill-category" key={category}>
              <p className="skill-category-name">{category}</p>
              <div className="skill-pills">
                {items.map(skill => (
                  <span className="skill-pill" key={skill}>{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
