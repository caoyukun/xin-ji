class Editor extends HTMLElement {

    connectedCallback() {
        this.innerHTML = `<xj-block></xj-block>`;

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
            if ((event.ctrlKey || event.metaKey) && event.key === 'a') {
                event.preventDefault(); // 阻止默认全选行为
                this.selectAllContent();
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

        this.focus();
    }

    selectAllContent() {
        const selection = window.getSelection();
        const currentBlock = document.activeElement.closest('xj-block');
        if (!selection || !currentBlock) {
            return;
        }

        const range = document.createRange();
        range.selectNodeContents(currentBlock);
        if (range.toString() === window.getSelection().toString()) {
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
}

customElements.define('xj-editor', Editor);