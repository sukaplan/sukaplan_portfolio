export const PLAYER_X = 16;
const GRAVITY = 1900;
const JUMP_SPEED = 410;

export function createRunner(width = 800, best = 0) {
  return { width, best, status: 'idle', y: 0, velocity: 0, distance: 0, score: 0, obstacles: [], spawnIn: 0, nextId: 0 };
}

export function jumpRunner(game) {
  if (game.status !== 'running') {
    if (game.status === 'paused') return { ...game, status: 'running' };
    return { ...createRunner(game.width, game.best), status: 'running', velocity: JUMP_SPEED };
  }
  return game.y === 0 ? { ...game, velocity: JUMP_SPEED } : game;
}

// Integrate in small steps so collisions behave consistently across frame rates.
export function advanceRunner(game, seconds, random = Math.random) {
  if (game.status !== 'running') return game;
  let next = { ...game, obstacles: game.obstacles.map(obstacle => ({ ...obstacle })) };
  let remaining = Math.min(seconds, .1);
  while (remaining > 0 && next.status === 'running') {
    const dt = Math.min(remaining, 1 / 120);
    remaining -= dt;
    const baseSpeed = Math.max(200, next.width / 2.7);
    const speed = Math.min(baseSpeed * 1.5, baseSpeed + next.distance / 100);
    next.y = Math.max(0, next.y + next.velocity * dt - GRAVITY * dt * dt / 2);
    next.velocity = next.y > 0 ? next.velocity - GRAVITY * dt : 0;
    next.distance += speed * dt;
    next.score = Math.floor(next.distance / 20);
    next.spawnIn -= dt;
    if (next.spawnIn <= 0) {
      const rock = random() < .35;
      next.obstacles.push({ id: next.nextId++, x: next.width + 12, width: rock ? 20 : 13, height: rock ? 14 : 22, type: rock ? 'rock' : 'cactus' });
      next.spawnIn = 1.25 + random() * .8;
    }
    next.obstacles = next.obstacles.filter(obstacle => {
      obstacle.x -= speed * dt;
      return obstacle.x + obstacle.width > -5;
    });
    const hit = next.obstacles.some(obstacle =>
      obstacle.x < PLAYER_X + 34 && obstacle.x + obstacle.width > PLAYER_X + 11 && next.y + 5 < obstacle.height
    );
    if (hit) {
      next.status = 'over';
      next.best = Math.max(next.best, next.score);
    }
  }
  return next;
}
