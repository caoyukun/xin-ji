<script setup>
import { ref } from 'vue'

const split1 = ref(0.8)
const split2 = ref(0.25)

const treeData = [
  {
    id: 100,
    label: '组件总览'
  },
  {
    id: 200,
    label: '使用指南',
    children: [
      {
        id: 201,
        label: '更新日志'
      },
      { id: 202, label: '环境准备' },
      { id: 203, label: '安装' },
      {
        id: 204,
        label: '引入组件',
        children: [
          { id: 20401, label: '按需引入' },
          { id: 20402, label: '完整引入' }
        ]
      },
      { id: 205, label: '开发示例' },
      { id: 206, label: '国际化' },
      { id: 207, label: '主题配置' },
      { id: 208, label: '表单校验配置' },
      { id: 209, label: '常见问题' }
    ]
  },
  {
    id: 300,
    label: '框架风格',
    children: [
      {
        id: 301,
        label: 'Color 色彩'
      },
      { id: 302, label: 'Container 版型' },
      { id: 303, label: 'Font 字体' },
      { id: 304, label: 'Icon 图标' },
      { id: 305, label: 'Layout 布局' }
    ]
  },
  {
    id: 400,
    label: '导航组件',
    children: [
      {
        id: 401,
        label: 'Anchor 锚点'
      },
      { id: 402, label: 'Guide 引导' },
      { id: 403, label: 'Breadcrumb 面包屑' }
    ]
  },
  {
    id: 500,
    label: '容器组件',
    children: [
      {
        id: 501,
        label: 'Carousel 走马灯'
      },
      { id: 502, label: 'Collapse 折叠面板' },
      { id: 503, label: 'DialogBox 对话框' }
    ]
  },
  {
    id: 600,
    label: '表单组件',
    children: [
      {
        id: 60101,
        label: 'Button 按钮',
        url: 'button'
      },
      {
        id: 60102,
        label: 'DatePicker 日期选择器',
        url: 'date-picker'
      },
      {
        id: 60103,
        label: 'Select 选择器',
        url: 'select'
      },
      {
        id: 60104,
        label: 'DropTimes 下拉时间',
        url: 'drop-times'
      },
      {
        id: 60105,
        label: 'Input 输入框',
        url: 'input'
      }
    ]
  },
  {
    id: 700,
    label: '业务组件',
    children: [
      {
        id: 701,
        label: 'Amount 金额'
      },
      { id: 702, label: 'Area 片区' },
      { id: 703, label: 'Company 公司' }
    ]
  },
  {
    id: 800,
    label: '其他组件',
    children: [
      {
        id: 801,
        label: '废弃组件',
        children: [
          {
            id: 80101,
            label: 'CreditCardForm 信用卡表单',
            url: 'credit-card-form'
          },
          {
            id: 80102,
            label: 'DetailPage 表头详情栏',
            url: 'detail-page'
          }
        ]
      },
      {
        id: 802,
        label: '新增组件',
        children: [
          {
            id: 80201,
            label: 'QrCode 二维码',
            url: 'qr-code'
          },
          {
            id: 80202,
            label: 'Watermark 水印',
            url: 'watermark'
          },
          {
            id: 80203,
            label: 'MindMap 脑图',
            url: 'mind-map'
          },
          {
            id: 80204,
            label: 'Skeleton 骨架屏',
            url: 'skeleton'
          }
        ]
      },
      {
        id: 803,
        label: 'BulletinBoard 公告牌'
      },
      { id: 804, label: 'Calendar 日历' }
    ]
  }
]

const value = ref('');

const treeDataRef = ref(treeData)

const activeName = ref('mindmap')

const mindMapOptions = ref({
  'draggable': true,
  'toolBar': true
})

const mindMapData = ref({
  'nodeData': {
    'id': 'c9ee6647385c42de',
    'topic': '',
    'root': true,
    'children': []
  }
})

const handleNodeClick = (data) => {
  const rootData = treeData.find(t => t.id === parseInt(data.id.toString().charAt(0) + '00'));
  mindMapData.value.nodeData.topic = rootData.label;
  mindMapData.value.nodeData.children = rootData.children.map(t => convertTreeMenuData2MindMapData(t));
}

function convertTreeMenuData2MindMapData(treeData) {
  const mindMapData = {
    'id': '' + treeData.id,
    'topic': treeData.label
  }
  if (treeData.children) {
    mindMapData.children = treeData.children.map(t => convertTreeMenuData2MindMapData(t))
  }
  return mindMapData;
}
</script>

<template>
  <tiny-container pattern="simple" aside-width="0">
    <div class="split-nest">
      <tiny-split v-model="split1" trigger-simple collapse-right-bottom three-areas>
        <template #left>
          <tiny-split v-model="split2" trigger-simple collapse-left-top three-areas>
            <template #left>
              <div class="split-sidebar">
                <tiny-tree-menu class="tree-menu" :data="treeDataRef" draggable
                  @node-click="handleNodeClick"></tiny-tree-menu>
              </div>
            </template>
            <template #right>
              <tiny-rich-text-editor v-model="value"></tiny-rich-text-editor>
            </template>
          </tiny-split>
        </template>
        <template #right>
          <div class="split-content">
            <tiny-mind-map class="demo-mind-map-export-date" ref="mindmap" v-model="mindMapData" :options="mindMapOptions"/>
          </div>
          <!-- <tiny-tabs class="xj-tabs" v-model="activeName" position="right">
              <tiny-tab-item title="🧠" name="mindmap">
                <div class="split-content">
                  <tiny-mind-map class="demo-mind-map-export-date" ref="mindmap" v-model="mindMapData" />
                </div>
              </tiny-tab-item>
              <tiny-tab-item title="🏷️" name="tip">
                标签管理
              </tiny-tab-item>
            </tiny-tabs> -->
        </template>
      </tiny-split>
    </div>
  </tiny-container>
</template>

<style scoped>
.tree-menu {
  width: 100%;
}

.split-sidebar {
  display: block;
}

.split-nest {
  height: 100%;
  border: 1px solid #d9d9d9;
}

.split-content {
  height: 100%;
  width: 100%;
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
}

tiny-tree-menu {
  width: 100%;
}

.tiny-mind-map {
  position: absolute;
  width: 100%;
  height: 100%;
}

.xj-tabs {
  width: 100%;
  height: 100%;
}

.tiny-tabs__content {
  line-height: 1.5;
}
</style>
