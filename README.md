# Matte Black Studio — landing page

A static landing page for matteblackstudio.com. The hero is a scroll-driven film: four short
clips generated from Joel's own photos of Matt's real studio (arrive/design/install), plus one
still-AI-rendered scene (result — not yet replaced), scrubbed by scroll (the `lets-scroll`
engine). Below it: services, recent work, process, the studio, FAQ and contact.

## Files

- `index.html` — the page. `site.css` — theme + sections. `site.js` — mounts the film and the
  page glue. `scrub-engine.js` — the lets-scroll engine, unmodified.
- `assets/vid/*.mp4` — the film legs (`<name>.mp4` 1080p for desktop, `<name>-m.mp4` 720p for
  phones). `assets/img/scene-*.jpg` — posters. `assets/img/work/` — the studio's own photos.
  `assets/fonts/` — Mont (already used on the current site). `assets/img/wordmark.svg` — the
  three-row MATTE BLACK wordmark from the current site.
- `build/` — prompts, source renders, seam frames, notes. Not needed in production.

## Run locally

```bash
python3 -m http.server 4611
```

Then open http://localhost:4611/. Any static host works in production (Vercel, Netlify,
Cloudflare Pages, S3). The engine loads each clip as a Blob, so the host does not need HTTP
range-request support. Total video weight is roughly 45 MB for desktop and 22 MB for phones,
loaded progressively as the visitor scrolls.

## Before going live

- ~~Set the `og:image` and JSON-LD `image` / `url` to the final absolute URLs.~~ Done —
  `og:image`/`og:url` and the JSON-LD block both point at `https://www.matteblackstudio.com/`.
- The nav and footer link to the existing `/wrap`, `/art`, `/shop` and `/contact` pages.
- Excluding `build/` from the deploy keeps the upload small (`.gitignore` already does this).
- Mobile hero: still centre-cropping the desktop 16:9 film rather than a native 9:16 render.
  Only "result" (still the original AI render) needs a horizontal crop bias on narrow
  viewports (site.css) to keep its subject in frame; the three real-footage scenes are
  centred and don't need one.
- Recent-work photography is Matt's own, pulled from the live matteblackstudio.com/wrap
  gallery (verified against it 2026-09-22) — no stock used.
- Hero footage (2026-09-22 evening): arrive/design/install are real photos of Matt's studio,
  generated as short (2.4–5s) clips and encoded to match the original recipe (native res,
  light unsharp, libx264 crf 20, GOP 8 desktop / 720p GOP 4 mobile, faststart, no audio).
  "result" is still the original AI-rendered Lamborghini scene — not yet replaced. The old
  four AI renders are not deleted from the repo, only from HEAD; `git log -- assets/vid` finds
  them. Seam PSNR between consecutive legs is low (6.5–9dB, see git history for exact numbers)
  because these are genuinely different real photographs, not a continuous AI camera move —
  that comparison from the original build doesn't apply here; the crossfade dissolve (site.js
  `crossfade`) is doing a stylistic transition, not matching frames.
