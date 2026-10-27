import React from 'react';
import JobList from './JobList';
import SectionHeading from './SectionHeading';
import '../styles/Experience.css';

export default function Experience() {
  return <section id="experience" className="section page-width" aria-labelledby="experience-title"><SectionHeading number="03" label="Experience" title={<>Growing with the <em>work.</em></>} id="experience-title" /><JobList /></section>;
}
