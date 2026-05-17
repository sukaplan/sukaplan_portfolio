import React from 'react';
import '../styles/Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      Designed &amp; built by Su Kaplan · {new Date().getFullYear()}
    </footer>
  );
}
