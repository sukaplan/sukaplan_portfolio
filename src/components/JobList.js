import React from 'react';

const roles = [
  ['Senior Associate II', 'Jan 2026 — Present', 'Leading the Securities & Investment modernization roadmap toward .NET 10 microservices. Defining domain boundaries, reviewing technical designs, and mentoring engineers.'],
  ['Senior Associate I', 'Jul 2023 — Jan 2026', 'Restructuring legacy services into .NET 8 APIs, adding regression tests, and leading ELK workshops on observability and troubleshooting.'],
  ['Software Engineer · Associate I & II', 'Jan 2022 — Jul 2023', 'Shipping AssetDashboard, investment analysis views, and backend services across React, TypeScript and ASP.NET Core.'],
];
const internships = [
  ['OSF Digital', 'Sep 2021 · 1 month', 'Backend Developer Academy: developing ecommerce backend features with Node.js.'],
  ['infoTRON', 'Summer 2021', 'Unit testing a Unity / C# virtual environment in the Simulation and Virtual Reality Technologies department.'],
  ['Karşıyaka Municipality', 'Summer 2020', 'Oracle Database training and resolving performance issues in stored functions and triggers.'],
  ['Dokuz Eylül University', 'Summer 2019', 'A smart home system with Arduino Uno and Ubidots: temperature, pressure and RFID access.'],
];
export default function JobList() {
  return (
    <div className="career-grid">
      <div className="career-company"><h3>Intertech</h3><p>Jan 2022 — Present</p><p className="career-company-note">DenizBank subsidiary<br />Securities &amp; Investment · Istanbul</p></div>
      <ol className="career-roles">{roles.map(([title, date, description]) => <li key={title}><div className="role-heading"><h4>{title}</h4><p className="micro">{date}</p></div><p>{description}</p></li>)}</ol>
      <div className="career-early-label"><p className="eyebrow">Earlier chapters</p><p>Learning by building</p></div>
      <div className="internships"><article><div className="role-heading"><h4>B.Sc. Computer Engineering</h4><p className="micro">2016 — 2021</p></div><p>Dokuz Eylül University · Izmir</p></article><details className="early-details"><summary>Training &amp; internships <span aria-hidden="true">+</span></summary><div>{internships.map(([company, date, description]) => <article key={company}><div className="role-heading"><h4>{company}</h4><p className="micro">{date}</p></div><p>{description}</p></article>)}</div></details></div>
    </div>
  );
}
