# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Durable design decisions

- Use the restrained version of concept 2: editorial black/off-white foundation, one acid-lime action color, subtle lavender accents, large condensed typography, tactile pop-up card photography, and generous whitespace.
- Keep the page intentionally uncluttered: no vertical-caption overload, giant decorative background words, nested containers, gradients, rounded dashboard cards, or unnecessary badges.
- Memepedia's Memoteka is a theme and naming reference. Product art remains an original paper-craft interpretation unless rights to a specific source image have been cleared for commercial use.
- Prioritize the 20–35 audience while keeping copy and navigation legible for older shoppers.
- Hero mechanics follow a physical reverse V-fold: DiCaprio stays anchored to the centre spine and folds vertically into the card; never animate the portrait downward or flatten it with a horizontal-axis rotation.
- Use recognizable real memes in the prototype, including the Gatsby/DiCaprio toast as the always-visible hero pop-up, per explicit user direction; keep production rights clearance as a launch risk.
- Keep the Gatsby/DiCaprio hero cutout high-resolution and free of graphic white outlines; dimensional separation should come from a restrained CSS contact shadow, not a baked halo.
- Keep the homepage hero stage clean: the card is unlabelled white Whatman paper floating directly over the page with a natural shadow; no beige container or caption. Do not apply filters to the transparent subject or scroll-linked transforms to its parent because they can expose a rectangular compositing layer in some browsers.
- Keep the homepage hero paper backdrop at 78% of the figure width, and explicitly suppress rectangular box shadows on the transparent subject in hover/focus states.
- The hero card defaults to a 160° opening angle. Scrolling down folds both paper halves and the pop-up subject toward a 38° minimum; scrolling up reopens it to 160°. Reduced-motion users keep the static 160° state.
- Light the hero card from one fixed point above-left: rotating planes must change illumination independently, the right inner face darkens on closure, and contact shadows tighten toward the V-fold without rectangular effects over transparent art.
- Hero folds must have no visible slots, white cutout gaps, or drawn vertical stripes; communicate the hinge through plane geometry and broad light falloff, with subpixel overlap at split layers.
- Map hero closure to the card position in the viewport: keep 160° at the page top and continue smoothly toward a near-closed 2° state until the card bottom exits above the viewport; scrolling upward reverses the same positional curve.
- Keep the cart as a standalone fixed component at the bottom-right of the viewport on desktop and mobile; do not return its primary trigger to the scrolling header.
- On wide screens, vertically align the visual centre of the hero card with the centre of the main headline; keep the mobile one-column card unshifted.
- On desktop, size the hero card to 90% of its figure and scale the pop-up subject proportionally while preserving the shared visual centre with the headline.
