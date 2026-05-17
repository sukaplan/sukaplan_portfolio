import React, { useRef, useEffect } from 'react';
import MailIcon from '@mui/icons-material/Mail';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import '../styles/Contact.css';

export default function Contact() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible'); },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="contact" className="section contact-section fade-up" ref={ref}>
      <div className="section-label">Contact</div>
      <h2 className="contact-heading">Let's build something.</h2>
      <p className="contact-sub">
        I'm always open to interesting conversations, new opportunities,
        or just a good chat. My inbox is open — reach out any time.
      </p>

      <a href="mailto:suukaplan@outlook.com" className="btn-primary contact-btn">
        <MailIcon style={{ fontSize: 18 }} />
        Say hello
      </a>

      <div className="contact-links">
        <a href="https://github.com/sukaplan" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <GitHubIcon style={{ fontSize: 26 }} />
        </a>
        <a href="https://www.linkedin.com/in/su-kaplan/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <LinkedInIcon style={{ fontSize: 26 }} />
        </a>
        <a href="mailto:suukaplan@outlook.com" aria-label="Email">
          <MailIcon style={{ fontSize: 26 }} />
        </a>
      </div>
    </section>
  );
}
