/** Taylor Tree Care — colours sampled from the Facebook logo and the job photos.
 *  Roles, not decoration: `action` is the only "click me" colour; `line` is the
 *  hedge-cutter's string line and the markers; nothing else uses either. */
module.exports = {
  content: ['./*.html', './assets/js/*.js'],
  theme: {
    extend: {
      colors: {
        // hedge: the logo's black (#010201) pulled toward the conifer green of the hedge photos.
        // Dominant ground for the hero, work and contact sections; also body ink on light grounds.
        hedge: { DEFAULT: '#121B13', 700: '#1C2A1D', 600: '#26382A', 500: '#355039' },
        // ink: text on light grounds (same hue as hedge, a touch lighter for long reading)
        ink: { DEFAULT: '#172117', soft: '#465346' },
        // leaf: the shadowed leaves of the logo's tree (#4D771D). Drawings, hedge fills, icons.
        leaf: { DEFAULT: '#4D771D', 300: '#9DB87A', 100: '#DDE6CF' },
        // action: the lime of "TREE CARE" in the logo (#87B135, lifted). Buttons and links only.
        // Dark text on it always; action-700 for link text on light grounds.
        action: { DEFAULT: '#8DB838', 600: '#7CA42C', 700: '#4B6A12' },
        // line: the orange of the kit (chainsaw trousers, trimmer and blower in the job photos).
        // The string line, pegs and markers. Rare by design.
        line: { DEFAULT: '#E8692E', 700: '#B4481A' },
        // silver: the chrome "TAYLOR" lettering. Muted text and rules on dark grounds.
        silver: { DEFAULT: '#C9CCC4', 400: '#9EA59B' },
        // surface: the leaf hue at very low chroma. Light section grounds.
        surface: { DEFAULT: '#EEF1E8', paper: '#F7F8F3', deep: '#E2E7DA' },
      },
      fontFamily: {
        // Hubot Sans: heavy, wide grotesk; at wdth 125 / wght 900 it echoes the wide chrome TAYLOR lettering.
        display: ['"Hubot Sans Variable"', '"Arial Black"', 'system-ui', 'sans-serif'],
        // Albert Sans: plain, open body face that stays readable on dark green.
        sans: ['"Albert Sans Variable"', 'system-ui', '-apple-system', '"Segoe UI"', 'sans-serif'],
      },
      maxWidth: { site: '84rem' },
      transitionTimingFunction: { out: 'cubic-bezier(.2,.7,.2,1)' },
    },
  },
  plugins: [],
};
