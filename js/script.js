/* ==========================================================
   EDIT THIS FIRST: your business details (used on every page)
   ========================================================== */
const SITE = {
  name: "Loom & Key Studio",
  logo: "images/logo.png",              // put your logo in /images
  whatsapp: "91XXXXXXXXXX",             // country code + number, no + or spaces
  instagram: "loomkeystudio",
  email: "youremail@example.com",
  cloudName: "your-cloud-name",         // Cloudinary dashboard > top-left "Cloud name"
  about: "Short footer description. Replace this text."
};

/* ==========================================================
   PRODUCTS: add / edit / delete items here. Shows on Shop + Home.
   category: Bouquets, Hair Clips, Keychains, Gifts (or add your own)
   image: Cloudinary public ID like "loomkey/duck-keychain"
          (a full https URL or "images/file.jpg" also works; "" = placeholder)
   featured: true = also shown on the Home page
   ========================================================== */
const PRODUCTS = [
  { name: "Product name", category: "Bouquets",   price: "₹000", image: "", desc: "Short description", featured: true },
  { name: "Product name", category: "Hair Clips", price: "₹000", image: "", desc: "Short description", featured: true },
  { name: "Product name", category: "Keychains",  price: "₹000", image: "", desc: "Short description", featured: true },
  { name: "Product name", category: "Gifts",      price: "₹000", image: "", desc: "Short description", featured: true }
];

/* ---------- helpers ---------- */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const waLink = (text) => `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
const igLink = `https://www.instagram.com/${SITE.instagram}/`;

/* ---------- Cloudinary helpers ---------- */
// Image URL with auto format + auto quality + width. Full URLs / local files pass through unchanged.
const cldImg = (id, w = 800) =>
  !id ? "" :
  /^(https?:|images\/|\/)/.test(id) ? id :
  `https://res.cloudinary.com/${SITE.cloudName}/image/upload/f_auto,q_auto,w_${w}/${id}`;
// Video URL with auto format + quality
const cldVideo = (id) =>
  /^(https?:|images\/|\/)/.test(id) ? id :
  `https://res.cloudinary.com/${SITE.cloudName}/video/upload/f_auto,q_auto/${id}`;

/* ==========================================================
   MEDIA: Cloudinary public IDs for Home hero and Gallery.
   Leave empty to keep the grey placeholders.
   ========================================================== */
const HERO_IMAGE = "";   // e.g. "loomkey/hero"
const HERO_VIDEO = "";   // e.g. "loomkey/hero-reel"  (used instead of the image if set)
const GALLERY = [
  // "loomkey/gallery-1",
  // "loomkey/gallery-2",
];

/* ---------- header & footer (edit once, updates all pages) ---------- */
const NAV = [["index.html","Home","home"],["shop.html","Shop","shop"],["gallery.html","Gallery","gallery"],["about.html","About","about"],["contact.html","Contact","contact"]];
const page = document.body.dataset.page;

$("#site-header").outerHTML = `
<header class="header"><div class="container">
  <a class="logo" href="index.html"><img src="${SITE.logo}" alt="" onerror="this.remove()">${SITE.name}</a>
  <button class="menu-btn" id="menu-btn" aria-label="Menu">☰</button>
  <nav class="nav" id="nav">
    ${NAV.map(([h,l,k]) => `<a href="${h}" class="${k===page?'active':''}">${l}</a>`).join("")}
    <a class="btn btn-sm wa" href="#" target="_blank" rel="noopener">Order</a>
  </nav>
</div></header>`;

$("#site-footer").outerHTML = `
<footer class="footer"><div class="container">
  <div class="footer-grid">
    <div><h4>${SITE.name}</h4><p>${SITE.about}</p></div>
    <div><h4>Explore</h4>${NAV.map(([h,l]) => `<a href="${h}">${l}</a>`).join("")}</div>
    <div><h4>Connect</h4><a href="${igLink}" target="_blank" rel="noopener">Instagram</a><a class="wa" href="#" target="_blank" rel="noopener">WhatsApp</a><a href="mailto:${SITE.email}">${SITE.email}</a></div>
  </div>
  <div class="copy">© ${new Date().getFullYear()} ${SITE.name}. All rights reserved.</div>
</div></footer>
<a class="float-wa wa" href="#" target="_blank" rel="noopener" aria-label="WhatsApp">WA</a>`;

$$("a.wa").forEach(a => a.href = waLink(`Hi ${SITE.name}! I'd like to place an order.`));
$$("#ig-link").forEach(a => a.href = igLink);
$$('[data-site="whatsappDisplay"]').forEach(e => e.textContent = "+" + SITE.whatsapp);
$$('[data-site="instagramLink"]').forEach(e => { e.href = igLink; e.textContent = "@" + SITE.instagram; });
$$('[data-site="emailLink"]').forEach(e => { e.href = "mailto:" + SITE.email; e.textContent = SITE.email; });

$("#menu-btn").addEventListener("click", () => $("#nav").classList.toggle("open"));

/* ---------- hero media (image or video) ---------- */
const heroBox = $("#hero-media");
if (heroBox && HERO_VIDEO) {
  heroBox.className = "ph-hero";
  heroBox.innerHTML = `<video src="${cldVideo(HERO_VIDEO)}" autoplay muted loop playsinline style="width:100%;height:100%;object-fit:cover;border-radius:var(--radius)"></video>`;
} else if (heroBox && HERO_IMAGE) {
  heroBox.className = "ph-hero";
  heroBox.innerHTML = `<img src="${cldImg(HERO_IMAGE, 1000)}" alt="" style="width:100%;height:100%;object-fit:cover;border-radius:var(--radius)">`;
}

/* ---------- products ---------- */
function productCard(p) {
  const img = p.image ? `<img class="prod" src="${cldImg(p.image, 600)}" alt="${p.name}" loading="lazy">` : `<div class="ph">Product photo</div>`;
  const msg = waLink(`Hi ${SITE.name}! I'd like to order: ${p.name} (${p.price})`);
  return `<article class="product">${img}<div class="body">
    <span class="tag">${p.category}</span><h3>${p.name}</h3><p>${p.desc}</p>
    <div class="row"><span class="price">${p.price}</span><a class="btn btn-sm" href="${msg}" target="_blank" rel="noopener">Order</a></div>
  </div></article>`;
}

const featured = $("#featured-grid");
if (featured) featured.innerHTML = PRODUCTS.filter(p => p.featured).slice(0, 4).map(productCard).join("");

const grid = $("#product-grid");
if (grid) {
  const cats = ["All", ...new Set(PRODUCTS.map(p => p.category))];
  const start = new URLSearchParams(location.search).get("cat");
  let current = cats.includes(start) ? start : "All";
  const render = () => {
    const list = current === "All" ? PRODUCTS : PRODUCTS.filter(p => p.category === current);
    grid.innerHTML = list.map(productCard).join("");
    $("#no-results").hidden = list.length > 0;
    $("#filters").innerHTML = cats.map(c => `<button class="${c===current?'active':''}" data-cat="${c}">${c}</button>`).join("");
  };
  $("#filters").addEventListener("click", e => { const c = e.target.dataset.cat; if (c) { current = c; render(); } });
  render();
}

/* ---------- gallery lightbox ---------- */
const gal = $(".gallery");
if (gal) {
  gal.innerHTML = GALLERY.length
    ? GALLERY.map(id => `<img src="${cldImg(id, 500)}" data-full="${cldImg(id, 1400)}" alt="" loading="lazy">`).join("")
    : Array.from({length: 12}, (_, i) => `<div class="ph ${i % 3 === 1 ? "ph-tall" : ""}">Photo</div>`).join("");
}
if (gal) {
  const lb = document.createElement("div");
  lb.className = "lightbox"; lb.innerHTML = "<img alt=''>";
  document.body.appendChild(lb);
  gal.addEventListener("click", e => {
    if (e.target.tagName === "IMG") { $("img", lb).src = e.target.dataset.full || e.target.src; lb.classList.add("open"); }
  });
  lb.addEventListener("click", () => lb.classList.remove("open"));
}

/* ---------- contact form -> opens WhatsApp ---------- */
const form = $("#contact-form");
if (form) form.addEventListener("submit", e => {
  e.preventDefault();
  const d = Object.fromEntries(new FormData(form));
  window.open(waLink(`Hi! I'm ${d.name}${d.phone ? " (" + d.phone + ")" : ""}.\nInterested in: ${d.topic}\n${d.message}`), "_blank");
});
