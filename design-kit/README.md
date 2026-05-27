# DBSI design kit

A framework-free, drop-in design kit for the DBSI app. The shell is a single
HTML page; navigation is hash-based and JS swaps the active view's HTML into
`<main id="view">`. No build step, no dependencies.

## Try it

Just open `index.html` in a browser. Routes:

- `#/accueil` — dashboard
- `#/clients` — clients roster
- `#/inventaires` — inventory jobs with state badges

## Files

```
design-kit/
  index.html         App shell (sidebar + topbar + #view container)
  favicon.svg
  css/site.css       Whole design system (CSS variables + classes)
  js/data.js         Mock data — replace with your real data source
  js/views.js        view functions: home / clients / inventaires
                     Each takes the data object and returns an HTML string
  js/app.js          Hash router + sidebar/menu interactions
```

## Wiring it into your app

1. Copy `css/`, `js/`, `favicon.svg`, and the shell markup from `index.html`
   into your project.
2. Replace `data.js` with a module that fetches your real data (SQLite query,
   JSON file, in-memory store…) and exposes the same shape on
   `window.DBSI_DATA`.
3. Re-render after a data change with `window.dispatchEvent(new HashChangeEvent("hashchange"))`,
   or call the view function directly and set `document.getElementById("view").innerHTML = …`.

## Customising the look

All colors and spacing live as CSS variables at the top of `css/site.css`:

```css
--brand:      #2f80ed;   /* main blue */
--brand-soft: #e7f0ff;   /* light-blue tint */
--bg:         #eef4fb;   /* page background */
```

State badge tones available out of the box: `tone-blue`, `tone-green`,
`tone-amber`, `tone-red`, `tone-gray`.
