// Main JavaScript for Hugo Theme Huxulm
(function() {
  'use strict';

  console.log('Hugo Theme Huxulm - Loaded');

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Add scroll-based shadow to sticky navbar
  function updateNavbarShadow() {
    const nav = document.querySelector('nav');
    if (!nav) return;
    
    if (window.scrollY > 10) {
      nav.classList.add('shadow-lg');
    } else {
      nav.classList.remove('shadow-lg');
    }
  }

  window.addEventListener('scroll', updateNavbarShadow);
  updateNavbarShadow();

  // External links open in new tab
  document.querySelectorAll('a[href^="http"]').forEach(link => {
    if (!link.href.includes(window.location.hostname)) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }
  });

  // Copy code button for code blocks
  document.querySelectorAll('pre').forEach(pre => {
    const button = document.createElement('button');
    button.className = 'absolute top-2 right-2 px-3 py-1 text-xs font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors duration-200';
    button.textContent = 'Copy';
    
    button.addEventListener('click', async () => {
      const code = pre.querySelector('code');
      if (code) {
        try {
          await navigator.clipboard.writeText(code.textContent);
          button.textContent = 'Copied!';
          setTimeout(() => {
            button.textContent = 'Copy';
          }, 2000);
        } catch (err) {
          console.error('Failed to copy code:', err);
        }
      }
    });
    
    const wrapper = document.createElement('div');
    wrapper.className = 'relative';
    pre.parentNode.insertBefore(wrapper, pre);
    wrapper.appendChild(pre);
    wrapper.appendChild(button);
  });

})();

