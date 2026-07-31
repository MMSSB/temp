document.addEventListener('DOMContentLoaded', () => {
  // 1. Idle Floated Navbar -> Solid when Scrolled
  const navbar = document.getElementById('navbar');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 2. Collapsible Bottom-Left Theme Widget
  const themeTriggerBtn = document.getElementById('themeTriggerBtn');
  const themeOptionsCollapse = document.getElementById('themeOptionsCollapse');
  const themeButtons = document.querySelectorAll('.theme-options-collapse .theme-pill-btn');
  const activeThemeIcon = document.getElementById('activeThemeIcon');
  const htmlEl = document.documentElement;

  // Toggle Collapse/Expand on Trigger Click
  themeTriggerBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    themeOptionsCollapse.classList.toggle('open');
  });

  // Close when clicking outside anywhere on the page
  document.addEventListener('click', () => {
    themeOptionsCollapse.classList.remove('open');
  });

  // Load saved preference or fallback to system
  const savedTheme = localStorage.getItem('ulive-theme') || 'system';
  applyTheme(savedTheme);

  themeButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const mode = btn.getAttribute('data-mode');
      applyTheme(mode);
      localStorage.setItem('ulive-theme', mode);
      
      // Auto-collapse menu after choosing
      themeOptionsCollapse.classList.remove('open');
    });
  });

  function applyTheme(mode) {
    htmlEl.setAttribute('data-theme', mode);
    
    // Update active pill highlight state
    themeButtons.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-mode') === mode);
    });

    // Update main trigger circular icon to reflect current theme
    activeThemeIcon.className = '';
    if (mode === 'light') {
      activeThemeIcon.className = 'ph ph-sun';
    } else if (mode === 'dark') {
      activeThemeIcon.className = 'ph ph-moon';
    } else {
      activeThemeIcon.className = 'ph ph-desktop';
    }
  }

  // 3. Interactive Heart Like Counter Toggle
  const likeToggle = document.getElementById('likeToggle');
  let isLiked = false;

  likeToggle.addEventListener('click', () => {
    isLiked = !isLiked;
    likeToggle.classList.toggle('active', isLiked);
  });

  // 4. Navigation Link Active Switcher
  const navLinks = document.querySelectorAll('.nav-links a');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });

  // 5. Active / Pending Tab Switcher
  const tabButtons = document.querySelectorAll('.tab-btn');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
    });
  });
});