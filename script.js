// // document.addEventListener('DOMContentLoaded', () => {
// //   // 1. Idle Floated Navbar -> Solid when Scrolled
// //   const navbar = document.getElementById('navbar');
  
// //   window.addEventListener('scroll', () => {
// //     if (window.scrollY > 10) {
// //       navbar.classList.add('scrolled');
// //     } else {
// //       navbar.classList.remove('scrolled');
// //     }
// //   });

// //   // 2. User Avatar Profile Dropdown Toggle with Animated Transition
// //   const userAvatarBtn = document.getElementById('userAvatarBtn');
// //   const profileDropdown = document.getElementById('profileDropdown');

// //   userAvatarBtn.addEventListener('click', (e) => {
// //     e.stopPropagation();
// //     profileDropdown.classList.toggle('show');
// //     userAvatarBtn.classList.toggle('active');
// //   });

// //   // 3. Collapsible Bottom-Left Theme Widget
// //   const themeTriggerBtn = document.getElementById('themeTriggerBtn');
// //   const themeOptionsCollapse = document.getElementById('themeOptionsCollapse');
// //   const themeButtons = document.querySelectorAll('.theme-options-collapse .theme-pill-btn');
// //   const activeThemeIcon = document.getElementById('activeThemeIcon');
// //   const htmlEl = document.documentElement;

// //   themeTriggerBtn.addEventListener('click', (e) => {
// //     e.stopPropagation();
// //     themeOptionsCollapse.classList.toggle('open');
// //   });

// //   // Close all open menus when clicking outside anywhere on the page
// //   document.addEventListener('click', () => {
// //     themeOptionsCollapse.classList.remove('open');
// //     profileDropdown.classList.remove('show');
// //     userAvatarBtn.classList.remove('active');
// //   });

// //   // Load saved preference or fallback to system
// //   const savedTheme = localStorage.getItem('ulive-theme') || 'system';
// //   applyTheme(savedTheme);

// //   themeButtons.forEach(btn => {
// //     btn.addEventListener('click', (e) => {
// //       e.stopPropagation();
// //       const mode = btn.getAttribute('data-mode');
// //       applyTheme(mode);
// //       localStorage.setItem('ulive-theme', mode);
      
// //       // Auto-collapse menu after choosing
// //       themeOptionsCollapse.classList.remove('open');
// //     });
// //   });

// //   function applyTheme(mode) {
// //     htmlEl.setAttribute('data-theme', mode);
    
// //     // Update active pill highlight state
// //     themeButtons.forEach(btn => {
// //       btn.classList.toggle('active', btn.getAttribute('data-mode') === mode);
// //     });

// //     // Update main trigger circular icon to reflect current theme
// //     activeThemeIcon.className = '';
// //     if (mode === 'light') {
// //       activeThemeIcon.className = 'ph ph-sun';
// //     } else if (mode === 'dark') {
// //       activeThemeIcon.className = 'ph ph-moon';
// //     } else {
// //       activeThemeIcon.className = 'ph ph-desktop';
// //     }
// //   }

// //   // 4. Interactive Heart Like Counter Toggle
// //   const likeToggle = document.getElementById('likeToggle');
// //   let isLiked = false;

// //   likeToggle.addEventListener('click', () => {
// //     isLiked = !isLiked;
// //     likeToggle.classList.toggle('active', isLiked);
// //   });

// //   // 5. Navigation Link Active Switcher
// //   const navLinks = document.querySelectorAll('.nav-links a');
  
// //   navLinks.forEach(link => {
// //     link.addEventListener('click', (e) => {
// //       e.preventDefault();
// //       navLinks.forEach(l => l.classList.remove('active'));
// //       link.classList.add('active');
// //     });
// //   });

// //   // 6. Active / Pending Tab Switcher
// //   const tabButtons = document.querySelectorAll('.tab-btn');

// //   tabButtons.forEach(button => {
// //     button.addEventListener('click', () => {
// //       tabButtons.forEach(btn => btn.classList.remove('active'));
// //       button.classList.add('active');
// //     });
// //   });
// // });



// document.addEventListener('DOMContentLoaded', () => {
//   // 1. Navbar Sticky Background Transition
//   const navbar = document.getElementById('navbar');
//   if (navbar) {
//     window.addEventListener('scroll', () => {
//       if (window.scrollY > 10) {
//         navbar.classList.add('scrolled');
//       } else {
//         navbar.classList.remove('scrolled');
//       }
//     });
//   }

//   // 2. User Avatar Profile Dropdown Menu Toggle
//   const userAvatarBtn = document.getElementById('userAvatarBtn');
//   const profileDropdown = document.getElementById('profileDropdown');

//   if (userAvatarBtn && profileDropdown) {
//     userAvatarBtn.addEventListener('click', (e) => {
//       e.stopPropagation();
//       profileDropdown.classList.toggle('show');
//       userAvatarBtn.classList.toggle('active');
//     });
//   }

//   // 3. Collapsible Bottom-Left Theme Switcher
//   const themeTriggerBtn = document.getElementById('themeTriggerBtn');
//   const themeOptionsCollapse = document.getElementById('themeOptionsCollapse');
//   const themeButtons = document.querySelectorAll('.theme-options-collapse .theme-pill-btn');
//   const activeThemeIcon = document.getElementById('activeThemeIcon');
//   const htmlEl = document.documentElement;

//   if (themeTriggerBtn && themeOptionsCollapse) {
//     themeTriggerBtn.addEventListener('click', (e) => {
//       e.stopPropagation();
//       themeOptionsCollapse.classList.toggle('open');
//     });
//   }

//   // Close all menus when clicking outside
//   document.addEventListener('click', () => {
//     if (themeOptionsCollapse) themeOptionsCollapse.classList.remove('open');
//     if (profileDropdown) profileDropdown.classList.remove('show');
//     if (userAvatarBtn) userAvatarBtn.classList.remove('active');
//   });

//   // Theme Sync Logic
//   const savedTheme = localStorage.getItem('ulive-theme') || 'system';
//   applyTheme(savedTheme);

//   themeButtons.forEach(btn => {
//     btn.addEventListener('click', (e) => {
//       e.stopPropagation();
//       const mode = btn.getAttribute('data-mode');
//       applyTheme(mode);
//       localStorage.setItem('ulive-theme', mode);
//       if (themeOptionsCollapse) themeOptionsCollapse.classList.remove('open');
//     });
//   });

//   function applyTheme(mode) {
//     htmlEl.setAttribute('data-theme', mode);
//     themeButtons.forEach(btn => {
//       btn.classList.toggle('active', btn.getAttribute('data-mode') === mode);
//     });

//     if (activeThemeIcon) {
//       activeThemeIcon.className = '';
//       if (mode === 'light') activeThemeIcon.className = 'ph ph-sun';
//       else if (mode === 'dark') activeThemeIcon.className = 'ph ph-moon';
//       else activeThemeIcon.className = 'ph ph-desktop';
//     }
//   }

//   // 4. Interactive Heart Counter Toggle
//   const likeToggle = document.getElementById('likeToggle');
//   if (likeToggle) {
//     let isLiked = false;
//     likeToggle.addEventListener('click', () => {
//       isLiked = !isLiked;
//       likeToggle.classList.toggle('active', isLiked);
//     });
//   }

//   // 5. Active Tab Switcher
//   const tabButtons = document.querySelectorAll('.tab-btn');
//   tabButtons.forEach(button => {
//     button.addEventListener('click', () => {
//       tabButtons.forEach(btn => btn.classList.remove('active'));
//       button.classList.add('active');
//     });
//   });

//   // 6. Floating Plus Button Trigger (Outside Pill)
//   const floatingPlusBtn = document.getElementById('floatingPlusBtn');
//   if (floatingPlusBtn) {
//     floatingPlusBtn.addEventListener('click', () => {
//       alert("Ya Ma3lem! Create new Nerd Arena post triggered!");
//     });
//   }
// });








































// document.addEventListener('DOMContentLoaded', () => {
//   // 1. Idle Floated Navbar -> Solid when Scrolled
//   const navbar = document.getElementById('navbar');
  
//   window.addEventListener('scroll', () => {
//     if (window.scrollY > 10) {
//       navbar.classList.add('scrolled');
//     } else {
//       navbar.classList.remove('scrolled');
//     }
//   });

//   // 2. User Avatar Profile Dropdown Toggle with Animated Transition
//   const userAvatarBtn = document.getElementById('userAvatarBtn');
//   const profileDropdown = document.getElementById('profileDropdown');

//   if (userAvatarBtn && profileDropdown) {
//     userAvatarBtn.addEventListener('click', (e) => {
//       e.stopPropagation();
//       profileDropdown.classList.toggle('show');
//       userAvatarBtn.classList.toggle('active');
//     });
//   }

//   // 3. Collapsible Bottom-Left Theme Widget
//   const themeTriggerBtn = document.getElementById('themeTriggerBtn');
//   const themeOptionsCollapse = document.getElementById('themeOptionsCollapse');
//   const themeButtons = document.querySelectorAll('.theme-options-collapse .theme-pill-btn');
//   const activeThemeIcon = document.getElementById('activeThemeIcon');
//   const htmlEl = document.documentElement;

//   if (themeTriggerBtn && themeOptionsCollapse) {
//     themeTriggerBtn.addEventListener('click', (e) => {
//       e.stopPropagation();
//       themeOptionsCollapse.classList.toggle('open');
//     });
//   }

//   // Close all open menus when clicking outside anywhere on the page
//   document.addEventListener('click', () => {
//     if (themeOptionsCollapse) themeOptionsCollapse.classList.remove('open');
//     if (profileDropdown) profileDropdown.classList.remove('show');
//     if (userAvatarBtn) userAvatarBtn.classList.remove('active');
//   });

//   // Load saved preference or fallback to system
//   const savedTheme = localStorage.getItem('ulive-theme') || 'system';
//   applyTheme(savedTheme);

//   themeButtons.forEach(btn => {
//     btn.addEventListener('click', (e) => {
//       e.stopPropagation();
//       const mode = btn.getAttribute('data-mode');
//       applyTheme(mode);
//       localStorage.setItem('ulive-theme', mode);
      
//       // Auto-collapse menu after choosing
//       if (themeOptionsCollapse) themeOptionsCollapse.classList.remove('open');
//     });
//   });

//   function applyTheme(mode) {
//     htmlEl.setAttribute('data-theme', mode);
    
//     // Update active pill highlight state
//     themeButtons.forEach(btn => {
//       btn.classList.toggle('active', btn.getAttribute('data-mode') === mode);
//     });

//     // Update main trigger circular icon to reflect current theme
//     if (activeThemeIcon) {
//       activeThemeIcon.className = '';
//       if (mode === 'light') {
//         activeThemeIcon.className = 'ph ph-sun';
//       } else if (mode === 'dark') {
//         activeThemeIcon.className = 'ph ph-moon';
//       } else {
//         activeThemeIcon.className = 'ph ph-desktop';
//       }
//     }
//   }

//   // 4. Interactive Heart Like Counter Toggle (COMMENTED FOR FUTURE UPDATES)
//   /*
//   const likeToggle = document.getElementById('likeToggle');
//   if (likeToggle) {
//     let isLiked = false;
//     likeToggle.addEventListener('click', () => {
//       isLiked = !isLiked;
//       likeToggle.classList.toggle('active', isLiked);
//     });
//   }
//   */

//   // 5. Navigation Link Active Switcher
//   const navLinks = document.querySelectorAll('.nav-links a');
  
//   navLinks.forEach(link => {
//     link.addEventListener('click', (e) => {
//       e.preventDefault();
//       navLinks.forEach(l => l.classList.remove('active'));
//       link.classList.add('active');
//     });
//   });

//   // 6. Active / Pending Tab Switcher
//   const tabButtons = document.querySelectorAll('.tab-btn');

//   tabButtons.forEach(button => {
//     button.addEventListener('click', () => {
//       tabButtons.forEach(btn => btn.classList.remove('active'));
//       button.classList.add('active');
//     });
//   });

//   // 7. Floating Plus Button Trigger
//   const floatingPlusBtn = document.getElementById('floatingPlusBtn');
//   if (floatingPlusBtn) {
//     floatingPlusBtn.addEventListener('click', () => {
//       alert("Ya Ma3lem! Create new Nerd Arena post triggered!");
//     });
//   }
// });

document.addEventListener('DOMContentLoaded', () => {
  // 1. Navbar Sticky Background Transition
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 10) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // 2. User Avatar Profile Dropdown Menu Toggle
  const userAvatarBtn = document.getElementById('userAvatarBtn');
  const profileDropdown = document.getElementById('profileDropdown');

  if (userAvatarBtn && profileDropdown) {
    userAvatarBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      profileDropdown.classList.toggle('show');
      userAvatarBtn.classList.toggle('active');
    });
  }

  // 3. Collapsible Bottom-Left Theme Switcher
  const themeTriggerBtn = document.getElementById('themeTriggerBtn');
  const themeOptionsCollapse = document.getElementById('themeOptionsCollapse');
  const themeButtons = document.querySelectorAll('.theme-options-collapse .theme-pill-btn');
  const activeThemeIcon = document.getElementById('activeThemeIcon');
  const htmlEl = document.documentElement;

  if (themeTriggerBtn && themeOptionsCollapse) {
    themeTriggerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      themeOptionsCollapse.classList.toggle('open');
    });
  }

  // Close all menus when clicking outside
  document.addEventListener('click', () => {
    if (themeOptionsCollapse) themeOptionsCollapse.classList.remove('open');
    if (profileDropdown) profileDropdown.classList.remove('show');
    if (userAvatarBtn) userAvatarBtn.classList.remove('active');
  });

  // Theme Sync Logic
  const savedTheme = localStorage.getItem('ulive-theme') || 'system';
  applyTheme(savedTheme);

  themeButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const mode = btn.getAttribute('data-mode');
      applyTheme(mode);
      localStorage.setItem('ulive-theme', mode);
      if (themeOptionsCollapse) themeOptionsCollapse.classList.remove('open');
    });
  });

  function applyTheme(mode) {
    htmlEl.setAttribute('data-theme', mode);
    themeButtons.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-mode') === mode);
    });

    if (activeThemeIcon) {
      activeThemeIcon.className = '';
      if (mode === 'light') activeThemeIcon.className = 'ph ph-sun';
      else if (mode === 'dark') activeThemeIcon.className = 'ph ph-moon';
      else activeThemeIcon.className = 'ph ph-desktop';
    }
  }

  // 4. Interactive Heart Counter Toggle (COMMENTED FOR FUTURE UPDATES)
  /*
  const likeToggle = document.getElementById('likeToggle');
  if (likeToggle) {
    let isLiked = false;
    likeToggle.addEventListener('click', () => {
      isLiked = !isLiked;
      likeToggle.classList.toggle('active', isLiked);
    });
  }
  */

  // 5. Active Tab Switcher
  const tabButtons = document.querySelectorAll('.tab-btn');
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
    });
  });

  // 6. Floating Plus Button Trigger (Outside Pill)
  const floatingPlusBtn = document.getElementById('floatingPlusBtn');
  if (floatingPlusBtn) {
    floatingPlusBtn.addEventListener('click', () => {
      alert("Ya Ma3lem! Create new post triggered!");
    });
  }

  // =========================================================================
  // 7. NEW: DRAGGABLE & PULL-TO-FULL BOTTOM SHEET NAV MENU LOGIC
  // =========================================================================
  const openBottomSheetBtn = document.getElementById('openBottomSheetBtn');
  const closeBottomSheetBtn = document.getElementById('closeBottomSheetBtn');
  const bottomSheetOverlay = document.getElementById('bottomSheetOverlay');
  const bottomSheet = document.getElementById('bottomSheet');
  const bottomSheetHeader = document.getElementById('bottomSheetHeader');

  if (openBottomSheetBtn && bottomSheetOverlay && bottomSheet) {
    // Open Bottom Sheet
    openBottomSheetBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      bottomSheetOverlay.classList.add('active');
      bottomSheet.classList.remove('is-full-screen'); // Reset to default half height
    });

    // Close Bottom Sheet via Close Button
    if (closeBottomSheetBtn) {
      closeBottomSheetBtn.addEventListener('click', () => {
        bottomSheetOverlay.classList.remove('active');
        bottomSheet.classList.remove('is-full-screen');
      });
    }

    // Close when clicking outside on overlay background
    bottomSheetOverlay.addEventListener('click', (e) => {
      if (e.target === bottomSheetOverlay) {
        bottomSheetOverlay.classList.remove('active');
        bottomSheet.classList.remove('is-full-screen');
      }
    });

    // --- DRAG UP / DOWN TOUCH & MOUSE GESTURES FOR FULL SCREEN ---
    let startY = 0;
    let currentY = 0;
    let isDragging = false;

    // Touch events for phone screens
    bottomSheetHeader.addEventListener('touchstart', (e) => {
      startY = e.touches[0].clientY;
      isDragging = true;
    }, { passive: true });

    bottomSheetHeader.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      currentY = e.touches[0].clientY;
      const diff = startY - currentY; // positive diff means drag UP

      // If dragged up significantly -> trigger Full Screen Mode
      if (diff > 50) {
        bottomSheet.classList.add('is-full-screen');
      }
      // If dragged down significantly -> close sheet or reset height
      else if (diff < -50) {
        if (bottomSheet.classList.contains('is-full-screen')) {
          bottomSheet.classList.remove('is-full-screen');
          isDragging = false;
        } else {
          bottomSheetOverlay.classList.remove('active');
          isDragging = false;
        }
      }
    }, { passive: true });

    bottomSheetHeader.addEventListener('touchend', () => {
      isDragging = false;
    });

    // Mouse events for desktop/laptop testing
    bottomSheetHeader.addEventListener('mousedown', (e) => {
      startY = e.clientY;
      isDragging = true;
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      currentY = e.clientY;
      const diff = startY - currentY;

      if (diff > 50) {
        bottomSheet.classList.add('is-full-screen');
        isDragging = false;
      } else if (diff < -50) {
        if (bottomSheet.classList.contains('is-full-screen')) {
          bottomSheet.classList.remove('is-full-screen');
          isDragging = false;
        } else {
          bottomSheetOverlay.classList.remove('active');
          isDragging = false;
        }
      }
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });
  }
});





















document.addEventListener('DOMContentLoaded', () => {
  // =========================================================================
  // GLOBAL ACCENT COLOR MANAGER (Works on all pages)
  // =========================================================================
  const htmlEl = document.documentElement;
  
  // 1. Load saved accent color on EVERY page load
  const savedAccentColor = localStorage.getItem('ulive-accent') || '#4f46e5';
  htmlEl.style.setProperty('--accent-color', savedAccentColor);

  // 2. Setup Color Pickers (Only runs if on appearance.html)
  const swatches = document.querySelectorAll('.color-swatch');
  const customColorPicker = document.getElementById('customColorPicker');

  if (swatches.length > 0 && customColorPicker) {
    
    // Sync UI with saved color
    swatches.forEach(swatch => {
      if(swatch.dataset.color === savedAccentColor) {
        swatch.classList.add('active');
      } else {
        swatch.classList.remove('active');
      }
    });
    customColorPicker.value = savedAccentColor;

    // Apply color function
    function updateAccentColor(color) {
      htmlEl.style.setProperty('--accent-color', color);
      localStorage.setItem('ulive-accent', color);
    }

    // Predefined Swatch Click
    swatches.forEach(swatch => {
      swatch.addEventListener('click', () => {
        const color = swatch.dataset.color;
        updateAccentColor(color);
        customColorPicker.value = color; // Sync custom picker
        
        // Update active class
        swatches.forEach(s => s.classList.remove('active'));
        swatch.classList.add('active');
      });
    });

    // Custom Color Picker Change
    customColorPicker.addEventListener('input', (e) => {
      const color = e.target.value;
      updateAccentColor(color);
      // Remove active class from all predefined swatches
      swatches.forEach(s => s.classList.remove('active'));
    });
  }
});