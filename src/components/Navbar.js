import React, { useState, useEffect } from 'react';
import '../styles/Navbar.css';

const links = [
  { label: 'About', id: 'about' },
  { label: 'Experience', id: 'experience' },
  { label: 'Contact', id: 'contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <button
        className="navbar-logo"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
      >
        su<span className="logo-dot">.</span>
      </button>

      <div className="navbar-links">
        {links.map(({ label, id }) => (
          <button key={id} onClick={() => scrollTo(id)}>
            {label}
          </button>
        ))}
        <a
          href="https://www.linkedin.com/in/su-kaplan/"
          target="_blank"
          rel="noopener noreferrer"
          className="navbar-cta"
        >
          LinkedIn ↗
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
