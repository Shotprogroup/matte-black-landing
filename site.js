/* Matte Black Studio — page glue around the lets-scroll engine.
   Mounts the scroll-scrubbed film, then: adds the extra topbar link, fades the
   landing wordmark marquee with scroll, and hands the chrome over to the page
   sections once the film has played out. */
(function () {
  const world = document.getElementById('world');
  if (!world || typeof mountLetsScroll !== 'function') return;

  const V = 'assets/vid/', I = 'assets/img/';
  mountLetsScroll(world, {
    brand: { name: 'Matte Black', href: '#top' },
    cta: { label: 'Free Quote', href: '#contact' },
    hint: 'scroll',
    nav: true,
    atmosphere: false,
    diveScroll: 1.4,
    connScroll: 0.9,
    // Was 0.08 (narrower than the engine's own 0.12 default). Joel flagged a
    // few uncanny frames specifically on the arrive->design join. The true
    // seam (leg1's actual last frame vs leg2's first) measured fine in
    // BUILD-NOTES.md (37.7dB, in line with the other three joins at
    // 37-38dB) — leg1's ending only drifted from the *original planning
    // still* (24.0dB), which is a different comparison. So the content seam
    // itself isn't obviously worse here. What IS real: s.cur eases toward
    // s.target at a fixed 18%/frame (scrub-engine.js's raf loop), and a narrow
    // crossfade gives that lerp less scroll distance to settle before the
    // dissolve completes — most likely to be caught mid-catch-up right after
    // a fast scroll, which is exactly when most people hit the first join.
    // Widening it back past the engine default gives it more room to settle
    // before blending. This is an engine/config-level change, not a content
    // fix — it carries over once the real-footage hero replaces these clips.
    crossfade: 0.14,
    sections: [
      {
        id: 'studio', label: 'Studio',
        still: I + 'scene-arrive.jpg',
        clip: V + 'arrive.mp4',
        clipMobile: V + 'arrive-m.mp4',
        scroll: 1.7, linger: 0.3,
        accent: '#c9a15a',
        eyebrow: 'Melbourne · Est. 2008',
        title: 'Vinyl wraps and XPEL paint protection.',
        body: 'A one-car-at-a-time studio in Melbourne. Since 2008 we have wrapped and protected everything from daily drivers to Ferraris, Porsches and Lamborghinis.',
        tags: ['XPEL paint protection film', 'Colour-change wraps', '3D previews'],
      },
      {
        id: 'design', label: 'Design',
        still: I + 'scene-design.jpg',
        clip: V + 'design.mp4',
        clipMobile: V + 'design-m.mp4',
        scroll: 1.4, linger: 0.35,
        accent: '#c9a15a',
        eyebrow: 'Step one · Design',
        title: 'See it before a single sheet is cut.',
        body: 'Every project starts as a photoreal 3D render of your car in the exact colour and finish. Change your mind as many times as you like before we start.',
        tags: ['Matte · Satin · Gloss · Chrome', 'Custom printed liveries'],
      },
      {
        id: 'install', label: 'Install',
        still: I + 'scene-craft.jpg',
        clip: V + 'craft.mp4',
        clipMobile: V + 'craft-m.mp4',
        scroll: 1.4, linger: 0.35,
        accent: '#c9a15a',
        eyebrow: 'Step two · Install',
        title: 'Installed by hand, in a clean studio.',
        body: 'XPEL paint protection film and premium vinyl, applied one car at a time with over a decade of experience behind every panel.',
        tags: ['XPEL PPF', 'Full and partial wraps', 'Over 10 years of installs'],
      },
      {
        id: 'result', label: 'Result',
        still: I + 'scene-reveal.jpg',
        clip: V + 'reveal.mp4',
        clipMobile: V + 'reveal-m.mp4',
        scroll: 1.9, linger: 0.3,
        accent: '#c9a15a',
        eyebrow: 'The result',
        title: 'Finished. And protected for years.',
        body: 'A finish that looks factory and a film that takes the stone chips, scratches and weather instead of your paint.',
        tags: [],
        cta: {
          primary: { label: 'Get a free quote', href: '#contact' },
          secondary: { label: 'See recent work', href: '#work' },
        },
      },
    ],
    connectors: [],
  });

  // Extra "Work" link beside the enquiry button (the engine only builds brand / nav / cta).
  const topbar = world.querySelector('.sw-topbar');
  const cta = topbar && topbar.querySelector('.sw-topcta');
  if (topbar && cta) {
    const right = document.createElement('div'); right.className = 'mb-topright';
    const work = document.createElement('a'); work.className = 'mb-toplink'; work.href = '#work'; work.textContent = 'Work';
    topbar.insertBefore(right, cta); right.appendChild(work); right.appendChild(cta);
  }

  // Scroll-linked: marquee fade on landing + "past the film" state for the chrome.
  const marquee = document.querySelector('.mb-marquee');
  const track = world.querySelector('.sw-track');
  let ticking = false;
  function update() {
    ticking = false;
    const y = window.scrollY || window.pageYOffset;
    const vh = window.innerHeight || 1;
    if (marquee) {
      const op = Math.max(0, Math.min(1, 1 - y / (0.55 * vh)));
      marquee.style.opacity = op.toFixed(3);
      marquee.style.visibility = op > 0.01 ? 'visible' : 'hidden';
    }
    const filmEnd = track ? track.offsetHeight : 0;
    document.body.classList.toggle('mb-past', filmEnd > 0 && y > filmEnd - vh * 0.65);
  }
  window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  window.addEventListener('resize', update);
  update();

  // Footer year.
  const yr = document.getElementById('mb-year'); if (yr) yr.textContent = String(new Date().getFullYear());
})();
