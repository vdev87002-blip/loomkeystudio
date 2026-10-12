LOOM & KEY STUDIO WEBSITE
-------------------------
1. Open this folder in VS Code (File > Open Folder).
2. Install the "Live Server" extension, right-click index.html > "Open with Live Server".
3. Edit js/script.js first: SITE (your details) and PRODUCTS (your product list).
4. CLOUDINARY: upload photos/videos in your Cloudinary Media Library, then in js/script.js:
   - set SITE.cloudName
   - use each file's public ID (e.g. "loomkey/duck-keychain") in PRODUCTS, GALLERY,
     HERO_IMAGE and HERO_VIDEO. Never put your API secret in the site.
   Other images (about page etc.): replace the grey ".ph" boxes with
      <img src="https://res.cloudinary.com/YOUR_CLOUD/image/upload/f_auto,q_auto,w_900/loomkey/file" alt="...">
5. Colours and fonts: top of css/style.css (:root section).
6. Header and footer are edited once, inside js/script.js.
To publish free: Netlify, GitHub Pages or Cloudflare Pages (drag the folder in).
