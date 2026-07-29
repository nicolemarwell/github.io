/* ============================================================
   build.js — static generation for Google Scholar / SEO.
   Run:  node build.js   (from the website/ directory)

   Produces:
     • papers/<id>.html   — one landing page per publication with
       highwire_press citation_* meta tags + JSON-LD (what Scholar indexes)
     • injects a static, crawlable <article.pub> list into publications.html
       (between the BUILD:PUBS markers)
     • sitemap.xml + robots.txt
   Re-run any time data.js changes. Idempotent.
   ============================================================ */
'use strict';
var fs = require('fs');
var path = require('path');

global.window = {};
require('./data.js');
var PUBS = window.PUBS;

var BASE = 'https://nicolemarwell.github.io';

// Hand-written post pages in the AI & Privacy series. These are NOT generated —
// they are only listed here so they get into sitemap.xml. Add a line when a post
// goes live (see README, "Add a post to the AI & Privacy series").
var SERIES_PAGES = [
  'ai-privacy/unknown-unknowns-desktop.html',
  'ai-privacy/unknown-unknowns-terminal.html',
  'ai-privacy/one-folder-every-time-desktop.html',
  'ai-privacy/one-folder-every-time-terminal.html'
];

var TYPE_LABELS = {
  book: 'Book', article: 'Article', chapter: 'Chapter',
  proceedings: 'Conference proceedings', essay: 'Essay / Report',
  review: 'Book review', working: 'Working paper'
};

/* ---- name / citation helpers (mirror pubs.js) ------------- */
var PARTICLES = { de:1, la:1, le:1, van:1, von:1, der:1, del:1, di:1, da:1, dos:1, du:1, bin:1, al:1 };
function famGiven(name) {
  var t = name.trim().split(/\s+/);
  var fam = [t.pop()];
  while (t.length && PARTICLES[t[t.length - 1].toLowerCase()]) fam.unshift(t.pop());
  return { family: fam.join(' '), given: t.join(' ') };
}
function initials(g) { return g ? g.split(/\s+/).map(function (x) { return x.charAt(0).toUpperCase() + '.'; }).join(' ') : ''; }
function apaAuthors(names) {
  var f = names.map(function (n) { var p = famGiven(n); var i = initials(p.given); return p.family + (i ? ', ' + i : ''); });
  if (f.length === 1) return f[0];
  if (f.length === 2) return f[0] + ', & ' + f[1];
  return f.slice(0, -1).join(', ') + ', & ' + f[f.length - 1];
}
function bibAuthors(names) { return names.map(function (n) { var p = famGiven(n); return p.family + (p.given ? ', ' + p.given : ''); }).join(' and '); }
function displayAuthors(names) {
  if (names.length === 1) return names[0];
  if (names.length === 2) return names[0] + ' & ' + names[1];
  return names.slice(0, -1).join(', ') + ', & ' + names[names.length - 1];
}
function venueFull(p) { return p.container + (p.detail ? ', ' + p.detail : ''); }
function doiOf(p) { var m = p.url && p.url.match(/doi\.org\/(.+)$/); return m ? m[1] : null; }
function apaCite(p) {
  var yr = p.forthcoming ? p.year + ', in press' : p.year;
  var s = apaAuthors(p.authors) + ' (' + yr + '). ' + p.title + '. ' + venueFull(p) + '.';
  if (p.url && /^https?:/.test(p.url)) s += ' ' + p.url;
  return s;
}
function citeKey(p) {
  var fam = famGiven(p.authors[0]).family.replace(/[^A-Za-z]/g, '').toLowerCase();
  var w = ((p.title.match(/[A-Za-z]{4,}/)) || ['ref'])[0].toLowerCase();
  return fam + p.year + w;
}
function bibType(t) { return ({ book: 'book', article: 'article', chapter: 'incollection', proceedings: 'inproceedings' })[t] || 'misc'; }
function bibCite(p) {
  var f = [];
  f.push('author = {' + bibAuthors(p.authors) + '}');
  f.push('title = {' + p.title + '}');
  if (p.type === 'article') f.push('journal = {' + p.container + '}');
  else if (p.type === 'chapter' || p.type === 'proceedings') f.push('booktitle = {' + p.container + '}');
  else if (p.type === 'book') f.push('publisher = {' + p.container + '}');
  else f.push('howpublished = {' + p.container + '}');
  f.push('year = {' + p.year + '}');
  var doi = doiOf(p);
  if (doi) f.push('doi = {' + doi + '}');
  else if (p.url) f.push('url = {' + p.url + '}');
  return '@' + bibType(p.type) + '{' + citeKey(p) + ',\n  ' + f.join(',\n  ') + '\n}';
}

/* ---- escaping -------------------------------------------- */
function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
function escAttr(s) { return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

/* ---- citation meta per paper ----------------------------- */
function citationMeta(p) {
  var m = [];
  m.push('<meta name="citation_title" content="' + escAttr(p.title) + '">');
  p.authors.forEach(function (a) { m.push('<meta name="citation_author" content="' + escAttr(a) + '">'); });
  m.push('<meta name="citation_publication_date" content="' + p.year + '">');
  if (p.type === 'article' || p.type === 'essay' || p.type === 'review') m.push('<meta name="citation_journal_title" content="' + escAttr(p.container) + '">');
  else if (p.type === 'proceedings') m.push('<meta name="citation_conference_title" content="' + escAttr(p.container) + '">');
  else if (p.type === 'chapter') m.push('<meta name="citation_inbook_title" content="' + escAttr(p.container) + '">');
  else if (p.type === 'book') m.push('<meta name="citation_publisher" content="' + escAttr(p.container) + '">');
  else m.push('<meta name="citation_technical_report_institution" content="' + escAttr(p.container) + '">');
  var doi = doiOf(p);
  if (doi) m.push('<meta name="citation_doi" content="' + escAttr(doi) + '">');
  if (p.url && /\.pdf($|\?)/i.test(p.url)) m.push('<meta name="citation_pdf_url" content="' + escAttr(p.url) + '">');
  m.push('<meta name="citation_abstract_html_url" content="' + BASE + '/papers/' + p.id + '.html">');
  return m.join('\n  ');
}
function jsonLd(p) {
  var obj = {
    '@context': 'https://schema.org',
    '@type': p.type === 'book' ? 'Book' : 'ScholarlyArticle',
    name: p.title,
    author: p.authors.map(function (a) { return { '@type': 'Person', name: a }; }),
    datePublished: String(p.year),
    inLanguage: 'en'
  };
  if (p.type === 'book') obj.publisher = { '@type': 'Organization', name: p.container };
  else obj.isPartOf = { '@type': 'PublicationVolume', name: p.container };
  var doi = doiOf(p);
  if (doi) obj.sameAs = 'https://doi.org/' + doi;
  else if (p.url) obj.sameAs = p.url;
  return JSON.stringify(obj, null, 2);
}

/* ---- shared nav + footer (with ../ prefix for /papers/) --- */
function nav(prefix) {
  return '' +
'  <header class="nav">\n' +
'    <div class="nav-inner">\n' +
'      <a class="brand" href="' + prefix + 'index.html" aria-label="Nicole P. Marwell — home"><span class="brand-mark">NM</span><span class="brand-name">Nicole&nbsp;P.&nbsp;Marwell</span></a>\n' +
'      <button class="nav-toggle" aria-label="Toggle menu" aria-expanded="false" aria-controls="nav-links"><span></span><span></span><span></span></button>\n' +
'      <nav class="nav-links" id="nav-links" aria-label="Primary">\n' +
'        <a href="' + prefix + 'research.html">Research</a>\n' +
'        <a href="' + prefix + 'publications.html" class="active">Publications</a>\n' +
'        <a href="' + prefix + 'grants.html">Grants</a>\n' +
'        <a href="' + prefix + 'teaching.html">Teaching</a>\n' +
'        <a href="' + prefix + 'media.html">Media</a>\n' +
'        <a href="' + prefix + 'ai-privacy.html">AI &amp; Privacy</a>\n' +
'        <a href="' + prefix + 'about.html">About</a>\n' +
'        <a class="btn btn-primary" href="' + prefix + 'cv.pdf">CV <span class="arrow">↓</span></a>\n' +
'      </nav>\n' +
'    </div>\n' +
'  </header>\n';
}
function footer(prefix) {
  return '' +
'  <footer class="footer"><div class="wrap">\n' +
'    <div class="footer-top">\n' +
'      <div class="footer-brand"><span class="brand-name">Nicole P. Marwell</span><p>Professor, Crown Family School of Social Work, Policy, and Practice, University of Chicago.</p></div>\n' +
'      <div class="footer-col"><h4>Explore</h4><a href="' + prefix + 'research.html">Research</a><a href="' + prefix + 'publications.html">Publications</a><a href="' + prefix + 'grants.html">Grants</a><a href="' + prefix + 'teaching.html">Teaching</a><a href="' + prefix + 'media.html">Media</a><a href="' + prefix + 'ai-privacy.html">AI &amp; Privacy</a><a href="' + prefix + 'about.html">About</a></div>\n' +
'      <div class="footer-col"><h4>Connect</h4><a href="mailto:nmarwell@uchicago.edu">nmarwell@uchicago.edu</a><a href="https://scholar.google.com/citations?user=d5DbR3IAAAAJ&hl=en" target="_blank" rel="noopener">Google Scholar</a><a href="https://papers.ssrn.com/sol3/cf_dev/AbsByAuth.cfm?per_id=3950121" target="_blank" rel="noopener">SSRN</a><a href="https://orcid.org/0000-0001-5748-3179" target="_blank" rel="noopener">ORCID</a><a href="' + prefix + 'cv.pdf">Curriculum Vitae (PDF)</a></div>\n' +
'    </div>\n' +
'    <div class="footer-bottom"><span>© <span data-year>2026</span> Nicole P. Marwell</span><span>University of Chicago · Edith Abbott Hall, Chicago, IL</span></div>\n' +
'  </div></footer>\n';
}

/* ---- per-paper page -------------------------------------- */
function paperPage(p) {
  var desc = (p.abstract || (p.title + '. ' + venueFull(p))).replace(/\s+/g, ' ').slice(0, 180);
  var badges = '<span class="pub-badge type">' + TYPE_LABELS[p.type] + '</span>' +
    (p.forthcoming ? '<span class="pub-badge forth">Forthcoming</span>' : '') +
    (p.award ? '<span class="pub-badge award">' + esc(p.award) + '</span>' : '');
  var linkBtn = p.url ? '<a class="btn btn-primary" href="' + escAttr(p.url) + '" target="_blank" rel="noopener">' + esc(p.urlLabel || 'View') + ' <span class="arrow">↗</span></a>' : '';
  return '<!DOCTYPE html>\n<html lang="en">\n<head>\n' +
'  <meta charset="UTF-8" />\n  <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n' +
'  <title>' + esc(p.title) + ' | Nicole P. Marwell</title>\n' +
'  <meta name="description" content="' + escAttr(desc) + '" />\n' +
'  <link rel="canonical" href="' + BASE + '/papers/' + p.id + '.html" />\n' +
'  ' + citationMeta(p) + '\n' +
'  <script type="application/ld+json">\n' + jsonLd(p) + '\n  </' + 'script>\n' +
'  <link rel="preconnect" href="https://fonts.googleapis.com" />\n  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />\n' +
'  <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400;1,9..144,500&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&display=swap" rel="stylesheet" />\n' +
'  <link rel="stylesheet" href="../styles.css" />\n</head>\n<body>\n' +
nav('../') +
'  <main>\n' +
'    <section class="page-head"><div class="wrap paper-wrap">\n' +
'      <div class="paper-breadcrumb"><a href="../publications.html">← All publications</a></div>\n' +
'      <div class="paper-head">\n' +
'        <span class="eyebrow">' + TYPE_LABELS[p.type] + (p.award ? ' · ' + esc(p.award) : '') + '</span>\n' +
'        <h1>' + esc(p.title) + '</h1>\n' +
'        <p class="pub-authors">' + esc(displayAuthors(p.authors)) + '</p>\n' +
'        <p class="pub-venue">' + esc(venueFull(p)) + (p.forthcoming ? ' · Forthcoming' : '') + '</p>\n' +
'        <div class="pub-badges" style="margin-top:12px;">' + badges + '</div>\n' +
'      </div>\n' +
'    </div></section>\n' +
'    <section class="section" style="padding-top:0;"><div class="wrap paper-wrap">\n' +
'      <div class="paper-links">' + linkBtn + '</div>\n' +
(p.abstract ? '      <h2 class="paper-section-title">Abstract</h2>\n      <p class="paper-abstract">' + esc(p.abstract) + '</p>\n' : '') +
'      <h2 class="paper-section-title">Cite</h2>\n' +
'      <div class="cite-box"><span class="cite-text">' + esc(apaCite(p)) + '</span><br><button class="cite-btn copy-btn" type="button" data-copy="' + escAttr(apaCite(p)) + '">Copy reference</button></div>\n' +
'      <details class="cite-box bib"><summary style="cursor:pointer;font-weight:600;color:var(--plum);">BibTeX</summary><pre>' + esc(bibCite(p)) + '</pre><button class="cite-btn copy-btn" type="button" data-copy="' + escAttr(bibCite(p)) + '">Copy BibTeX</button></details>\n' +
'    </div></section>\n' +
'  </main>\n' +
footer('../') +
'  <script src="../main.js"></' + 'script>\n' +
'  <script>\n' +
'  document.querySelectorAll(".copy-btn").forEach(function(b){b.addEventListener("click",function(){var t=b.getAttribute("data-copy");(navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(t):Promise.reject()).then(function(){b.textContent="Copied!";setTimeout(function(){b.textContent=b.getAttribute("data-copy").indexOf("@")===0?"Copy BibTeX":"Copy reference";},1600);},function(){var ta=document.createElement("textarea");ta.value=t;document.body.appendChild(ta);ta.select();try{document.execCommand("copy");b.textContent="Copied!";}catch(e){}document.body.removeChild(ta);});});});\n' +
'  </' + 'script>\n' +
'</body>\n</html>\n';
}

/* ---- crawlable list item (static) ------------------------ */
function listItem(p) {
  var actions = '';
  if (p.url) actions += '<a class="pub-link" href="' + escAttr(p.url) + '" target="_blank" rel="noopener">' + esc(p.urlLabel || 'Link') + ' ↗</a> ';
  actions += '<a class="pub-link" href="papers/' + p.id + '.html">Details</a>';
  return '<article class="pub" data-type="' + p.type + '" data-themes="' + (p.themes || []).join(' ') + '" data-year="' + p.year + '">' +
    '<div class="pub-year">' + p.year + '</div>' +
    '<div class="pub-body">' +
      '<h3 class="pub-title"><a href="papers/' + p.id + '.html">' + esc(p.title) + '</a></h3>' +
      '<div class="pub-authors">' + esc(displayAuthors(p.authors)) + '</div>' +
      '<div class="pub-venue">' + esc(venueFull(p)) + '</div>' +
      (p.abstract ? '<div class="pub-abstract" hidden>' + esc(p.abstract) + '</div>' : '') +
      '<div class="pub-actions">' + actions + '</div>' +
    '</div></article>';
}

/* ============================================================ */
var pubsSorted = PUBS.slice().sort(function (a, b) { return b.year - a.year; });

// 1) per-paper pages
var papersDir = path.join(__dirname, 'papers');
if (!fs.existsSync(papersDir)) fs.mkdirSync(papersDir);
pubsSorted.forEach(function (p) { fs.writeFileSync(path.join(papersDir, p.id + '.html'), paperPage(p)); });

// 2) inject crawlable list into publications.html
var pubFile = path.join(__dirname, 'publications.html');
var html = fs.readFileSync(pubFile, 'utf8');
var listHtml = '\n' + pubsSorted.map(listItem).join('\n') + '\n';
html = html.replace(/<!--BUILD:PUBS:START-->[\s\S]*?<!--BUILD:PUBS:END-->/,
  '<!--BUILD:PUBS:START-->' + listHtml + '<!--BUILD:PUBS:END-->');
fs.writeFileSync(pubFile, html);

// 3) sitemap.xml + robots.txt
var pages = ['', 'research.html', 'publications.html', 'grants.html', 'teaching.html', 'media.html', 'ai-privacy.html', 'about.html']
  .concat(SERIES_PAGES)
  .concat(pubsSorted.map(function (p) { return 'papers/' + p.id + '.html'; }));
var sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  pages.map(function (u) { return '  <url><loc>' + BASE + '/' + u + '</loc></url>'; }).join('\n') + '\n</urlset>\n';
fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), sitemap);
fs.writeFileSync(path.join(__dirname, 'robots.txt'), 'User-agent: *\nAllow: /\nSitemap: ' + BASE + '/sitemap.xml\n');

console.log('Built ' + pubsSorted.length + ' paper pages, injected list, wrote sitemap.xml + robots.txt.');
