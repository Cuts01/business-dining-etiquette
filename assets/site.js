
(function(){
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navlinks a').forEach(a => {
    if (a.getAttribute('href') === path) {
      a.setAttribute('aria-current', 'page');
    }
  });
})();

const THEME_KEY = 'bde-theme';

function applyTheme(mode){
  document.documentElement.setAttribute('data-theme', mode);
  localStorage.setItem(THEME_KEY, mode);
  updateToggleIcon(mode);
}

function updateToggleIcon(mode){
  const el = document.getElementById('themeToggleIcon');
  if (!el) return;
  if (mode === 'dark'){
    el.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>';
  } else {
    el.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.76 4.84l-1.8-1.79L3.17 4.83l1.79 1.8 1.8-1.79zm10.48 0l1.79-1.79 1.79 1.78-1.79 1.81-1.79-1.8zM12 4V1h0v3zm0 19v-3h0v3zM4 12H1v0h3zm19 0h-3v0h3zM6.76 19.16l-1.8 1.79-1.79-1.78 1.81-1.81 1.78 1.8zm10.48 0l1.79 1.79 1.79-1.78-1.79-1.81-1.79 1.8zM12 8a4 4 0 100 8 4 4 0 000-8z"/></svg>';
  }
}

(function initTheme(){
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === 'light' || saved === 'dark'){
    applyTheme(saved);
  } else {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(prefersDark ? 'dark' : 'light');
  }
})();

function toggleTheme(){
  const cur = document.documentElement.getAttribute('data-theme');
  applyTheme(cur === 'dark' ? 'light' : 'dark');
}

function psSelect(id){
  const parts = ['fork','knife','spoon','plate','bread','water','napkin'];
  parts.forEach(p => {
    const el = document.getElementById('ps-' + p);
    const btn = document.getElementById('btn-' + p);
    if (!el || !btn) return;
    if (p === id){
      el.style.filter = 'drop-shadow(0 0 8px rgba(0,0,0,0.8))';
      btn.classList.add('active');
    } else {
      el.style.filter = 'none';
      btn.classList.remove('active');
    }
  });
}

function playVideo(el, id){
  const iframe = document.createElement('iframe');
  iframe.width = '560';
  iframe.height = '315';
  iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
  iframe.allowFullscreen = true;
  iframe.style = 'position:absolute; inset:0; width:100%; height:100%; border:0; border-radius:18px;';
  iframe.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&modestbranding=1&rel=0';
  el.innerHTML = '';
  el.appendChild(iframe);
}

window.toggleTheme = toggleTheme;
window.psSelect = psSelect;
window.playVideo = playVideo;
