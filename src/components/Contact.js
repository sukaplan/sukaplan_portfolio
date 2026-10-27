import React from 'react';
import '../styles/Contact.css';

export default function Contact() {
  return (
    <section id="contact" className="contact-section page-width" aria-labelledby="contact-title">
      <p className="eyebrow"><span>05</span> / Contact</p>
      <div className="contact-grid"><div><h2 id="contact-title">Let’s make<br /><em>something matter.</em></h2><p className="contact-intro">A role, a project, or an interesting problem.<br />I’d love to hear what you have in mind.</p></div>
        <div className="contact-links">
          <a href="mailto:suukaplan@outlook.com"><span className="micro">01 / Email</span><span className="contact-destination">suukaplan@outlook.com</span><span aria-hidden="true">↗</span></a>
          <a href="https://www.linkedin.com/in/su-kaplan/" target="_blank" rel="noopener noreferrer"><span className="micro">02 / LinkedIn</span><span className="contact-destination">Let’s connect</span><span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a>
          <a href="https://github.com/sukaplan" target="_blank" rel="noopener noreferrer"><span className="micro">03 / GitHub</span><span className="contact-destination">A look at the code</span><span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a>
        </div>
      </div>
    </section>
  );
}
