# Design QA

- Reference: user-supplied physical meme pop-up cards.
- Evidence: implementation-closed.png and implementation-hover-{cat,penguin,musya}.png at 1440 x 1000.
- Preview: http://127.0.0.1:4173/

## Visual findings

- The rectangular foreground crops are gone. Each moving layer is now a transparent die-cut silhouette.
- Each card uses a separate clean background plate, so the subject is not duplicated behind the pop-up.
- The white craft-paper cover and the unfolded spread remain centered in their respective states.
- The cover opens first, then the silhouette rotates from a folded 78-degree position to upright.
- The inside print is one seamless layer with no artificial vertical image stripe.
- Winky, the lone penguin, and the Musya tiger have product-specific silhouette dimensions.
- Hover is limited to fine pointers; click/tap still toggles the open state and reduced-motion remains supported.

## Verification

- Browser smoke: passed, including card aria-expanded state and zero browser errors.
- Build: npm.cmd run build passed.
- Sites tests: 4/4 passed.
- All six generated assets returned HTTP 200.
- Transparent PNG corners were verified at alpha 0.

## Main-page Gatsby reference

- Source captured from the user-provided 45-second YouTube video: reference-video/frame-00.png through frame-08.png.
- The reference mechanism uses a centered lower hinge: the portrait and raised coupe move as one die-cut while the white cover clears first.
- Closed implementation evidence: implementation-hero-closed.png. The cover is centered, blank, and uses the existing white craft-paper texture.
- Open implementation evidence: implementation-hero-open.png. The original transparent Gatsby toast meme rises from 82 degrees to upright over a separate dark bokeh print.
- The open spread remains centered, the glass stays inside the paper silhouette, and no rectangular crop is visible.

## Remaining risk

Commercial printing or sale of third-party meme imagery and recognizable characters requires rights clearance.

final result: passed
