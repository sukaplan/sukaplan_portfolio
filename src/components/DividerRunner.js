import React, { useCallback, useEffect, useRef, useState } from 'react';
import { advanceRunner, createRunner, jumpRunner, PLAYER_X } from '../game/runner';
import '../styles/DividerRunner.css';

function readBest() {
  try { return Math.max(0, Number(window.localStorage.getItem('su-runner-best')) || 0); }
  catch { return 0; }
}

function Dinosaur({ running, stride }) {
  return <svg viewBox="0 0 64 54" aria-hidden="true" className="runner-dinosaur">
    <path d="M8 34 3 21l13 9 9-3 6-11V7l5-3h18l6 5v9H44l-3 7 7 1v5l-10-2-6 11-12 2Z" />
    <path className="pencil-echo" d="m9 35-5-12 12 8 10-3 6-12V8l5-3h17l5 5v7H43l-4 8" />
    <path d={running && stride ? 'm23 40-4 8h8m7-10 4 9h7' : 'm23 40 2 9h8m1-11-3 8h7'} />
    <path d="M46 11h1m-3 10 11 1M13 33l8 2" />
  </svg>;
}

const messages = {
  idle: 'A tiny detour. Space or tap the dinosaur to run.',
  running: 'Space / tap to jump · Esc to rest',
  paused: 'Taking a breath. Space / tap to continue.',
  over: 'A little stumble. Space / tap to try again.',
};

export default function DividerRunner() {
  const track = useRef(null);
  const visible = useRef(false);
  const model = useRef(null);
  if (!model.current) model.current = createRunner(800, readBest());
  const [scene, setScene] = useState(model.current);
  const commit = useCallback(next => { model.current = next; setScene(next); }, []);
  const pause = useCallback(() => {
    if (model.current.status === 'running') commit({ ...model.current, status: 'paused' });
  }, [commit]);
  const play = useCallback(() => {
    if (document.hidden || !visible.current) return;
    commit(jumpRunner(model.current));
  }, [commit]);

  useEffect(() => {
    const measure = () => {
      const box = track.current.getBoundingClientRect();
      visible.current = box.height > 0 && box.top >= -8 && box.bottom <= window.innerHeight + 8 && !document.hidden;
      const width = Math.max(160, box.width || 800);
      if (width !== model.current.width) model.current = { ...model.current, width };
      if (!visible.current) pause();
    };
    const onKey = event => {
      if (event.defaultPrevented || event.ctrlKey || event.metaKey || event.altKey) return;
      if (event.target instanceof Element && event.target.closest('button, a, input, textarea, select, summary, [contenteditable="true"], [role="textbox"]')) return;
      if (!visible.current) return;
      if (event.code === 'Space' || event.key === ' ') {
        event.preventDefault();
        if (!event.repeat) play();
      }
      if (event.key === 'Escape' && model.current.status === 'running') { event.preventDefault(); pause(); }
    };
    measure();
    window.addEventListener('scroll', measure, { passive: true });
    window.addEventListener('resize', measure);
    window.addEventListener('keydown', onKey);
    window.addEventListener('blur', pause);
    document.addEventListener('visibilitychange', measure);
    return () => {
      window.removeEventListener('scroll', measure);
      window.removeEventListener('resize', measure);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('blur', pause);
      document.removeEventListener('visibilitychange', measure);
    };
  }, [pause, play]);

  useEffect(() => {
    if (scene.status !== 'running') return undefined;
    let frame;
    let previous;
    const tick = timestamp => {
      if (model.current.status !== 'running') return;
      if (previous !== undefined) {
        const next = advanceRunner(model.current, (timestamp - previous) / 1000);
        commit(next);
        if (next.status === 'over') {
          try { window.localStorage.setItem('su-runner-best', String(next.best)); } catch { /* A score need not be saved to play. */ }
          return;
        }
      }
      previous = timestamp;
      frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [scene.status, commit]);

  const label = scene.status === 'running' ? 'Jump dinosaur' : scene.status === 'paused' ? 'Resume dinosaur game' : scene.status === 'over' ? 'Restart dinosaur game' : 'Start dinosaur game';
  return (
    <div className="divider-runner page-width" role="group" aria-label="Tiny dinosaur jumping game">
      <div className="runner-track" ref={track}>
        <p className="runner-caption micro" id="runner-instructions">{messages[scene.status]}</p>
        <span className="runner-score micro" aria-label={`Score ${scene.score}, best ${Math.max(scene.best, scene.score)}`}>{String(scene.score).padStart(3, '0')}<span> / best {String(Math.max(scene.best, scene.score)).padStart(3, '0')}</span></span>
        <button className="runner-player" type="button" style={{ left: PLAYER_X, transform: `translateY(${-scene.y}px)` }} onClick={play} aria-label={label} aria-describedby="runner-instructions">
          <Dinosaur running={scene.status === 'running' && scene.y === 0} stride={Math.floor(scene.distance / 13) % 2} />
        </button>
        <div className="runner-obstacles" aria-hidden="true">{scene.obstacles.map(obstacle => <svg className="runner-obstacle" key={obstacle.id} viewBox="0 0 24 30" preserveAspectRatio="none" style={{ width: obstacle.width, height: obstacle.height, transform: `translateX(${obstacle.x}px)` }}>
          <path d={obstacle.type === 'rock' ? 'M2 28 5 13l9-8 7 12 1 11ZM6 23l5-7 4 4' : 'M10 29V5q0-5 4-3v27M10 19H4V9m10 14h7V12'} />
        </svg>)}</div>
      </div>
      <p className="sr-only" role="status">{scene.status === 'over' ? `Run finished. Score ${scene.score}. Press Space or tap the dinosaur to try again.` : scene.status === 'paused' ? 'Game paused.' : ''}</p>
    </div>
  );
}
