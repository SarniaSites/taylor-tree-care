# Taylor Tree Care — website

Single-page site for Taylor Tree Care (tree work, hedge cutting, garden maintenance and clearances, Guernsey). Plain HTML + Tailwind CSS v3 + a little vanilla JS. No frameworks, no CDNs, all paths relative.

```
index.html              the page (sections separated by comment banners)
thanks.html, 404.html   form thank-you page and not-found page, same design
assets/css/styles.css   compiled Tailwind (committed; rebuild with npm run build)
assets/js/main.js       header, menu, hedge-trim motif, services explorer, work strip + lightbox, steps, form validation
assets/fonts/           Hubot Sans + Albert Sans (self-hosted woff2) with OFL licences
images/brand/           logo badge (WebP, cropped from the Facebook logo), mark.svg, wordmark.svg
images/work/            job photos, two sizes each (name.webp ~1600px, name-sm.webp ~800px)
images/                 favicons, og-image.jpg (1200×630), site.webmanifest, hedge-tufts.svg (the hedge edge)
src/input.css           Tailwind source: @font-face, components, keyframes
tailwind.config.js      brand colours by role, with where each came from
sitemap.xml, robots.txt
_fb-pack/               the Facebook source pack (not published: underscore folder)
_shots/                 desktop + mobile screenshots for the team (not published)
```

## Brand

| Name | Hex | Used for |
|---|---|---|
| hedge | `#121B13` | Dark grounds (hero, work, contact, footer). Logo black pulled toward the conifer green |
| leaf | `#4D771D` | The hedge edges, drawings, icons. From the logo's tree |
| action | `#8DB838` | Buttons and links only (dark text on it). The logo's "TREE CARE" lime |
| line | `#E8692E` | The string line, pegs and markers. The orange of the kit in the job photos |
| silver | `#C9CCC4` | Muted text and rules on dark. The chrome "TAYLOR" lettering |
| surface | `#EEF1E8` / `#F7F8F3` | Light section grounds |
| ink | `#172117` | Body text on light grounds |

Fonts: **Hubot Sans** (display, pushed to width 125 / weight 900 in the hero to echo the wide TAYLOR lettering) and **Albert Sans** (body). The logo was not redrawn: the Facebook logo is 1254px and good quality, so it is used as a round badge. `images/brand/mark.svg` is a simplified tree-in-a-ring mark used only for the favicon.

The signature: every section edge is a hedge top. It starts overgrown and a hedge trimmer rides the orange string line and cuts it level (on load in the hero, as you scroll for the rest). The contact section ends on a squared-off hedge with the line tied to its peg. Headings end on the same string line.

## Editing

- **Text:** edit `index.html` directly.
- **Colours / fonts:** `tailwind.config.js`, then `npm install && npm run build`.
- **Add a work photo:** export `name.webp` (~1600px) and `name-sm.webp` (~800px) into `images/work/`, then copy one `<li>` in the "RECENT WORK" block, update `src`, `width`/`height`, `alt`, caption and the `data-lb` number (keep them in order). The lightbox opens the large version automatically.
- **Services explorer:** each service is a tab button (`data-key`, `data-y` = the height the string line moves to in the drawing) plus a matching `<article role="tabpanel">`. The drawing parts are `<g data-part="tree|hedge|clear|garden">`. The service select in the form should list the same services.
- No before/after slider (the pack has no matching photo pairs), no reviews section (no reviews on the page yet), no FAQ.

## Going live — checklist

SarniaSites charges a one-time fee and the client owns everything.

- [ ] Client buys their domain in their own name (roughly £10 a year for .com, £30–40 for .gg)
- [ ] Help the client create a free Cloudflare account in their name; connect this repo to Cloudflare Pages on their account (production branch `main`, no build command, output = repo root) and add their domain to the Pages project
- [ ] Swap the GitHub Pages URL for the real domain everywhere: canonical, og tags, JSON-LD, sitemap, robots, `_next`
- [ ] Switch the form from the team's email to the client's (`taylortreecaregsy@gmail.com`) and activate FormSubmit
- [ ] Confirm phone/email; get the client to sign off the services wording (the "what's included" lists are written from the page bio, logo and the one clearance post)
- [ ] Ask for the owner's first name (buttons could say "Call <name>") and the parishes they cover
- [ ] Ask for better tree-work photos (the pack is mostly hedges and clearances) and any real before/after pairs
- [ ] Optional: transfer the repo to the client's own GitHub if they want it

Assumptions: "Pruning and cutting back" and "Overhanging and overgrown branches" under tree work are read from "all aspects of tree work"; "Strimming" and "borders and shrubs" under garden maintenance come from the kit and jobs in the photos. Nothing was left out of the posts (the pack has one post); the "Like, share" line was not used.

Source: built from the Facebook pack in `_fb-pack/` (not published on the live site).
