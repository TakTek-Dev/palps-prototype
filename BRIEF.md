# شبكة الصحافة الفلسطينية — نماذج الهوية والواجهة

Brand: **شبكة الصحافة الفلسطينية** (palps.net, rebuilt on Devlo at palps.taktek.co). It is an Arabic-only Palestinian
newsroom doing news treatments («معالجات اخبارية»), analysis and opinion («تحليلات واراء»), «القصة في ارقام»
(data stories) and photo essays («القصة في صور»). Tagline: «مهنية. مستقلّة. موثوقة.». Tone: serious, investigative,
accountability journalism.

Audience: Palestinians at home and abroad, mostly on phones (Telegram, Facebook, X, WhatsApp shares).

**Rivals and neighbours to stay apart from:** Shehab, Quds News (qudsn), Palestine Online, Al Jazeera,
and the previous palps look. That look had a navy/dark hero with boxed rounded cards, and the rejected
«الصحافة» look had newsprint paper, Naskh headlines and flag-stripe rules. **Do not repeat either.**

## Identity source (all directions must read from it)

`assets/img/brand/logo.webp` is a quill pen. Its feather plume is the **map of Palestine in the flag's colours**:
black, white and green bands, with the flag's **red triangle** at the root. There is an **ink line / nib stroke**
under the pen and an Arabic wordmark in black. `assets/img/brand/cover.png` is the about-page key art (a 3D quill on dark).

Flag colours: black #000, white #fff, green #007A3D, red #CE1126. Each direction tunes them its own way.

Language: Arabic only, `dir="rtl"`, `lang="ar"`. No letter-spacing on Arabic. Use Western digits, as the site does.

## Content (real, from the site; nothing invented)

`data/content.json` holds:
- `latest` (24 stories)
- `news` («معالجات اخبارية»)
- `analysis` («تحليلات واراء»)
- `numbers` («القصة في ارقام»)
- `most_read` (10)
- `photo_essays` (6, with `gallery`)
- `nav` (menu labels)
- `about`, `tagline`

Images are in `assets/img/news/`. `image` may be null; skip those stories as leads. The site has no videos
and no breaking items right now, so draw no video band and an optional breaking strip only. `author` is
usually null, so show the category and date. Hard-code the content into the HTML (copy from the JSON);
no fetch at runtime.

Never use a face of a soldier or settler as the lead photo.

## Deliverable per direction (folder `a/`, `b/`, `c/`)

- `home.html` is the homepage, fully responsive (1440 / 1024 / 768 / 375px), with no horizontal scroll at
  375px and tap targets of at least 44px. It shows a header with the logo and a phone menu, the lead area,
  the four sections above, most read, a newsletter/follow block and a footer.
- `index.html` is the identity book: logo use, palette with hex and contrast ratio, type scale, the
  signature motif, components (card, section head, kicker, button, tags) and a link to `home.html`.
- `style.css` plus a small `main.js` (phone menu only, vanilla).
- Fonts are self-hosted woff2 in `assets/fonts/<family>/`, with the OFL licence file beside them.
  Download them from Google Fonts. **Use only the fonts listed for your direction.**
- Remove `loading="lazy"` from the first screen's images.

The directions must differ in **page structure** (grid, lead treatment, navigation, density), not only in colour.
News density stays high, with no big empty spaces. Each has one clear lead story.

### A «الريشة» — dark, digital, live newsroom
- **Structure:** a centred masthead with the logo large in the middle; under it a full-width nav bar
  with a «مباشر» pill. The lead is a **full-bleed photo with an overlaid headline** spanning 2/3; beside it
  a tall vertical **live timeline** of `latest` with times.
  - Sections become **horizontal snap rails** of cards on phone and 4-column rows on desktop.
  - Most read is a **sticky numbered sidebar** beside the analysis list.
  - Analysis shows as **columnist cards** (a circle cut from the photo).
- **Palette:** ink #0B0B0C surfaces, white text, flag red as the action colour, green for live/time.
  Light content areas alternate with dark bands.
- **Motif:** the quill's diagonal. Section heads carry a slanted nib-cut edge (a clip-path parallelogram),
  and the red triangle is the bullet.
- **Fonts:** **Reem Kufi** (headlines, 600/700) + **Vazirmatn** (body/UI 400/500/700).

### B «الخريطة» — bright, portal-dense, organised by colour
- **Structure:** a white sticky header with the logo at the start, the search as a wide field, and the nav
  as a second row of **category tabs coloured by section**. The lead is a **bento mosaic**: 1 large + 4 small tiles
  with the image on top and text below (no overlay).
  - Then a **three-column "desk" row**: each column is a section (news / analysis / numbers) with a lead
    thumb and 4 headlines, like a portal.
  - Photo essays sit in a **filmstrip**. Most read is a **2×5 grid of numbered lines**.
- **Palette:** white and #F4F6F5. Each section owns a flag colour as a 4px top rule and kicker: news green,
  analysis red, numbers black. Text is near-black.
- **Motif:** the **map silhouette of Palestine** (draw a simple SVG outline yourself, as a small mark) beside
  section titles and as a faint watermark in the footer.
- **Fonts:** **Rubik** (headlines 600/700, Arabic subset) + **Noto Sans Arabic** (body 400/500/600).

### C «الحبر» — magazine, investigative long-form
- **Structure:** a slim top bar, then the logo at the start and a **hamburger + search on every width**. There
  is no visible nav row; the menu is an overlay drawer.
  - The lead is a **split screen**: a giant headline and excerpt on one side and a tall portrait crop on the
    other, with a hand-drawn **ink underline** (SVG stroke) under the headline.
  - Then a **numbered "ملفات" row**: 3 large text-led cards with a big outlined number.
  - «القصة في ارقام» uses **one huge figure** per card. Analysis appears as **pull-quote cards**.
  - Photo essays are a full-width **horizontal scroller**. Most read is a tight numbered column.
- **Palette:** warm white #FFFDF8 with **deep green #0D4D2F as the dominant brand colour** (headers, footer,
  links), red only for small accents, and black for the type.
- **Motif:** the **nib and the ink stroke**: a drawn underline, nib-shaped bullets and the ink line as a divider.
- **Fonts:** **Kufam** (headlines 600/700, with `font-variant-ligatures: no-contextual`) + **Mada** (body 400/500/700).
