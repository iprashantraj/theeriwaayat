# AGENTS.md

Context for AI assistants (Codex, etc.) working on the **Riwaayat Publications** website.

---

## Project

Marketing website for **Riwaayat Publications** — a book publishing house specializing in solo releases and curated anthologies (English + Hindi). Single-page mobile-first static site.

- **Live:** https://theeriwaayat.vercel.app
- **Repo:** https://github.com/iprashantraj/theeriwaayat
- **Hosting:** Vercel (auto-deploy on push to `main`)
- **License:** Proprietary — All Rights Reserved (see [LICENSE](LICENSE))

## Stack

- Plain **HTML / CSS / JavaScript** — no build step, no framework, no dependencies
- Google Fonts: **Della Respira** (display) + **Harmattan** (body)
- `vercel.json` for static deployment + security headers

**Important:** Do not introduce frameworks, bundlers, or npm packages unless the user explicitly asks. The whole point is zero-build simplicity.

## File structure

```
.
├── index.html      # Single page — all sections live here
├── styles.css      # External CSS (mirror of inline <style>)
├── script.js       # External JS (mirror of inline <script>)
├── logo.png        # Brand mark (TRANSPARENT background — do not flatten)
├── vercel.json     # Vercel deploy config + security headers
├── README.md       # Public project overview
├── LICENSE         # Proprietary license
└── AGENTS.md       # This file
```

> ⚠️ **CSS and JS are duplicated**: `index.html` contains inline `<style>` and `<script>` blocks that mirror the contents of `styles.css` and `script.js`. The inline versions are what actually render on the site. When editing styles or scripts, edit the inline versions in `index.html` first. The external files exist for editor convenience and historical reference.

## Brand

| Token              | Value                                          |
| ------------------ | ---------------------------------------------- |
| Primary navy       | `#1C3F60` (var `--navy`)                       |
| Deep navy          | `#142E47` (var `--navy-deep`)                  |
| Cream accent       | `#FFF1DA` (var `--cream`)                      |
| Gold               | `#D4A867` (var `--gold`)                       |
| Gold bright        | `#E8C07D` (var `--gold-bright`)                |
| Display font       | Della Respira                                  |
| Body font          | Harmattan                                      |
| Tagline            | _Where Every Voice Becomes a Legacy_           |
| Voice              | Literary, warm, poetic — not corporate or salesy |

## Sections (scroll order)

1. **Top bar** — fixed, transparent → blurred on scroll
2. **Hero** — full viewport, logo + tagline + CTA
3. **Our Journey** — timeline: WePublish (Mar 2024) → Riwaayat (Apr 2026)
4. **Impact stats** — 420+ members, 180+ followers, 30+ projects (animated counters)
5. **Portfolio** — Solo releases (Kartik Aggrawal, Mohit Chikni), Riwaayat Exclusives carousel, Legacy anthologies accordion
6. **Packages** — 3 tracks: Solo ₹799, Paid Anthology, Free Anthology (middle card is "Most Popular")
7. **Benefits** — 5-tile "What You Get, Always" grid
8. **Community CTA** — WhatsApp + Instagram buttons
9. **Footer** — contact, socials, "from WePublish est. 2024"
10. **Floating WhatsApp FAB** — always visible bottom-right

## Conventions

- **Mobile-first.** Default styles target ~360–480px viewports; use `@media (min-width: …)` for tablet/desktop. Most visitors are mobile.
- **Fluid typography** with `clamp()` — never use fixed `font-size: 24px` for headings.
- **Section anchors** are lowercase IDs (`#journey`, `#packages`, etc.) — used in side nav and CTAs.
- **All CTAs to WhatsApp/Instagram** must open in new tab: `target="_blank" rel="noopener"`.
- **Package CTAs** open WhatsApp with a pre-filled message (`https://wa.me/919931202348?text=…`).
- **Reveal animations**: add `class="reveal"` to any element — it'll fade up on scroll (handled by IntersectionObserver in JS).
- **No emojis in code or markdown unless explicitly requested.**

## Logo handling

The logo (`logo.png`) has been processed to have a **truly transparent background** (alpha=0 on navy pixels). Do **not** flatten it onto the navy bg again — the gradient overlays in the hero would create a visible darker square otherwise.

If you need to regenerate the logo from a source image with a flat navy bg:

```python
from PIL import Image
img = Image.open('source.png').convert('RGBA')
new_data = []
for r, g, b, a in img.getdata():
    dist = ((r-28)**2 + (g-63)**2 + (b-96)**2) ** 0.5
    if dist < 30:
        new_data.append((r, g, b, 0))      # transparent navy
    else:
        brightness = (r + g + b) / 3 / 255
        if brightness > 0.9:
            new_data.append((255, 255, 255, 255))
        elif brightness > 0.5:
            new_data.append((255, 255, 255, int(255 * brightness)))
        else:
            new_data.append((r, g, b, 0))
img.putdata(new_data)
img.save('logo.png', 'PNG', optimize=True)
```

## Contact / Social

- 📧 thee.riwaayat@gmail.com
- 📱 +91 99312 02348
- 📷 Instagram: [@thee.riwaayat](https://www.instagram.com/thee.riwaayat/)
- 💬 WhatsApp: https://chat.whatsapp.com/G2OPxiZoI4bIzc81zvk9o1

## Common tasks

**Update a package price** — edit the `.pkg-price` / `.pkg-price-small` block inside the `.packages` section in `index.html`.

**Add a new anthology** — edit the appropriate `<details>` group inside the "Legacy & Community Collections" accordion (Emotions / Life / Nature / Thoughts).

**Add a new solo release** — duplicate a `.solo-card` block inside `.solo-grid`. The book cover is a CSS mockup (`.cover-mock`) — no image needed unless you want a real cover.

**Add a Riwaayat Exclusive** — duplicate a `.carousel-card` block inside `.carousel-track`. The carousel dots regenerate automatically via JS.

**Tweak the hero gradient** — see `.hero { background: … }` in the CSS. Currently a layered radial gradient over `--navy`.

**Deploy** — commit and push to `main`. Vercel auto-deploys in ~30s. No manual step.

## Gotchas

- **Do not add `mix-blend-mode` to the logo.** The PNG is already transparent. Blend modes interact unpredictably with the topbar's rgba bg and hero gradients.
- **Hero gradient lightens the area near the top of the page.** Anything with a flat `#1C3F60` bg placed in that area will appear darker than its surroundings. Use transparency or remove the gradient.
- **Della Respira is loaded from Google Fonts.** If you switch hosting away from Vercel, ensure the font URL is still reachable or self-host it.
- **The site is currently public on GitHub** but proprietary licensed. Do not encourage forks or PR contributions.

## Style preferences (from prior sessions)

- Keep responses tight; avoid long preambles.
- Don't add features, comments, or abstractions beyond what's asked.
- Confirm before destructive actions (force-push, deleting branches, etc.).
- Match the project's existing aesthetic — don't introduce new colors, fonts, or design patterns without checking first.
