// Package the production app as a local, self-contained review page.
// The deployable build stays unchanged in build/.
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const build = path.join(root, 'build');
const manifest = JSON.parse(fs.readFileSync(path.join(build, 'asset-manifest.json'), 'utf8'));
let html = fs.readFileSync(path.join(build, 'index.html'), 'utf8');
html = html.replace(/<script\b[^>]*src="[^"]*"[^>]*><\/script>/g, '');
html = html.replace(/<link\b[^>]*(?:rel="(?:stylesheet|manifest|icon)")[^>]*>/g, '');
const icon = fs.readFileSync(path.join(root, 'public/favicon.svg')).toString('base64');
html = html.replace('</head>', `<link rel="icon" type="image/svg+xml" href="data:image/svg+xml;base64,${icon}"></head>`);
for (const entry of manifest.entrypoints) {
  const source = fs.readFileSync(path.join(build, entry), 'utf8');
  if (entry.endsWith('.css')) html = html.replace('</head>', `<style>${source}</style></head>`);
  if (entry.endsWith('.js')) {
    const script = source.replace(/\/\/# sourceMappingURL=.*$/gm, '').replace(/<\/script/gi, '<\\/script');
    html = html.replace('</body>', () => `<script>${script}</script></body>`);
  }
}
const output = path.join(root, '.preview');
fs.mkdirSync(output, { recursive: true });
fs.writeFileSync(path.join(output, 'index.html'), html);
console.log(`Local preview: ${path.join(output, 'index.html')}`);
