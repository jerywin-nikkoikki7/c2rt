# c2rt — Bloxd.io personal website

A responsive personal Bloxd.io profile website for GitHub Pages, built with plain HTML, CSS, and JavaScript.

## Files
- `index.html` — page content
- `style.css` — design and responsive layout
- `script.js` — profile text, pack configuration, search/filter behavior, social links, and interactions

## Publish on GitHub Pages
1. Create a public repository on GitHub (for example, `c2rt` or `packs`).
2. Upload `index.html`, `style.css`, `script.js`, and this README to the repository root.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Choose branch `main` and folder `/(root)`, then save.
6. Wait for the Pages deployment to finish. The URL will be `https://YOUR-USERNAME.github.io/REPOSITORY-NAME/`.

## Customize
Open `script.js` and edit `SITE_CONFIG`:
- `about`: your public bio
- `packs`: descriptions and download URLs
- `socials`: public social links

For pack downloads, upload files into a `downloads` folder in the repository (or use a link you have permission to share), then set each `downloadUrl`, e.g. `downloads/cosmic-rift.zip`.

The in-page "Edit about text" control is a temporary browser preview; it does not change the public site for other visitors. For permanent changes, edit `SITE_CONFIG.about` in `script.js` and commit it.

Only publish information and links you intend to make public. Use pack artwork and files you own or have permission to redistribute.
