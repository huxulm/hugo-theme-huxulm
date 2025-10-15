// Pagefind 搜索功能
class PagefindSearch {
  constructor() {
    this.pagefind = null;
    this.isInitialized = false;
    this.currentResults = [];
    this.selectedIndex = -1;
    this.searchTimeout = null;
    
    // DOM 元素
    this.modal = null;
    this.searchInput = null;
    this.searchResults = null;
    this.searchStats = null;
    this.searchTrigger = null;
    this.closeBtn = null;
    this.clearBtn = null;
    
    // 状态元素
    this.loadingState = null;
    this.emptyState = null;
    this.noResultsState = null;
    
    this.init();
  }

  async init() {
    this.initDOM();
    this.bindEvents();
    await this.loadPagefind();
  }

  initDOM() {
    this.modal = document.getElementById('search-modal');
    this.searchInput = document.getElementById('search-input');
    this.searchResults = document.getElementById('search-results');
    this.searchStats = document.getElementById('search-stats');
    this.searchTrigger = document.getElementById('search-trigger');
    this.closeBtn = document.getElementById('search-modal-close');
    this.clearBtn = document.getElementById('search-clear');
    
    this.loadingState = document.getElementById('search-loading');
    this.emptyState = document.getElementById('search-empty');
    this.noResultsState = document.getElementById('search-no-results');
  }

  bindEvents() {
    // 打开搜索模态框
    if (this.searchTrigger) {
      this.searchTrigger.addEventListener('click', () => this.openModal());
    }

    // 关闭模态框
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.closeModal());
    }

    // 点击背景关闭
    if (this.modal) {
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) {
          this.closeModal();
        }
      });
    }

    // 搜索输入
    if (this.searchInput) {
      this.searchInput.addEventListener('input', (e) => this.handleSearchInput(e));
      this.searchInput.addEventListener('keydown', (e) => this.handleKeydown(e));
    }

    // 清除搜索
    if (this.clearBtn) {
      this.clearBtn.addEventListener('click', () => this.clearSearch());
    }

    // 清除搜索按钮（在无结果状态中）
    const clearSearchBtn = document.getElementById('clear-search-btn');
    if (clearSearchBtn) {
      clearSearchBtn.addEventListener('click', () => this.clearSearch());
    }

    // 键盘快捷键
    document.addEventListener('keydown', (e) => {
      // Ctrl+K 或 Cmd+K 打开搜索
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        this.openModal();
      }
      
      // ESC 关闭搜索
      if (e.key === 'Escape' && !this.modal.classList.contains('hidden')) {
        this.closeModal();
      }
    });
  }

  async loadPagefind() {
    try {
      // 动态加载 Pagefind
      const pagefindModule = await import('/pagefind/pagefind.js');
      this.pagefind = pagefindModule;
      this.isInitialized = true;
      console.log('Pagefind initialized successfully');
    } catch (error) {
      console.error('Failed to load Pagefind:', error);
    }
  }

  openModal() {
    if (this.modal) {
      this.modal.classList.remove('hidden');
      document.body.classList.add('overflow-hidden');
      
      // 聚焦到搜索输入框
      setTimeout(() => {
        if (this.searchInput) {
          this.searchInput.focus();
        }
      }, 100);
    }
  }

  closeModal() {
    if (this.modal) {
      this.modal.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
      this.clearSearch();
    }
  }

  handleSearchInput(e) {
    const query = e.target.value.trim();
    
    // 清除之前的搜索超时
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }

    // 更新清除按钮显示
    this.updateClearButton(query);

    // 如果查询为空，显示空状态
    if (!query) {
      this.showEmptyState();
      return;
    }

    // 设置搜索超时（防抖）
    this.searchTimeout = setTimeout(() => {
      this.performSearch(query);
    }, 300);
  }

  handleKeydown(e) {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        this.navigateResults(1);
        break;
      case 'ArrowUp':
        e.preventDefault();
        this.navigateResults(-1);
        break;
      case 'Enter':
        e.preventDefault();
        this.selectResult();
        break;
      case 'Escape':
        this.closeModal();
        break;
    }
  }

  updateClearButton(query) {
    if (this.clearBtn) {
      if (query) {
        this.clearBtn.classList.remove('opacity-0');
        this.clearBtn.classList.add('opacity-100');
      } else {
        this.clearBtn.classList.remove('opacity-100');
        this.clearBtn.classList.add('opacity-0');
      }
    }
  }

  clearSearch() {
    if (this.searchInput) {
      this.searchInput.value = '';
      this.updateClearButton('');
    }
    this.showEmptyState();
    this.currentResults = [];
    this.selectedIndex = -1;
  }

  async performSearch(query) {
    if (!this.isInitialized || !this.pagefind) {
      console.warn('Pagefind not initialized');
      return;
    }

    this.showLoadingState();

    try {
      const search = await this.pagefind.search(query);
      
      if (search.results.length === 0) {
        this.showNoResultsState(query);
        return;
      }

      // 获取搜索结果的详细数据
      const results = await Promise.all(
        search.results.map(result => result.data())
      );

      this.currentResults = results;
      this.selectedIndex = -1;
      this.displayResults(results, query, search.results.length);
      
    } catch (error) {
      console.error('Search failed:', error);
      this.showNoResultsState(query);
    }
  }

  showLoadingState() {
    this.hideAllStates();
    if (this.loadingState) {
      this.loadingState.classList.remove('hidden');
    }
  }

  showEmptyState() {
    this.hideAllStates();
    if (this.emptyState) {
      this.emptyState.classList.remove('hidden');
    }
    this.updateSearchStats('');
  }

  showNoResultsState(query) {
    this.hideAllStates();
    if (this.noResultsState) {
      this.noResultsState.classList.remove('hidden');
    }
    this.updateSearchStats(`未找到"${query}"的相关结果`);
  }

  hideAllStates() {
    [this.loadingState, this.emptyState, this.noResultsState].forEach(element => {
      if (element) {
        element.classList.add('hidden');
      }
    });
    if (this.searchResults) {
      this.searchResults.innerHTML = '';
    }
  }

  displayResults(results, query, totalCount) {
    this.hideAllStates();
    
    if (!this.searchResults) return;

    this.updateSearchStats(`找到 ${totalCount} 个"${query}"的相关结果`);

    this.searchResults.innerHTML = results.map((result, index) => {
      const excerpt = this.highlightSearchTerm(result.excerpt, query);
      const title = this.highlightSearchTerm(result.meta?.title || result.url, query);
      
      return `
        <article 
          class="search-result-item p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors ${index === this.selectedIndex ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700' : ''}"
          data-url="${result.url}"
          data-index="${index}"
        >
          <div class="flex items-start space-x-3">
            <div class="flex-shrink-0 mt-1">
              <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="text-base font-medium text-gray-900 dark:text-white mb-1 line-clamp-1">
                ${title}
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-2">
                ${excerpt}
              </p>
              <div class="flex items-center text-xs text-gray-500 dark:text-gray-400">
                <span class="truncate">${result.url}</span>
              </div>
            </div>
          </div>
        </article>
      `;
    }).join('');

    // 绑定结果项点击事件
    this.bindResultEvents();
  }

  bindResultEvents() {
    const resultItems = this.searchResults.querySelectorAll('.search-result-item');
    resultItems.forEach((item, index) => {
      item.addEventListener('click', () => {
        this.selectedIndex = index;
        this.selectResult();
      });
      
      item.addEventListener('mouseenter', () => {
        this.selectedIndex = index;
        this.updateSelectedResult();
      });
    });
  }

  navigateResults(direction) {
    if (this.currentResults.length === 0) return;

    this.selectedIndex += direction;
    
    if (this.selectedIndex < 0) {
      this.selectedIndex = this.currentResults.length - 1;
    } else if (this.selectedIndex >= this.currentResults.length) {
      this.selectedIndex = 0;
    }

    this.updateSelectedResult();
  }

  updateSelectedResult() {
    const resultItems = this.searchResults.querySelectorAll('.search-result-item');
    
    resultItems.forEach((item, index) => {
      if (index === this.selectedIndex) {
        item.classList.add('bg-blue-50', 'dark:bg-blue-900/20', 'border-blue-200', 'dark:border-blue-700');
        item.classList.remove('border-gray-200', 'dark:border-gray-700');
        
        // 滚动到可见区域
        item.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      } else {
        item.classList.remove('bg-blue-50', 'dark:bg-blue-900/20', 'border-blue-200', 'dark:border-blue-700');
        item.classList.add('border-gray-200', 'dark:border-gray-700');
      }
    });
  }

  selectResult() {
    if (this.selectedIndex >= 0 && this.currentResults[this.selectedIndex]) {
      const result = this.currentResults[this.selectedIndex];
      window.location.href = result.url;
    }
  }

  highlightSearchTerm(text, term) {
    if (!text || !term) return text || '';
    
    const regex = new RegExp(`(${this.escapeRegex(term)})`, 'gi');
    return text.replace(regex, '<mark class="bg-yellow-200 dark:bg-yellow-600/50 px-1 rounded">$1</mark>');
  }

  escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  updateSearchStats(text) {
    if (this.searchStats) {
      this.searchStats.textContent = text;
      
      if (text) {
        this.searchStats.classList.remove('opacity-0');
        this.searchStats.classList.add('opacity-100');
      } else {
        this.searchStats.classList.remove('opacity-100');
        this.searchStats.classList.add('opacity-0');
      }
    }
  }
}

// 初始化搜索
document.addEventListener('DOMContentLoaded', () => {
  new PagefindSearch();
});