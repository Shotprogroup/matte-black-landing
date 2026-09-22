# Matte Black Studio — landing page

A static landing page for matteblackstudio.com. The hero is a scroll-driven film: four
AI-rendered scenes of the studio joined into one continuous camera move, scrubbed by scroll
(the `lets-scroll` engine). Below it: services, recent work, process, the studio, FAQ and
contact.

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

- Set the `og:image` and JSON-LD `image` / `url` to the final absolute URLs.
- The nav and footer link to the existing `/wrap`, `/art`, `/shop` and `/contact` pages.
- Excluding `build/` from the deploy keeps the upload small.
