# Design QA

- Source visual truth: `reference-video/frame-03.png` (physical Gatsby toast pop-up from the user-provided reference) and `https://www.paperpaul.com/pop-up-book-of-memes/` for the paper-engineering direction.
- Implementation screenshot: `implementation-hero-open.png`.
- Side-by-side evidence: `qa-hero-comparison.png`.
- Viewport: 1440 × 1000 CSS px, deviceScaleFactor 1, desktop, hero open.
- Source pixels: 873 × 491. Implementation pixels: 1440 × 1000. Comparison sheet: 1200 × 500; both sources normalized into adjacent 600 px panels.

## Findings

No actionable P0/P1/P2 differences remain. The implementation uses the requested recognizable DiCaprio toast image, preserves the black bokeh panels and centered lower fold, and presents the die-cut subject upright on initial view. The surrounding editorial page intentionally remains the established БУМБУМАГА visual system rather than copying PaperPaul's site chrome.

## Required fidelity surfaces

- Typography: existing condensed headline and Manrope UI hierarchy remain unchanged and legible.
- Spacing/layout: hero copy and pop-up retain separate columns; the raised subject stays inside the visual stage without clipping.
- Colors/tokens: black/off-white foundation and acid-lime CTA remain intact; the meme's dark bokeh panel supplies the intended contrast.
- Image quality: existing transparent Gatsby subject and separate background plate render sharply with no rectangular crop or transparency halo visible at the tested viewport.
- Copy/content: caption now names the DiCaprio pop-up behavior; catalog continues to show recognizable real memes.

## Comparison history

- Earlier P1: the first revision substituted an original cat character and abstract paper background, which did not satisfy the user's requirement for real memes and DiCaprio.
- Fix: restored `hero-gatsby-background.png` and `hero-gatsby-subject.png`, kept the hero in its open state by default, and removed the substitute assets.
- Post-fix evidence: `qa-hero-comparison.png` and `implementation-hero-open.png` show the requested Gatsby toast subject and physical pop-up composition.

## Verification

- Browser smoke: passed; filtering, card opening, cart, quantity, drawer, and subscription flow work.
- Console errors: 0.
- Build: `npm.cmd run build` passed.
- Sites tests: 4/4 passed.
- Focused region comparison: not needed beyond the side-by-side hero sheet because the requested change is a single large hero subject with clearly visible silhouette, fold, crop, and background plate.

## Follow-up polish

No blocking polish remains. Production publication or sale still requires confirming rights for third-party meme imagery and recognizable people.

## Gatsby retouch iteration

- Before: `public/assets/hero-gatsby-subject.png`, 512 × 512, visible white sticker outline and limited facial/glass detail.
- After: `public/assets/hero-gatsby-subject-retouched.png`, 1254 × 1254 RGBA, transparent corners, no graphic outline, clean natural silhouette.
- Comparison evidence: `qa-gatsby-retouch-comparison.png` shows the original asset, restored asset, and browser-rendered hero in one view.
- Shadow: replaced the single dark `drop-shadow(0 18px 10px #0008)` with a restrained two-layer CSS shadow: a soft 14 px dimensional shadow and a short 3 px contact shadow.
- Browser evidence: `implementation-hero-open.png`, 1440 × 1000, deviceScaleFactor 1. No visible halo, edge clipping, or heavy shadow around the head and shoulders.
- Verification: build passed, Sites tests 4/4 passed, browser smoke passed, console errors 0.
## Hero stage cleanup iteration

- User target: remove the beige presentation container and caption; treat the card as clean white Whatman paper with only a natural shadow and a slight scroll-linked turn.
- Implementation: `src/popup.css` now makes the hero stage transparent, uses a white paper surface with washed-back texture, removes the border, and applies two restrained card shadows.
- Copy cleanup: the hero `figcaption` was removed from `src/App.jsx`.
- Motion: the experimental scroll-linked parent transform was removed after it exposed a rectangular compositing surface in the user browser; the stable hero now remains static.
- Comparison evidence: `qa-hero-stage-clean-comparison.png` shows the previous hero and cleaned browser render side by side.
- Browser evidence: `implementation-hero-open.png`, 1440 × 1000, deviceScaleFactor 1. No beige stage, caption, border, clipping, or shadow halo remains.
- Visual verdict: 96/100, pass.
- Verification: build passed, Sites tests 4/4 passed, browser smoke passed, console errors 0.
## Cross-browser compositing correction

- User evidence: screenshot in the conversation showed a white rectangle matching the transparent subject canvas inside the main paper card.
- Initial hypothesis: filtered transparent PNG plus `animation-timeline:view()`; removing both was a safe compatibility cleanup but did not fully resolve the user-visible hover defect.
- Fix: removed all CSS filters from `.hero-subject`, removed the parent scroll-timeline transform and keyframes, and retained shadow only on `.hero-backdrop`.
- Browser evidence: `implementation-hero-open.png`, 1440 × 1000, shows one paper sheet with no nested rectangle or subject-canvas backing.
- Visual verdict history: 62/100 revise before the fix; 95/100 pass after the fix.
- Verification: build passed, Sites tests 4/4 passed, browser smoke passed, console errors 0.
## Narrow-card hover correction

- User evidence: the second screenshot confirmed the rectangle appeared while hovering and requested a narrower card.
- Final root cause: the global `.hero figure:hover img` rule applied a rectangular `box-shadow` to the transparent subject image element, exposing its canvas bounds.
- Fix: `.hero-subject` now explicitly uses `box-shadow:none` in open, hover, and focus states.
- Proportion fix: `.hero-backdrop` width reduced from 88% to 78%; height remains 78% so the paper reads as a more compact physical card.
- Browser evidence: `implementation-hero-open.png` captures the hover state at 1440 × 1000 with one card, no inner rectangle, and no clipping.
- Visual verdict history: 68/100 revise before the specificity fix; 96/100 pass afterward.
- Verification: build passed, Sites tests 4/4 passed, browser smoke passed, console errors 0.
## Scroll-driven two-panel card

- Structure: new `src/HeroPopup.jsx` renders separate left and right Whatman-paper panels around a shared vertical hinge plus an independently folding pop-up subject.
- Default state: 160° opening angle, represented as 10° of inward rotation on each half.
- Scroll behavior: downward scroll reduces the angle to a 38° minimum; upward scroll restores it to 160°. The response is requestAnimationFrame-throttled and passive.
- Subject behavior: the DiCaprio cutout rotates toward 88°, stays anchored at the lower fold, scales down, and fades into the pages as the card closes.
- Accessibility: users with `prefers-reduced-motion: reduce` keep the static 160° state.
- Browser evidence: `implementation-hero-open.png` and `implementation-hero-folded.png`.
- Combined comparison: `qa-hero-scroll-fold-comparison.png`.
- Browser assertion: 160° initial → 38° after downward scroll → 160° after upward scroll.
- Visual verdict history: 82/100 revise when the folded subject protruded below the card; 95/100 pass after fixing the hinge and opacity mapping.
- Verification: production build passed, Sites tests 4/4 passed, browser smoke passed, console errors 0.
final result: passed