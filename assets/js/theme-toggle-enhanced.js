// Enhanced Theme Toggle with Auto/Light/Dark modes
(function() {
  'use strict';

  const THEME_KEY = 'theme';
  const THEME_AUTO = 'auto';
  const THEME_LIGHT = 'light';
  const THEME_DARK = 'dark';

  /**
   * 获取系统主题偏好
   */
  function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches 
      ? THEME_DARK 
      : THEME_LIGHT;
  }

  /**
   * 获取当前保存的主题设置
   */
  function getSavedTheme() {
    try {
      return localStorage.getItem(THEME_KEY) || THEME_AUTO;
    } catch (e) {
      return THEME_AUTO;
    }
  }

  /**
   * 保存主题设置
   */
  function saveTheme(theme) {
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (e) {
      console.warn('Cannot save theme preference:', e);
    }
  }

  /**
   * 应用主题到 DOM
   */
  function applyTheme(theme) {
    const effectiveTheme = theme === THEME_AUTO ? getSystemTheme() : theme;
    
    if (effectiveTheme === THEME_DARK) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // 添加数据属性用于 CSS 选择器
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-effective-theme', effectiveTheme);
  }

  /**
   * 切换主题（循环：auto → light → dark → auto）
   */
  function toggleTheme() {
    const currentTheme = getSavedTheme();
    let nextTheme;
    
    switch (currentTheme) {
      case THEME_AUTO:
        nextTheme = THEME_LIGHT;
        break;
      case THEME_LIGHT:
        nextTheme = THEME_DARK;
        break;
      case THEME_DARK:
        nextTheme = THEME_AUTO;
        break;
      default:
        nextTheme = THEME_AUTO;
    }
    
    saveTheme(nextTheme);
    applyTheme(nextTheme);
    updateThemeButton(nextTheme);
  }

  /**
   * 更新主题按钮的图标
   */
  function updateThemeButton(theme) {
    const lightIcon = document.getElementById('theme-toggle-light-icon');
    const darkIcon = document.getElementById('theme-toggle-dark-icon');
    const autoIcon = document.getElementById('theme-toggle-auto-icon');
    
    if (!lightIcon || !darkIcon) return;
    
    // 隐藏所有图标
    lightIcon.classList.add('hidden');
    darkIcon.classList.add('hidden');
    if (autoIcon) autoIcon.classList.add('hidden');
    
    // 显示对应的图标
    const effectiveTheme = theme === THEME_AUTO ? getSystemTheme() : theme;
    
    if (theme === THEME_AUTO) {
      // Auto 模式：显示系统图标
      if (autoIcon) {
        autoIcon.classList.remove('hidden');
      } else if (effectiveTheme === THEME_DARK) {
        lightIcon.classList.remove('hidden');
      } else {
        darkIcon.classList.remove('hidden');
      }
    } else if (effectiveTheme === THEME_DARK) {
      lightIcon.classList.remove('hidden');
    } else {
      darkIcon.classList.remove('hidden');
    }
    
    // 更新按钮的 title 属性
    const button = document.getElementById('theme-toggle');
    if (button) {
      const titles = {
        [THEME_AUTO]: 'Auto (System)',
        [THEME_LIGHT]: 'Light Mode',
        [THEME_DARK]: 'Dark Mode',
      };
      button.setAttribute('title', titles[theme] || 'Toggle Theme');
      button.setAttribute('aria-label', `Current theme: ${titles[theme]}`);
    }
  }

  /**
   * 初始化主题
   */
  function initTheme() {
    const savedTheme = getSavedTheme();
    applyTheme(savedTheme);
    updateThemeButton(savedTheme);
  }

  /**
   * 监听系统主题变化
   */
  function watchSystemTheme() {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    // 现代浏览器
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', (e) => {
        const currentTheme = getSavedTheme();
        if (currentTheme === THEME_AUTO) {
          applyTheme(THEME_AUTO);
          updateThemeButton(THEME_AUTO);
        }
      });
    } else if (mediaQuery.addListener) {
      // 旧浏览器兼容
      mediaQuery.addListener((e) => {
        const currentTheme = getSavedTheme();
        if (currentTheme === THEME_AUTO) {
          applyTheme(THEME_AUTO);
          updateThemeButton(THEME_AUTO);
        }
      });
    }
  }

  /**
   * 设置特定主题
   */
  function setTheme(theme) {
    if (![THEME_AUTO, THEME_LIGHT, THEME_DARK].includes(theme)) {
      console.warn('Invalid theme:', theme);
      return;
    }
    saveTheme(theme);
    applyTheme(theme);
    updateThemeButton(theme);
  }

  /**
   * 获取当前主题
   */
  function getCurrentTheme() {
    return {
      saved: getSavedTheme(),
      effective: getSavedTheme() === THEME_AUTO ? getSystemTheme() : getSavedTheme(),
      system: getSystemTheme(),
    };
  }

  // DOM Ready 后初始化
  function init() {
    initTheme();
    watchSystemTheme();
    
    // 绑定主题切换按钮
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', toggleTheme);
    }
    
    // 暴露 API 到全局（方便调试和外部调用）
    window.theme = {
      toggle: toggleTheme,
      set: setTheme,
      get: getCurrentTheme,
      THEME_AUTO,
      THEME_LIGHT,
      THEME_DARK,
    };
  }

  // 初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
