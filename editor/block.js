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

                    this.textContent = this.textContent + "\n";

                    const block = document.createElement('xj-block');
                    this.parentNode.insertBefore(block, this.nextSibling);
                    block.focus();
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
                case 'ArrowUp':
                    event.preventDefault();
                    this.moveCursorToAdjacentBlock('previousSibling');
                    break;
                case 'ArrowDown':
                    event.preventDefault();
                    this.moveCursorToAdjacentBlock('nextSibling');
                    break;
            }
        })
    }

    moveCursorToAdjacentBlock(direction) {
        const siblingBlock = this[direction];
        if (siblingBlock && siblingBlock.tagName.toLowerCase() === 'xj-block') {
            const currentSelection = window.getSelection();
            const currentRange = currentSelection.rangeCount > 0 ? currentSelection.getRangeAt(0) : null;

            siblingBlock.focus();

            if (currentRange) {
                const currentPosition = currentRange.startOffset;
                const siblingContent = siblingBlock.textContent;
                const siblingRange = document.createRange();

                // 计算新位置，尝试保持原有光标位置的相对比例
                const newPosition = Math.min(siblingContent.length, currentPosition);

                siblingRange.setStart(siblingBlock.firstChild, newPosition);
                siblingRange.setEnd(siblingBlock.firstChild, newPosition);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(siblingRange);
            } else {
                const range = document.createRange();
                range.selectNodeContents(siblingBlock);
                range.collapse(false); // 将光标置于块的末尾
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
            }
        }
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
        // 标题
        if (/^#{1,6} /.test(content)) {
            const level = content.match(/^#{1,6}/)[0].length;
            return `h${level}`;
        }
        // 加粗
        else if (/\*\*(.*?)\*\*/.test(content)) {
            return 'bold';
        }
        // 斜体
        else if (/\*(.*?)\*/.test(content)) {
            return 'italic';
        }
        // 代码块（行内）
        else if (/\`(.*?)\`/.test(content)) {
            return 'inline-code';
        }
        // 代码块（多行）
        else if (/^\s*```[\s\S]*?```[\s\S]*$/gm.test(content)) {
            return 'code-block';
        }
        // 无序列表
        else if (/^-\s+.*$/.test(content)) {
            return 'unordered-list-item';
        }
        // 有序列表
        else if (/^\d+\.\s+.*$/.test(content)) {
            return 'ordered-list-item';
        }
        // 链接
        else if (/\[(.*?)\]\((.*?)\)/.test(content)) {
            return 'link';
        }
        // 图片
        else if (/\!\[(.*?)\]\((.*?)\)/.test(content)) {
            return 'image';
        } else if (/^\> /.test(content)) {
            return 'blockquote';
          }

        return '';
    }
}

customElements.define('xj-block', Block);