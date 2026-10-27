import React from 'react';

export default function SectionHeading({ number, label, title, id, children }) {
  return <div className="section-heading"><p className="eyebrow"><span>{number}</span> / {label}</p><div className="section-heading-row"><h2 id={id}>{title}</h2>{children && <p className="section-note">{children}</p>}</div></div>;
}
