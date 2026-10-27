import { advanceRunner, createRunner, jumpRunner, PLAYER_X } from './runner';

test('idle is still, and starting launches a single jump', () => {
  const idle = createRunner(500);
  expect(advanceRunner(idle, .05)).toBe(idle);
  const airborne = advanceRunner(jumpRunner(idle), .05, () => .5);
  expect(airborne.y).toBeGreaterThan(0);
  expect(airborne.obstacles[0].x).toBeGreaterThan(490);
  expect(jumpRunner(airborne)).toBe(airborne);
});

test('ground collisions end a run while jumping clears an obstacle', () => {
  const obstacle = { id: 0, x: PLAYER_X + 15, width: 13, height: 22 };
  const game = { ...createRunner(500, 2), status: 'running', distance: 200, obstacles: [obstacle], spawnIn: 2 };
  const hit = advanceRunner(game, .01);
  expect(hit.status).toBe('over');
  expect(hit.best).toBeGreaterThanOrEqual(10);
  expect(advanceRunner({ ...game, y: 30 }, .01).status).toBe('running');
  const restart = jumpRunner(hit);
  expect(restart.status).toBe('running');
  expect(restart.score).toBe(0);
  expect(restart.best).toBe(hit.best);
});

test('equivalent elapsed time behaves consistently across frame rates', () => {
  const run = fps => {
    let game = jumpRunner(createRunner(2000));
    for (let i = 0; i < fps; i++) game = advanceRunner(game, 1 / fps, () => .5);
    return game;
  };
  const slow = run(30), fast = run(120);
  expect(slow.distance).toBeCloseTo(fast.distance, 1);
  expect(slow.y).toBe(0);
  expect(fast.y).toBe(0);
  expect(slow.score).toBe(fast.score);
});

test('pausing freezes the run and resuming preserves its score', () => {
  const paused = { ...createRunner(500), status: 'paused', distance: 400, score: 20 };
  expect(advanceRunner(paused, .05)).toBe(paused);
  expect(jumpRunner(paused)).toMatchObject({ status: 'running', distance: 400, score: 20 });
});
