# Su Kaplan — Portfolio

A React portfolio built around the Living Diagram direction: a neutral off-white default (#F5F4F2), an optional black-blue theme (#090F1C), blue highlights, expressive typography, and small explanatory diagrams. There are no gradients, project cards, external font requests or 3D assets. In dark mode, the #7C9ED9 highlight has 7.07:1 contrast against the background; light mode uses a darker blue for readable text.

## Development

Use Node 24 (`nvm use`), then:

```sh
npm ci
npm start
```

The development preview opens at http://localhost:3000. Set `PORT=3001` if that port is already in use.

## Validation and production

```sh
npm run test:ci
npm run build
```

The production site is written to `build/`. The tests cover section navigation, complete work stories, diagram controls, greeting rotation, diagram timing, reduced motion, and contact destinations. The existing React Testing Library version emits an `act` deprecation warning under React 18.3; assertions pass.

## Preview without a server

```sh
npm run preview:build
```

Open `.preview/index.html` in a normal browser. This self-contained review page embeds the production JavaScript, styles and favicon; it does not publish the site. Regenerate it after making changes. The deployable `build/` is unchanged.

## Content and interaction

- `src/components/Intro.js`: introduction and current location.
- `src/components/Greeting.js`: rotating multilingual greeting. It stays static when reduced motion is enabled and does not repeatedly announce changes to screen readers.
- `src/components/LivingDiagram.js`: keyboard-accessible stages explaining the approach to software.
- `src/components/SelectedWork.js`: three case studies, additional work, and carefully attributed results.
- `src/components/SystemDiagram.js`: explicitly illustrative system studies, not production architecture.
- `src/components/Projects.js`: personal projects and the public basketball application link.
- `src/components/JobList.js`: career progression, education and expandable earlier training/internships.
- `src/components/About.js` and `Contact.js`: biography, tools and contact links.
- `src/index.css`, `src/App.css` and `src/styles/`: visual system and responsive styles.

Current career and project content was updated from the supplied CV. Earlier internships and personal interests retain the original portfolio’s information. The CV itself and its phone number are not included in the public assets. The fund-service response time reduction remains explicitly estimated, and 20M+ customers describes the wider banking systems rather than individual reach.

All local navigation uses native anchor links. Interactions respect reduced motion. The page uses the existing Create React App setup; no framework migration or publishing step is included.

## Light switch and scrolling

The pull cord in the upper-right navigation toggles between dark blue and neutral off-white, defaults to neutral off-white and remembers explicit choices locally, and supports keyboard activation. Light mode uses a darker blue for readable highlighted text. A small startup script restores the saved theme before the app paints.

Scroll-linked headings, reading progress, desktop diagram positioning, and progressive case-study connections use one animation-frame callback per scroll frame. Reduced motion removes positional movement and shows completed diagram connections. Expandable sections trigger a progress recalculation.

The opening diagram automatically cycles through three steps at three-second intervals, starting with the first step on load. Its points remain clickable; reduced motion keeps the diagram static. The pull cord extends 240px on desktop and 180px on mobile. Chapter heading movement runs from 75% to 25% of viewport height. Case-study connections follow the visible story on desktop and the diagram itself on mobile, so they do not finish before the diagram appears.

## Divider dinosaur

The divider after the opening is a small, self-contained jumping game. Click/tap the dinosaur or press Space while its track is visible to start and jump. Esc pauses; Space or a tap resumes or restarts after a collision. The score and local best appear above the line. It starts only on request and pauses when scrolled away, when the tab is hidden, or when the window loses focus. Inputs, links, buttons and other interactive controls retain their own Space behavior. No assets or game library are loaded; the pencil-style character and obstacles use small inline vectors. The 94px play strip (102px on mobile) contains the full jump and every obstacle, preserving the surrounding layout. Physics, collisions, frame-rate consistency, restart, offscreen pausing and keyboard behavior have automated coverage.

## Interactive toolkit and private visitor analytics

The toolkit directly below the dinosaur divider includes keyboard-accessible discipline tabs that connect tools to their use in actual work. The Azure Fundamentals certificate year is 2023. Current-location references are omitted from the introduction, biography and search description.

Vercel Web Analytics provides pageview counts, estimated visitors and country breakdowns in the authenticated Vercel project dashboard. There is no public counter, reporting endpoint, or analytics interface on the portfolio. Enable **Web Analytics** under **Analytics** in the Vercel project, then deploy the updated branch. Keep dashboard access limited to your account/project members; do not enable public sharing.

The client loads Vercel’s same-origin `/_vercel/insights/script.js` collector on deployed HTTPS pages only, with no additional SDK dependency. It skips local/offline previews, development, Do Not Track and Global Privacy Control. Only pageviews are sent; query strings and URL fragments are removed before sending. The project does not implement raw IP logging, visitor names, or CV download tracking. Location/counts are estimates and can be affected by privacy settings, VPNs and blockers.

Reports: https://vercel.com/sukaplans-projects/sukaplan-portfolio-di48/analytics

Setup documentation: https://vercel.com/docs/analytics/quickstart
Privacy: https://vercel.com/docs/analytics/privacy-policy
