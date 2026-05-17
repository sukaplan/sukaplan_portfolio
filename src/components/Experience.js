import React, { useRef, useEffect } from 'react';
import JobList from './JobList';

const Experience = () => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible'); },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="experience" className="section fade-up" ref={ref}>
      <div className="section-label">Experience</div>
      <h2 className="section-heading">Where I've worked</h2>
      <JobList />
    </section>
  );
};

export default Experience;
