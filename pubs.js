/* ============================================================
   Publications page — render, filter, search, sort, cite.
   Depends on window.PUBS (data.js).
   ============================================================ */
(function () {
  'use strict';
  var PUBS = window.PUBS || [];

  var TYPE_LABELS = {
    book: 'Book', article: 'Article', chapter: 'Chapter',
    proceedings: 'Proceedings', essay: 'Essay / Report',
    review: 'Book review', working: 'Working paper'
  };
  var THEME_LABELS = { nonprofit: 'Nonprofit & Governance', internet: 'Internet Innovation' };

  /* ---- Name / citation formatting -------------------------- */
  var PARTICLES = { de:1, la:1, le:1, van:1, von:1, der:1, del:1, di:1, da:1, dos:1, du:1, bin:1, al:1 };
  function famGiven(name) {
    var t = name.trim().split(/\s+/);
    var fam = [t.pop()];
    while (t.length && PARTICLES[t[t.length - 1].toLowerCase()]) fam.unshift(t.pop());
    return { family: fam.join(' '), given: t.join(' ') };
  }
  function initials(given) {
    if (!given) return '';
    return given.split(/\s+/).map(function (g) { return g.charAt(0).toUpperCase() + '.'; }).join(' ');
  }
  function apaAuthors(names) {
    var fmt = names.map(function (n) { var p = famGiven(n); var i = initials(p.given); return p.family + (i ? ', ' + i : ''); });
    if (fmt.length === 1) return fmt[0];
    if (fmt.length === 2) return fmt[0] + ', & ' + fmt[1];
    return fmt.slice(0, -1).join(', ') + ', & ' + fmt[fmt.length - 1];
  }
  function bibAuthors(names) {
    return names.map(function (n) { var p = famGiven(n); return p.family + (p.given ? ', ' + p.given : ''); }).join(' and ');
  }
  function venueFull(p) { return p.container + (p.detail ? ', ' + p.detail : ''); }

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
    var doiMatch = p.url && p.url.match(/doi\.org\/(.+)$/);
    if (doiMatch) f.push('doi = {' + doiMatch[1] + '}');
    else if (p.url) f.push('url = {' + p.url + '}');
    return '@' + bibType(p.type) + '{' + citeKey(p) + ',\n  ' + f.join(',\n  ') + '\n}';
  }

  /* ---- Display helpers ------------------------------------- */
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function authorLine(names) {
    var out = names.map(function (n) {
      return n === 'Nicole P. Marwell' ? '<strong>' + n + '</strong>' : esc(n);
    });
    if (out.length === 1) return out[0];
    if (out.length === 2) return out[0] + ' & ' + out[1];
    return out.slice(0, -1).join(', ') + ', & ' + out[out.length - 1];
  }

  /* ---- Build one publication node -------------------------- */
  function buildNode(p) {
    var el = document.createElement('article');
    el.className = 'pub';
    el.setAttribute('data-type', p.type);
    el.setAttribute('data-themes', (p.themes || []).join(' '));
    el.setAttribute('data-year', p.year);
    el.setAttribute('data-text', (p.title + ' ' + p.authors.join(' ') + ' ' + p.container).toLowerCase());

    var badges = '<span class="pub-badge type">' + TYPE_LABELS[p.type] + '</span>';
    if (p.forthcoming) badges += '<span class="pub-badge forth">Forthcoming</span>';
    if (p.award) badges += '<span class="pub-badge award">' + esc(p.award) + '</span>';

    var actions = '';
    if (p.pdf) actions += '<a class="pub-link" href="' + p.pdf + '">PDF <span aria-hidden="true">↓</span></a>';
    if (p.url) actions += '<a class="pub-link" href="' + p.url + '" target="_blank" rel="noopener">' + (p.urlLabel || 'Link') + ' <span aria-hidden="true">↗</span></a>';
    if (p.abstract) actions += '<button class="pub-abstract-toggle" type="button" aria-expanded="false">Abstract</button>';
    actions +=
      '<span class="pub-cite">' +
        '<button class="cite-btn" type="button" aria-haspopup="true" aria-expanded="false">Cite <span aria-hidden="true">▾</span></button>' +
        '<span class="cite-menu" role="menu">' +
          '<button type="button" data-cite="apa" role="menuitem">Copy reference</button>' +
          '<button type="button" data-cite="bibtex" role="menuitem">Copy BibTeX</button>' +
        '</span>' +
      '</span>';

    el.innerHTML =
      '<div class="pub-year">' + p.year + '</div>' +
      '<div class="pub-body">' +
        '<h3 class="pub-title"><a href="papers/' + p.id + '.html">' + esc(p.title) + '</a></h3>' +
        '<div class="pub-authors">' + authorLine(p.authors) + '</div>' +
        '<div class="pub-venue">' + esc(venueFull(p)) + '</div>' +
        '<div class="pub-badges">' + badges + '</div>' +
        '<div class="pub-actions">' + actions + '</div>' +
        (p.abstract ? '<div class="pub-abstract" hidden>' + esc(p.abstract) + '</div>' : '') +
      '</div>';

    // abstract toggle
    var atog = el.querySelector('.pub-abstract-toggle');
    if (atog) {
      atog.addEventListener('click', function () {
        var ab = el.querySelector('.pub-abstract');
        var open = ab.hasAttribute('hidden');
        if (open) { ab.removeAttribute('hidden'); atog.setAttribute('aria-expanded', 'true'); atog.textContent = 'Hide abstract'; }
        else { ab.setAttribute('hidden', ''); atog.setAttribute('aria-expanded', 'false'); atog.textContent = 'Abstract'; }
      });
    }

    // cite menu
    var citeWrap = el.querySelector('.pub-cite');
    var citeBtn = citeWrap.querySelector('.cite-btn');
    citeBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      var isOpen = citeWrap.classList.contains('open');
      closeAllCiteMenus();
      if (!isOpen) { citeWrap.classList.add('open'); citeBtn.setAttribute('aria-expanded', 'true'); }
    });
    citeWrap.querySelectorAll('[data-cite]').forEach(function (b) {
      b.addEventListener('click', function () {
        var text = b.getAttribute('data-cite') === 'bibtex' ? bibCite(p) : apaCite(p);
        copyText(text, b.getAttribute('data-cite') === 'bibtex' ? 'BibTeX copied' : 'Reference copied');
        closeAllCiteMenus();
      });
    });

    return el;
  }

  function closeAllCiteMenus() {
    document.querySelectorAll('.pub-cite.open').forEach(function (w) {
      w.classList.remove('open');
      var b = w.querySelector('.cite-btn'); if (b) b.setAttribute('aria-expanded', 'false');
    });
  }
  document.addEventListener('click', closeAllCiteMenus);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeAllCiteMenus(); });

  /* ---- Clipboard + toast ----------------------------------- */
  var toastEl;
  function toast(msg) {
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.className = 'toast';
      toastEl.setAttribute('role', 'status');
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastEl._t);
    toastEl._t = setTimeout(function () { toastEl.classList.remove('show'); }, 2200);
  }
  function copyText(text, okMsg) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { toast(okMsg); }, function () { fallbackCopy(text, okMsg); });
    } else { fallbackCopy(text, okMsg); }
  }
  function fallbackCopy(text, okMsg) {
    var ta = document.createElement('textarea');
    ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); toast(okMsg); } catch (e) { toast('Copy failed — select manually'); }
    document.body.removeChild(ta);
  }

  /* ---- State + filtering ----------------------------------- */
  var state = { theme: 'all', type: 'all', q: '', sort: 'desc' };
  var listEl = document.getElementById('pub-list');
  var countEl = document.getElementById('pub-count');
  var emptyEl = document.getElementById('pub-empty');
  var nodes = [];

  function render() {
    var frag = document.createDocumentFragment();
    var sorted = PUBS.slice().sort(function (a, b) { return state.sort === 'asc' ? a.year - b.year : b.year - a.year; });
    nodes = sorted.map(function (p) { var n = buildNode(p); frag.appendChild(n); return { p: p, el: n }; });
    listEl.innerHTML = '';
    listEl.appendChild(frag);
    applyFilters();
  }

  function applyFilters() {
    var shown = 0;
    nodes.forEach(function (n) {
      var p = n.p;
      var okTheme = state.theme === 'all' || (p.themes || []).indexOf(state.theme) !== -1;
      var okType = state.type === 'all' || p.type === state.type;
      var okQ = !state.q || n.el.getAttribute('data-text').indexOf(state.q) !== -1;
      var show = okTheme && okType && okQ;
      if (show) { n.el.removeAttribute('hidden'); shown++; } else { n.el.setAttribute('hidden', ''); }
    });
    countEl.textContent = shown + (shown === 1 ? ' publication' : ' publications');
    emptyEl.hidden = shown !== 0;
  }

  /* ---- Wire up controls ------------------------------------ */
  function initChips(groupId, key) {
    var group = document.getElementById(groupId);
    if (!group) return;
    group.addEventListener('click', function (e) {
      var chip = e.target.closest('.chip');
      if (!chip) return;
      group.querySelectorAll('.chip').forEach(function (c) { c.classList.remove('active'); c.setAttribute('aria-pressed', 'false'); });
      chip.classList.add('active'); chip.setAttribute('aria-pressed', 'true');
      state[key] = chip.getAttribute('data-value');
      applyFilters();
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initChips('filter-theme', 'theme');
    initChips('filter-type', 'type');

    var search = document.getElementById('pub-search');
    if (search) search.addEventListener('input', function () { state.q = this.value.trim().toLowerCase(); applyFilters(); });

    var sortBtn = document.getElementById('pub-sort');
    if (sortBtn) sortBtn.addEventListener('click', function () {
      state.sort = state.sort === 'desc' ? 'asc' : 'desc';
      this.querySelector('.sort-val').textContent = state.sort === 'desc' ? 'Newest' : 'Oldest';
      render();
    });

    render();
  });
})();
