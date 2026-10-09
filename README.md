# Creative Megabase — GitHub + Netlify

This is the current Megabase adapted for Netlify. The interface reads `/api/directory`, served by a Netlify Function that fetches the Google Sheet directly. It checks for changes every minute while the page is visible and when you return to the tab. No rebuild is needed for sheet edits.

## Deploy

1. Extract the ZIP. Upload or commit the extracted files to a GitHub repository, with `package.json` and `netlify.toml` at the repository root.
2. In Netlify, import that GitHub repository as a new project.
3. Netlify reads `netlify.toml`: build command `npm run build`, publish folder `public`, functions folder `netlify/functions`.
4. Deploy. No Google API key or environment secrets are needed for the current link-viewable sheet.

Deploy the whole project through Git or the Netlify CLI. Uploading only the `public` folder through drag-and-drop will omit the live backend.

## Sheet

https://docs.google.com/spreadsheets/d/1M_rLNXPx0IgnJ47l1HRQvpp9A9gCKLEjNn6AvicMb40/edit?usp=sharing

Keep the sheet viewable by anyone with its link. Use `NAME`, `LINK` and `PORTFOLIO IMAGE` headers. Portfolio images should be directly accessible HTTP(S) image URLs, rather than a page containing an image. New tabs are discovered automatically. Other named columns appear as notes. Blank image cells show placeholders.

## Verify locally

Run `npm ci`, `npm test` and `npm run build`. Tests fetch the live Google Sheet and verify caching, failure handling, image URLs and new tabs. For a full local preview with functions, run `npx netlify-cli dev`.

The existing ChatGPT-hosted site is unaffected. This package is ready for Netlify deployment; it has not been deployed there. Netlify's access settings are separate from the private ChatGPT-hosted site, so configure the intended audience in Netlify before sharing its URL.

## Included design

Black background, white text and lines, the full-width SVG logo, Neue Haas Unica at weight 500 through Adobe Fonts, 4:5 image cards, yellow website arrows beside names, sticky navigation with section headings that shrink on scroll, subsection filters, five-column desktop grids above 900px, the supplied favicon and live update status in the footer.

Keep the entire repository together: the `netlify` and `lib` folders are required for the live sheet connection.
