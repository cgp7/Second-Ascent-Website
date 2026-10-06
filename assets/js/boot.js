/* Runs before first paint: marks JS as available and decides how the home intro plays.
   full = first visit, short = seen in the last 30 days, skip = moving between pages this visit. */
(function () {
  var d = document.documentElement;
  d.classList.add('js');
  if (!d.hasAttribute('data-has-intro')) return;
  var mode = 'full';
  try {
    if (sessionStorage.getItem('sa-session')) mode = 'skip';
    else {
      var seen = +localStorage.getItem('sa-intro-seen') || 0;
      if (seen && Date.now() - seen < 2592e6) mode = 'short';
    }
  } catch (e) { /* storage blocked: play the full intro */ }
  if (location.hash && location.hash.length > 1) mode = 'skip';
  if (/[?&]intro=1\b/.test(location.search)) mode = 'full';
  d.setAttribute('data-intro', mode);
  if (mode !== 'skip') {
    d.classList.add('intro-active');
    // Safety net: if main.js never takes over (blocked or failed), never trap the visitor.
    setTimeout(function () {
      if (!window.__saIntro) { d.setAttribute('data-intro', 'skip'); d.classList.remove('intro-active'); }
    }, 6000);
  }
})();
try { sessionStorage.setItem('sa-session', '1'); } catch (e) {}
