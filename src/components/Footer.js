import React from 'react';
import '../styles/Footer.css';

export default function Footer() {
  return <footer className="footer page-width"><a className="wordmark" href="#intro">su kaplan<span>.</span></a><p className="micro">Built with care &amp; curiosity. © {new Date().getFullYear()}</p><a className="back-top text-link" href="#intro">Back to the beginning <span aria-hidden="true">↑</span></a></footer>;
}
