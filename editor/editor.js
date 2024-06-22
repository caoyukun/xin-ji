class Editor extends HTMLElement {

    connectedCallback() {
        this.contentEditable = true;
        const block = document.createElement('xj-block');
        this.appendChild(block);
        block.focus();

        this.addEventListener('input', (event) => {
            const currentBlock = this.getClosestBlock();
            currentBlock.applyMarkdown();
        })

        this.addEventListener('click', (event) => {
            event.preventDefault();

            const selection = window.getSelection();
            if (selection && this.contains(selection.anchorNode)) {
                // 如果光标已经在editor内，则忽略此次点击事件
                return; 
            }
            this.positionCursorAtEnd();
        });

        this.addEventListener('keydown', (event) => {
            switch (event.key) {
                case 'a':
                    if (event.ctrlKey || event.metaKey) {
                        event.preventDefault(); // 阻止默认全选行为
                        this.selectAllContent();
                    }
                    break;
                case 'Enter':
                    event.preventDefault();
                    const currentBlock = this.getClosestBlock();
                    currentBlock.handleOnEnter();
                    const newBlock = document.createElement('xj-block');
                    this.insertBefore(newBlock, currentBlock.nextSibling);

                    const textNode = document.createTextNode('');
                    newBlock.appendChild(textNode);

                    const range = document.createRange();
                    range.setStart(textNode, 0);
                    const selection = window.getSelection();
                    selection.removeAllRanges();
                    selection.addRange(range);

                    newBlock.focus();
                    break;
                default:
            }

        });
    }

    positionCursorAtEnd() {
        // 获取最后一个 <xj-block> 元素
        const lastBlock = this.querySelector(':last-child');
        if (!lastBlock) return; // 如果没有找到 <xj-block>，则直接返回

        // 创建一个范围对象（Range）并设置其开始和结束位置为最后一个块的末尾
        const range = document.createRange();
        range.selectNodeContents(lastBlock);
        range.collapse(false); // 设置光标在节点内容的末尾

        // 获取当前的可选择区域（Selection）并清空它
        const selection = window.getSelection();
        selection.removeAllRanges();

        // 将新创建的范围添加到选择中，从而定位光标
        selection.addRange(range);  

        lastBlock.focus();
    }

    selectAllContent() {
        const selection = window.getSelection();
        const currentBlock = this.getClosestBlock();
        if (!selection || !currentBlock) {
            return;
        }

        const range = document.createRange();
        range.selectNodeContents(currentBlock);
        if (range.toString().trim() === window.getSelection().toString()) {
            const allBlocks = Array.from(this.querySelectorAll('xj-block'));
            let combinedRange = null;
            for (const block of allBlocks) {
                const range = document.createRange();
                range.selectNodeContents(block);
                
                if (!combinedRange) {
                    combinedRange = range.cloneRange();
                } else {
                    combinedRange.setEnd(range.endContainer, range.endOffset);
                }
            }
            
            if (combinedRange) {
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(combinedRange);
            }
        } else {
            const range = document.createRange();
            range.selectNodeContents(currentBlock);
            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }

    getClosestBlock() {
        // 获取当前的Selection对象
        var selection = window.getSelection();
        if (selection.rangeCount > 0) {
            // 如果有选区，获取第一个Range
            var range = selection.getRangeAt(0);
            // 获取Range的起始容器节点
            let node = range.startContainer;
            
            for (let node = range.startContainer; node; node = node.parentNode) {
                if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'XJ-BLOCK') {
                    return node;
                }
            }
        }
        // 如果没有选中内容，返回null或者其他默认值
        return null;
    }
}

customElements.define('xj-editor', Editor);