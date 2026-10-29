/* Dataset search for the Mercenomics Data page.
   Runs entirely in the visitor's browser: it only shows or hides the
   datasets already on the page. Nothing is sent anywhere, nothing is
   stored, and what is typed is never inserted into the page as HTML. */
(function () {
  'use strict';

  var finder = document.getElementById('finder');
  var input = document.getElementById('q');
  var status = document.getElementById('finder-status');
  var empty = document.getElementById('finder-empty');
  if (!finder || !input || !status || !empty) return;

  function norm(s) {
    return String(s)
      .normalize('NFKD').replace(/[̀-ͯ]/g, '')
      .toLowerCase()
      .replace(/https?:\/\/(dx\.)?doi\.org\//g, ' ')
      .replace(/\bdoi:\s*/g, ' ')
      .replace(/[^a-z0-9.\/]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  // One entry per dataset: the table row, its section below, and its search text.
  var datasets = {};
  var parts = document.querySelectorAll('[data-ds]');
  for (var i = 0; i < parts.length; i++) {
    var key = parts[i].getAttribute('data-ds');
    var d = datasets[key] || (datasets[key] = { els: [], text: '' });
    d.els.push(parts[i]);
    d.text += ' ' + (parts[i].getAttribute('data-search') || '') + ' ' + parts[i].textContent;
  }
  var keys = Object.keys(datasets);
  for (var k = 0; k < keys.length; k++) datasets[keys[k]].text = ' ' + norm(datasets[keys[k]].text) + ' ';

  // A word matches from its start ("afghan" finds "Afghanistan"); a term with
  // digits (a DOI, a year) may match anywhere.
  function has(text, term) {
    return /[0-9]/.test(term) ? text.indexOf(term) !== -1 : text.indexOf(' ' + term) !== -1 ||
      text.indexOf('/' + term) !== -1 || text.indexOf('.' + term) !== -1;
  }

  function matches(d, q, terms, phraseMode) {
    if (phraseMode) return d.text.indexOf(' ' + q) !== -1;
    for (var t = 0; t < terms.length; t++) if (!has(d.text, terms[t])) return false;
    return true;
  }

  function run() {
    var q = norm(input.value.slice(0, 100));
    var terms = q ? q.split(' ') : [];
    // If several words appear together as a phrase somewhere, show only those.
    var phraseMode = false;
    if (terms.length > 1) {
      for (var p = 0; p < keys.length; p++) {
        if (datasets[keys[p]].text.indexOf(' ' + q) !== -1) { phraseMode = true; break; }
      }
    }
    var shown = 0;
    for (var k = 0; k < keys.length; k++) {
      var d = datasets[keys[k]];
      var match = matches(d, q, terms, phraseMode);
      if (match) shown++;
      for (var e = 0; e < d.els.length; e++) d.els[e].hidden = !match;
    }
    empty.hidden = shown !== 0;
    status.textContent = terms.length
      ? shown + ' of ' + keys.length + (keys.length === 1 ? ' dataset matches.' : ' datasets match.')
      : '';
  }

  input.addEventListener('input', run);
  finder.addEventListener('submit', function (ev) { ev.preventDefault(); run(); });

  // Allow links such as /data/?q=Afghanistan
  try {
    var initial = new URLSearchParams(window.location.search).get('q');
    if (initial) { input.value = initial.slice(0, 100); }
  } catch (err) { /* old browser: start empty */ }

  finder.hidden = false;
  run();
})();
