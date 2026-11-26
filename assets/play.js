/* 游戏站：主题切换、搜索/分类/难度筛选、最近游玩（本机）。 */
(function () {
  var root = document.documentElement;

  function themeInit() {
    try {
      var t = localStorage.getItem('crypto-theme');
      if (t === 'dark' || t === 'light') root.setAttribute('data-theme', t);
    } catch (e) {}
    var btn = document.querySelector('[data-theme-toggle]');
    if (btn) btn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('crypto-theme', next); } catch (e) {}
      var icon = btn.querySelector('[data-theme-icon]');
      if (icon) icon.textContent = next === 'dark' ? '☾' : '☀';
    });
  }

  function filters() {
    var grid = document.querySelector('[data-game-grid]');
    if (!grid) return;
    var input = document.querySelector('[data-game-search]');
    var cat = '';
    var lvl = '';
    var count = document.querySelector('[data-game-count]');
    var cards = [].slice.call(grid.querySelectorAll('[data-game-card]'));
    function apply() {
      var q = (input && input.value || '').trim().toLowerCase();
      var shown = 0;
      cards.forEach(function (card) {
        var text = (card.getAttribute('data-search') || '').toLowerCase();
        var ok = (!q || text.indexOf(q) >= 0) && (!cat || card.getAttribute('data-category') === cat) && (!lvl || card.getAttribute('data-level') === lvl);
        card.hidden = !ok;
        if (ok) shown++;
      });
      if (count) count.textContent = shown + ' / ' + cards.length + ' 款';
      var empty = document.querySelector('[data-game-empty]');
      if (empty) empty.hidden = shown > 0;
    }
    if (input) input.addEventListener('input', apply);
    document.querySelectorAll('[data-filter-cat]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        document.querySelectorAll('[data-filter-cat]').forEach(function (b) { b.setAttribute('aria-pressed', 'false'); });
        btn.setAttribute('aria-pressed', 'true');
        cat = btn.getAttribute('data-filter-cat');
        apply();
      });
    });
    document.querySelectorAll('[data-filter-level]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        document.querySelectorAll('[data-filter-level]').forEach(function (b) { b.setAttribute('aria-pressed', 'false'); });
        var v = btn.getAttribute('data-filter-level');
        if (lvl === v) { lvl = ''; btn.setAttribute('aria-pressed', 'false'); }
        else { lvl = v; btn.setAttribute('aria-pressed', 'true'); }
        apply();
      });
    });
    apply();
  }

  function remember() {
    document.querySelectorAll('[data-game-link]').forEach(function (a) {
      a.addEventListener('click', function () {
        try { localStorage.setItem('crypto-last-game', a.getAttribute('data-game-link')); } catch (e) {}
      });
    });
  }

  function fullscreen() {
    var btn = document.querySelector('[data-fullscreen]');
    var frame = document.querySelector('.player-frame');
    if (!btn || !frame) return;
    btn.addEventListener('click', function () {
      var el = frame;
      if (!document.fullscreenElement && !document.webkitFullscreenElement) {
        if (el.requestFullscreen) el.requestFullscreen();
        else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
      } else {
        if (document.exitFullscreen) document.exitFullscreen();
        else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
      }
    });
  }

  function readableKnowledge() {
    document.querySelectorAll('.game-know').forEach(function (el) {
      var text = el.textContent || '';
      if (text.indexOf('知识：') === 0) el.textContent = '相关知识条目 →';
      else if (text.indexOf('对应课程：') === 0) el.textContent = '对应课程 →';
    });
  }

  themeInit();
  filters();
  remember();
  readableKnowledge();
})();
