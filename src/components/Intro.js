import React, { useRef, useEffect } from 'react';
import { TypeAnimation } from 'react-type-animation';
import MailIcon from '@mui/icons-material/Mail';
import GitHubIcon from '@mui/icons-material/GitHub';
import '../styles/Intro.css';

const Intro = () => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const timer = setTimeout(() => el.classList.add('visible'), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="intro" className="hero fade-up" ref={ref}>
      {/* ── Left: text content ── */}
      <div className="hero-left">
        <div className="hero-greeting">
          <TypeAnimation
            sequence={[
              'Hello', 1200,
              'Hola', 1200,
              'Merhaba', 1200,
              'Hallo', 1200,
              'Bonjour', 1200,
              'Ciao', 1200,
              'Привет', 1200,
              'こんにちは', 1200,
              '你好', 1200,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            className="greeting-text"
          />
        </div>

        <h1 className="hero-name">Su Kaplan</h1>
        <h2 className="hero-role">Senior Software Engineer.</h2>

        <p className="hero-bio">
          I build and modernize large-scale banking systems in the fintech space.
          4.5 years delivering .NET 8 microservices, Domain-Driven Design,
          and React.js frontends — for a platform serving 20M+ customers.
        </p>

        <div className="hero-actions">
          <a href="mailto:suukaplan@outlook.com" className="btn-primary">
            <MailIcon style={{ fontSize: 18 }} />
            Get in touch
          </a>
          <a
            href="https://github.com/sukaplan"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            <GitHubIcon style={{ fontSize: 18 }} />
            GitHub
          </a>
        </div>

        <div className="hero-scroll-hint" aria-hidden="true">
          <span />
        </div>
      </div>

      {/* ── Right: decorative visual ── */}
      <div className="hero-visual" aria-hidden="true">
        <div className="hero-orb-wrap">
          <div className="hero-ring hero-ring--outer">
            <span className="ring-dot" />
          </div>
          <div className="hero-ring hero-ring--inner" />
          <div className="hero-orb">
            <span className="hero-monogram">SK</span>
          </div>

          <span className="hero-chip chip-1">.NET 8</span>
          <span className="hero-chip chip-2">React.js</span>
          <span className="hero-chip chip-3">Azure</span>
          <span className="hero-chip chip-4">DDD</span>
        </div>
      </div>
    </section>
  );
};

export default Intro;
