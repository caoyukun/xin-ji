class Block extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.contentEditable = true;
        this.addEventListener('input', () => this.applyMarkdown())
        this.addEventListener('keydown', (event) => {
            if (event.key == 'Enter') {
                event.preventDefault();
                const block = document.createElement('xj-block');
                this.parentNode.insertBefore(block, this.nextSibling);
                block.focus();
            } else if (event.key === 'Backspace') {
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
            }
        })
    }

    applyMarkdown() {
        const content = this.innerText;
        const markdownClass = this.getMarkdownClass(content);
        if (markdownClass != '' && !this.classList.contains(markdownClass)) {
            this.classList.add(markdownClass);
        } else if (markdownClass == '' && this.classList.length > 0) {
            this.classList.remove(this.classList[0]);
        }
    }

    getMarkdownClass(content) {
        if (/^# /.test(content)) {
            return 'h1';
        } else if (/^## /.test(content)) {
            return 'h2';
        } else if (/^### /.test(content)) {
            return 'h3';
        } else if (/^#### /.test(content)) {
            return 'h4';
        } else if (/^##### /.test(content)) {
            return 'h5';
        }

        return '';
    }
}

customElements.define('xj-block', Block);