(function () {
  var LINE_X = 36;
  var CROSS  = 12;
  var HALF   = CROSS / 2;

  function addCross(top, isRight) {
    var el = document.createElement('div');
    el.className = 'chrome-cross';
    el.setAttribute('aria-hidden', 'true');
    el.style.top = (top - HALF) + 'px';
    if (isRight) {
      el.style.right = (LINE_X - HALF) + 'px';
    } else {
      el.style.left = (LINE_X - HALF) + 'px';
    }
    document.body.appendChild(el);
  }

  function placeCrosses() {
    var old = document.querySelectorAll('.chrome-cross');
    for (var i = 0; i < old.length; i++) old[i].parentNode.removeChild(old[i]);

    var seen = {};
    var tops = [0];

    var targets = document.querySelectorAll('header.site-header, section, main > *');
    for (var j = 0; j < targets.length; j++) {
      var rect = targets[j].getBoundingClientRect();
      var t = Math.round(rect.top + window.pageYOffset);
      if (!seen[t]) { seen[t] = true; tops.push(t); }
    }

    var docH = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    tops.push(docH);

    for (var k = 0; k < tops.length; k++) {
      addCross(tops[k], false);
      addCross(tops[k], true);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', placeCrosses);
  } else {
    placeCrosses();
  }

  window.addEventListener('load', placeCrosses);
  window.addEventListener('resize', function () {
    clearTimeout(window._chromeTimer);
    window._chromeTimer = setTimeout(placeCrosses, 120);
  });
})();
