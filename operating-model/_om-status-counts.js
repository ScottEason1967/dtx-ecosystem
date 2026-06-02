// =============================================================================
// OM Status Counts — single source of truth
// =============================================================================
// Update the numbers below and BOTH DTx OM - Index.html AND DTx OM - Status.html
// auto-refresh on next browser refresh.
//
// Reason this file exists: fetch() between local HTML files is blocked by every
// modern browser when the page is opened from disk (file:// protocol). The
// previous in-page sync script attempted that fetch and silently failed, leaving
// the Index page showing a stale hardcoded fallback while the Status page showed
// the real number. This shared JS file works regardless of how the pages are
// served — disk, local server, or GitHub Pages.
//
// Author discipline: edit the OM_STATUS_COUNTS object below when items move.
// Don't edit the displayed numbers directly in either HTML page; this script
// will overwrite them on load.
// =============================================================================

window.OM_STATUS_COUNTS = {
  hometest:    { unresolved: 80, in_progress: 36 },
  // Add HealthStore and HealthSync when their Status sections are stood up:
  // healthstore: { unresolved: 0, in_progress: 0 },
  // healthsync:  { unresolved: 0, in_progress: 0 },
};

// Render the counts into matching DOM elements on whichever page is loaded.
(function renderStatusCounts() {
  function apply() {
    var c = window.OM_STATUS_COUNTS;
    if (!c || !c.hometest) return;
    var ht = c.hometest;

    // ----- DTx OM - Index.html targets -----
    var indexUnresolved = document.getElementById('home-count-unresolved');
    var indexInProgress = document.getElementById('home-count-in-progress');
    if (indexUnresolved) indexUnresolved.textContent = ht.unresolved;
    if (indexInProgress) indexInProgress.textContent = ht.in_progress;

    // ----- DTx OM - Status.html targets -----
    // The Status page has explicit ids if they exist, otherwise fall back to
    // the first two .sum-count elements (HomeTest unresolved, then in-flight).
    var statusUnresolved = document.getElementById('status-hometest-unresolved');
    var statusInProgress = document.getElementById('status-hometest-in-progress');
    if (statusUnresolved) statusUnresolved.textContent = ht.unresolved;
    if (statusInProgress) statusInProgress.textContent = ht.in_progress;

    // Backstop: if the ids above don't exist, use the first two .sum-count divs
    // in document order. These are HomeTest unresolved (80) and in flight (35).
    if (!statusUnresolved && !statusInProgress) {
      var sums = document.querySelectorAll('.sum-count');
      if (sums.length >= 1) sums[0].textContent = ht.unresolved;
      if (sums.length >= 2) sums[1].textContent = ht.in_progress;
    }

    // Status page prose: "items tracked today (80 unresolved + 35 in flight)"
    // is autoreplaced if an id exists, otherwise stays whatever was written.
    var prose = document.getElementById('status-prose-totals');
    if (prose) {
      prose.textContent =
        '(' + ht.unresolved + ' unresolved + ' + ht.in_progress + ' in flight)';
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', apply);
  } else {
    apply();
  }
})();
