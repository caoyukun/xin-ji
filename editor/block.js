class Block extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.contentEditable = true;
        this.addEventListener('input', () => this.applyMarkdown())
        this.addEventListener('keydown', (event) => {
            switch (event.key) {
                case 'Enter':
                    event.preventDefault();
                    if (!this.textContent.endsWith("\n")) {
                        this.textContent = this.textContent + "\n";
                    }
                    break;
                case 'Backspace':
                    if (!this.textContent.trim() && this.previousElementSibling) {
                        event.preventDefault();
                        const previousElement = this.previousElementSibling;
                        this.parentNode.removeChild(this);
                        previousElement.normalize(); // 确保前一个块的末尾没有空白文本节点

                        // 寻找上一个块的最后一个文本节点
                        let lastTextNode = null;
                        for (const child of previousElement.childNodes) {
                            if (child.nodeType === Node.TEXT_NODE) {
                                lastTextNode = child;
                            }
                        }

                        // 如果找到了文本节点，则在它的末尾设置光标
                        if (lastTextNode) {
                            const range = document.createRange();
                            range.setStart(lastTextNode, lastTextNode.length);
                            range.collapse(true);
                            const selection = window.getSelection();
                            selection.removeAllRanges();
                            selection.addRange(range);
                        }

                        previousElement.focus();
                    }
                    break;
            }
        })
    }

    applyMarkdown() {
        const content = this.innerText;
        
        if (content === '') {
            const dataMarkdownAtt = this.getAttribute('data-markdown');
            switch(dataMarkdownAtt) {
                case 'h1':
                    this.setAttribute('data-markdown', '');
                    this.textContent = '# ';
                    break;
                default:
                    
                    break;
            }

            return;
        }

        const prefixText = this.getPrefixText(content);

        if (/^#{1,6} /.test(prefixText)) {
            const level = prefixText.length - 1;
            this.setAttribute('data-markdown', `h${level}`);
        } else if (prefixText === '> ') {
            this.setAttribute('data-markdown', 'blockquote');
        }

        const selection = window.getSelection();
        const range = selection.rangeCount > 0 ? selection.getRangeAt(0) : null;
        // 计算保存的光标位置
        let cursorPos = range ? range.startOffset : 0;

        this.textContent = content.slice(prefixText.length);

        // 重新设置光标位置
        if (range) {
            range.setStart(this.firstChild, Math.max(0, cursorPos - prefixText.length));
            range.setEnd(this.firstChild, Math.max(0, cursorPos - prefixText.length));
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }

    handleOnEnter() {
        if (!this.textContent.endsWith("\n")) {
            this.textContent = this.textContent + "\n";
        }
    }

    getPrefixText(content) {
        if (/^# /.test(content)) {
            return '# ';
        } else if (/^## /.test(content)) {
            return '## ';
        } else if (/^### /.test(content)) {
            return '### ';
        } else if (/^#### /.test(content)) {
            return '#### ';
        } else if (/^##### /.test(content)) {
            return '##### ';
        } else if (/^###### /.test(content)) {
            return '###### ';
        } else if (/^> /.test(content)) {
            return '> ';
        }

        return '';
    }

    getMarkdownContent() {
        let content = this.innerText;
        if (this.getAttribute('data-markdown') === 'h1') {
            return `# ${content}`;
        }
        return content;
    }
}

customElements.define('xj-block', Block);