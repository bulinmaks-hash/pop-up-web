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
