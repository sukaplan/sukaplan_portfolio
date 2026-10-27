import { useEffect } from 'react';
import useReducedMotion from '../hooks/useReducedMotion';
import '../styles/Motion.css';

const clamp = value => Math.min(1, Math.max(0, value));

export default function ScrollEffects() {
  const reduced = useReducedMotion();
  useEffect(() => {
    const root = document.documentElement;
    const sections = [...document.querySelectorAll('.section, .contact-section')];
    const stories = [...document.querySelectorAll('.work-story')];
    const projects = [...document.querySelectorAll('.project-row')];
    let frame = 0;
    const update = () => {
      frame = 0;
      const height = window.innerHeight;
      const total = Math.max(1, root.scrollHeight - height);
      root.style.setProperty('--reading-progress', String(clamp(window.scrollY / total)));
      root.style.setProperty('--hero-drift', reduced ? '0px' : `${-Math.min(window.scrollY * .09, 38)}px`);
      sections.forEach(section => {
        const heading = section.querySelector('.section-heading, h2') || section;
        const box = heading.getBoundingClientRect();
        const entry = reduced ? 1 : clamp((height * .75 - box.top) / (height * .5));
        section.style.setProperty('--entry-shift', `${(1 - entry) * 38}px`);
        section.style.setProperty('--entry-progress', String(entry));
      });
      projects.forEach(project => {
        const box = project.getBoundingClientRect();
        const progress = reduced ? 1 : clamp((height * .75 - box.top) / (height * .5));
        project.style.setProperty('--entry-progress', String(progress));
      });
      stories.forEach(story => {
        // Desktop follows the story while its diagram stays beside the text.
        // On mobile the diagram comes after the copy, so measure the diagram itself.
        const desktop = window.innerWidth > 900;
        const target = desktop ? story : story.querySelector('.diagram-flow') || story;
        const box = target.getBoundingClientRect();
        const start = height * (desktop ? .45 : .75);
        const distance = box.height + height * (desktop ? .1 : .4);
        const progress = reduced ? 1 : clamp((start - box.top) / Math.max(1, distance));
        story.style.setProperty('--story-progress', String(progress));
        story.querySelectorAll('.diagram-node').forEach((node, index) => {
          node.classList.toggle('is-current', reduced || progress >= index / 3);
        });
      });
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    // Re-measure after expandable work/training content changes the document height.
    document.addEventListener('toggle', schedule, true);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      document.removeEventListener('toggle', schedule, true);
    };
  }, [reduced]);
  return null;
}
