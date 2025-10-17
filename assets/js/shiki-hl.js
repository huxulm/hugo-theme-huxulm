// Shiki 高亮代码
class ShikiHighlighter {
    constructor() {
        this.shikiLoaded = false;
        this.highlighter = null;
        this.loadShiki();
    }

    async loadShiki() {
        if (this.shikiLoaded) return;

        const shiki = await import('https://esm.sh/shiki@3.0.0');
        this.highlighter = await shiki.createHighlighter({
            // themes: ['github-light', 'github-dark'],
            themes: ['material-theme-darker', 'material-theme-lighter'],
            langs: ['js', 'ts', 'py', 'go', 'rs', 'c', 'cpp', 'html', 'css', 'bash', 'json', 'yaml', 'markdown']
        });
        this.shikiLoaded = true;
    }

    async highlight(code, lang, themes) {
        if (!this.shikiLoaded) {
            await this.loadShiki();
        }
        return this.highlighter.codeToHtml(code, { lang, themes });
    }
}

// 添加复制按钮的函数
function addCopyButton(pre) {
    // 检查是否已经有复制按钮，避免重复添加
    if (pre.querySelector('.copy-btn')) return;

    const button = document.createElement('button');
    button.className = 'copy-btn absolute top-0 right-0 p-2 text-lg font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded transition-colors duration-200';
    // button.textContent = 'Copy';
    const buttonIcon = document.createElement('i');
    buttonIcon.className = 'fas fa-copy';
    button.appendChild(buttonIcon);

    button.addEventListener('click', async () => {
        const code = pre.querySelector('code');
        if (code) {
            try {
                await navigator.clipboard.writeText(code.textContent);
                buttonIcon.className = 'fas fa-check text-green-600';
                setTimeout(() => {
                    buttonIcon.className = 'fas fa-copy';
                }, 2000);
            } catch (err) {
                console.error('Failed to copy code:', err);
                buttonIcon.className = 'fas fa-times';
                setTimeout(() => {
                    buttonIcon.className = 'fas fa-copy';
                }, 2000);
            }
        }
    });

    pre.style.position = 'relative';
    pre.appendChild(button);
}

document.addEventListener('DOMContentLoaded', async () => {
    const highlighter = new ShikiHighlighter();
    const codeBlocks = document.querySelectorAll('pre code');

    // 先处理所有代码块的高亮
    const highlightPromises = Array.from(codeBlocks).map(async (block) => {
        const lang = block.getAttribute('class')?.replace('language-', '') || 'plaintext';
        console.log(`Highlighting code block with language: ${lang}`);
        const code = block.textContent;
        const highlightedHtml = await highlighter.highlight(code, lang, { light: 'material-theme-lighter', dark: 'material-theme-darker' });
        const pre = block.parentElement;
        
        // 替换内容，但保存父元素引用
        const wrapper = pre.parentElement;
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = highlightedHtml;
        const newPre = tempDiv.firstElementChild;
        
        // 替换 pre 元素
        pre.replaceWith(newPre);
        return newPre;
    });

    // 等待所有高亮完成后，再添加复制按钮
    await Promise.all(highlightPromises);
    
    // 为所有 pre 元素添加复制按钮（包括新生成的）
    document.querySelectorAll('pre').forEach(pre => {
        addCopyButton(pre);
    });
});