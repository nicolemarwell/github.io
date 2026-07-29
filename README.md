# Nicole P. Marwell — personal academic website

Source for **https://nicolemarwell.github.io/** — a static site (plain HTML, CSS, and
JavaScript, no framework). Hosted free on GitHub Pages.

---

## Ongoing upkeep — the things you'll actually do

### 1. Add or change a publication  ← the one that needs a build step
All publications live in **`data.js`** as a list of entries. To add one, copy an existing
entry and edit the fields (`title`, `authors`, `year`, `container`, `type`, `themes`,
`url`, `abstract`, etc.).

Then **regenerate the derived files** by running this once in the website folder:

```
node build.js
```

That rebuilds the 50+ individual paper pages in `papers/`, refreshes the list on
`publications.html`, and updates `sitemap.xml`. **If you skip this step, the new paper
won't get its own Google-Scholar page.** (Requires Node.js installed — https://nodejs.org.)

After building, commit/push the changed files (see “Publishing changes” below).

> Editing anything *other* than publications (bio text, courses, grants, media, etc.)
> does **not** need `node build.js` — just edit the HTML and push.

### 2. Add an image
Drop the file into the **`img/`** folder. A missing image auto-falls back to a gradient
placeholder, so the layout never breaks. Current images:

| File | Where it shows |
|------|----------------|
| `headshot.jpg` | Home hero + About page |
| `panel.jpg` | Home page "About" section photo (landscape, 16:9) |
| `book-mismeasuring.jpg` | Featured-book cover (home) |
| `book-bargaining.jpg` | Earlier-book cover (home) |
| `pillar-nonprofit.jpg` | Research area 1 — home card **and** `research.html` banner |
| `pillar-internet.svg` | Research area 2 — home card **and** `research.html` banner |
| `pillar-ai.svg` | Research area 3 — home card **and** `research.html` banner |

The three research-area images each appear in **two** places (the home page card and the
`research.html` section banner). `pillar-nonprofit` is a photo; the other two are SVG
placeholders. To swap a placeholder for a photo, add a `.jpg` and update its two
`src="img/…"` references (in `index.html` and `research.html`) — or just replace the file
keeping the same name. **Note:** any SVG used as an `<img>` here must include `width` and
`height` attributes, or the image-fallback script treats it as broken and hides it.

**Big photos:** phone/camera images are often 3–10 MB — far too heavy for the web. Resize the
long edge to ~2000 px and re-save (Preview → Tools → Adjust Size, then File → Export at ~70%
quality) so files stay well under ~1 MB.

### 3. Add a media link
In **`media.html`**, each item is a tile. A linked tile looks like:
`<a class="media-tile" href="URL" target="_blank" rel="noopener"> … </a>`.
Copy an existing one and change the URL, title, and outlet line.

### 4. Update the CV
Replace **`cv.pdf`** in the folder with the new file, keeping the name `cv.pdf`.

### 5. Add a post to the AI & Privacy series
The series has its own section page, **`ai-privacy.html`**, and one page per post inside the
**`ai-privacy/`** folder. There are two parallel tracks — the desktop app and the Terminal
(CLI) — and most posts exist in both.

**Page filenames come from the title, not the post number** (`one-folder-every-time-desktop.html`),
so renumbering the series never breaks a link. Posts are grouped on the section page under
the "unknown unknown" they belong to, with "Part N of 3" labels.

**The Word documents are the source of truth.** Each one is formatted the same way, and the
page builder relies on it: **Heading 1** = the title, **Heading 3** = the italic dek line,
**Heading 2** = section headings, everything else body text, all in Garamond. If you add a
post, match that structure.

To publish a post that is currently listed as "Coming soon":

1. **Make the page.** Copy the closest existing page in `ai-privacy/` to a name made from
   the new title, e.g. `two-kinds-of-fences-desktop.html`. Then update, in the copy: the
   `<title>`, the `description` meta, the two `og:` lines, the `<link rel="canonical">`
   **and** `og:url` (both must end in the new filename), the eyebrow, the `<h1>`, the
   `.post-dek`, the `.post-note`, the `.post-crosslink`, the prose inside
   `<div class="post-body">`, and the `.post-next` block at the bottom.
2. **Convert the text.** From the series folder run
   `pandoc -f docx -t html --wrap=none "Part 2 - ….docx"`. Because of the heading structure
   above, the title comes out as `<h1>`, the dek as `<h3>`, and section headings as `<h2>` —
   put the title and dek in the page head and `.post-dek`, and everything after them inside
   `<div class="post-body">`. `<p>`, `<h2>`, `<ul>`, `<blockquote>`, and `<code>` are all
   already styled.
3. **Turn the "Coming soon" row into a link** in `ai-privacy.html`. Change the row's
   `<div class="selected-item is-upcoming">` to
   `<a class="selected-item" href="ai-privacy/two-kinds-of-fences-desktop.html">`, close it
   with `</a>` instead of `</div>`, replace "Coming soon" in the `.s-venue` line with a
   one-line description, and swap the `<span class="selected-badge">Coming soon</span>` for
   `<span class="selected-arrow">→</span>`. Then **add one new "Coming soon" row** for the
   post after it, copying the row you just converted.

   > **The section only ever foreshadows one post ahead.** Each track shows the published
   > posts plus exactly one "Coming soon" row — never two or three still to come. Keep it
   > that way when you add a post.
4. **Update the previous post's footer pointer.** In the post before it, the `.post-next`
   block says "Coming soon" — make its `.pn-title` a link now that the page exists.
5. **Add it to the sitemap.** Add the new path to the `SERIES_PAGES` list near the top of
   **`build.js`**, then run `node build.js`.

> If a post ever exists in only one track, it simply has no row in the other track's list.
> The two tracks don't have to match.

### 6. Publishing changes
Copy the changed files into your `nicolemarwell.github.io` repo (GitHub Desktop or the
github.com uploader) and commit. GitHub Pages redeploys automatically in 1–2 minutes.

- **Images must land inside `img/`.** On the github.com uploader, open the `img` folder
  *first*, then **Add file → Upload files** — otherwise they upload to the repo root and the
  site can't find them (you'll get broken/blank images). You can't move a binary file
  afterward on the web UI; delete it from the root and re-upload into `img/`.
- **Change not showing after publishing (or locally)?** The browser cached the old file. In
  the DuckDuckGo browser there's no hard-refresh shortcut — fully quit it (`Cmd+Q`) and
  reopen. On the live site, also give Pages 1–2 minutes to redeploy.

---

## After a big update: Google Scholar
Scholar indexing is driven by the per-paper pages in `papers/` (they carry `citation_*`
meta tags) and by `sitemap.xml`. To help it along:
1. In **Google Search Console**, submit `https://nicolemarwell.github.io/sitemap.xml`.
2. Link this site from your **Google Scholar profile**.

---

## What each file is

| File / folder | Purpose |
|---|---|
| `index.html` | Home page |
| `research.html` `grants.html` `teaching.html` `media.html` `about.html` | Section pages |
| `ai-privacy.html` | The AI & Privacy series section — two tracks, one row per post |
| `ai-privacy/` | One hand-written page per published post (**not** generated) |
| `publications.html` | Filterable/searchable publications list with one-click citations |
| `papers/` | Auto-generated landing page per publication (for Google Scholar) |
| `data.js` | **The publications database** — edit this to change publications |
| `build.js` | Generator: run `node build.js` after editing `data.js` |
| `styles.css` | All styling (colors, type, layout) |
| `main.js` | Nav, scroll effects, video lightbox, accessibility helpers |
| `pubs.js` | Publications page interactivity (filter, search, cite) |
| `img/` | Images |
| `cv.pdf` | Downloadable CV |
| `sitemap.xml` `robots.txt` | Auto-generated; help search engines |
| `.nojekyll` | Tells GitHub Pages to serve files as-is |

## Design reference
- **Palette:** Aubergine `#442C41`, Apricot `#E0996B`, Mauve `#8C7A86`, Oat `#FAF5F0`,
  Ink `#2A2229` (accessible link color Terracotta `#B5652F`). Defined at the top of `styles.css`.
- **Type:** Fraunces (headings) + DM Sans (body), loaded from Google Fonts.

## Viewing locally
Open `index.html` in a browser, or from this folder run `python3 -m http.server` and
visit `http://localhost:8000`.
