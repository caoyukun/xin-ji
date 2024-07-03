<script setup>
import { ref } from 'vue'

const split1 = ref(0.8)
const split2 = ref(0.25)

const customToolBar = ref(['bold', 'italic'])

const noteList = [
  {
    id: '100',
    content: '组件总览'
  },
  {
    id: '200',
    content: '使用指南'
  },
  {
    id: '201',
    content: '更新日志'
  },
  { id: '202', content: '环境准备' },
  { id: '203', content: '安装' },
  {
    id: '204',
    content: '引入组件'
  },
  { id: '20401', content: '按需引入' },
  { id: '20402', content: '完整引入' },
  { id: '205', content: '开发示例' },
  { id: '206', content: '国际化' },
  { id: '207', content: '主题配置' },
  { id: '208', content: '表单校验配置' },
  { id: '209', content: '常见问题' },
  {
    id: '300',
    content: '框架风格'
  },
  {
    id: '301',
    content: 'Color 色彩'
  },
  { id: '302', content: 'Container 版型' },
  { id: '303', content: 'Font 字体' },
  { id: '304', content: 'Icon 图标' },
  { id: '305', content: 'Layout 布局' },
  {
    id: '400',
    content: '导航组件'
  },
  {
    id: '401',
    content: 'Anchor 锚点'
  },
  { id: '402', content: 'Guide 引导' },
  { id: '403', content: 'Breadcrumb 面包屑' },
  {
    id: '500',
    content: '容器组件'
  },
  {
    id: '501',
    content: 'Carousel 走马灯'
  },
  { id: '502', content: 'Collapse 折叠面板' },
  { id: '503', content: 'DialogBox 对话框' },
  {
    id: '600',
    content: '表单组件'
  },
  {
    id: '60101',
    content: 'Button 按钮'
  },
  {
    id: '60102',
    content: 'DatePicker 日期选择器'
  },
  {
    id: '60103',
    content: 'Select 选择器'
  },
  {
    id: '60104',
    content: 'DropTimes 下拉时间'
  },
  {
    id: '60105',
    content: 'Input 输入框'
  },
  {
    id: '700',
    content: '业务组件'
  },
  {
    id: '701',
    content: 'Amount 金额'
  },
  { id: '702', content: 'Area 片区' },
  { id: '703', content: 'Company 公司' },
  {
    id: '800',
    content: '其他组件'
  },
  {
    id: '801',
    content: '废弃组件'
  },
  {
    id: '80101',
    content: 'CreditCardForm 信用卡表单'
  },
  {
    id: '80102',
    content: 'DetailPage 表头详情栏'
  },
  {
    id: '802',
    content: '新增组件'
  },
  {
    id: '80201',
    content: 'QrCode 二维码'
  },
  {
    id: '80202',
    content: 'Watermark 水印'
  },
  {
    id: '80203',
    content: 'MindMap 脑图',
  },
  {
    id: '80204',
    content: 'Skeleton 骨架屏'
  },
  {
    id: '803',
    content: 'BulletinBoard 公告牌'
  },
  { id: '804', content: 'Calendar 日历' }
]

const noteMap = new Map(noteList.map(item => [item.id, item]));

const noteTree = [
  {
    id: '100',
    title: '组件总览'
  },
  {
    id: '200',
    title: '使用指南',
    children: [
      {
        id: '201',
        title: '更新日志'
      },
      { id: '202', title: '环境准备' },
      { id: '203', title: '安装' },
      {
        id: '204',
        title: '引入组件',
        children: [
          { id: '20401', title: '按需引入' },
          { id: '20402', title: '完整引入' }
        ]
      },
      { id: '205', title: '开发示例' },
      { id: '206', title: '国际化' },
      { id: '207', title: '主题配置' },
      { id: '208', title: '表单校验配置' },
      { id: '209', title: '常见问题' }
    ]
  },
  {
    id: '300',
    title: '框架风格',
    children: [
      {
        id: '301',
        title: 'Color 色彩'
      },
      { id: '302', title: 'Container 版型' },
      { id: '303', title: 'Font 字体' },
      { id: '304', title: 'Icon 图标' },
      { id: '305', title: 'Layout 布局' }
    ]
  },
  {
    id: '400',
    title: '导航组件',
    children: [
      {
        id: '401',
        title: 'Anchor 锚点'
      },
      { id: '402', title: 'Guide 引导' },
      { id: '403', title: 'Breadcrumb 面包屑' }
    ]
  },
  {
    id: '500',
    title: '容器组件',
    children: [
      {
        id: '501',
        title: 'Carousel 走马灯'
      },
      { id: '502', title: 'Collapse 折叠面板' },
      { id: '503', title: 'DialogBox 对话框' }
    ]
  },
  {
    id: '600',
    title: '表单组件',
    children: [
      {
        id: '60101',
        title: 'Button 按钮'
      },
      {
        id: '60102',
        title: 'DatePicker 日期选择器'
      },
      {
        id: '60103',
        title: 'Select 选择器'
      },
      {
        id: '60104',
        title: 'DropTimes 下拉时间'
      },
      {
        id: '60105',
        title: 'Input 输入框'
      }
    ]
  },
  {
    id: '700',
    title: '业务组件',
    children: [
      {
        id: '701',
        title: 'Amount 金额'
      },
      { id: '702', title: 'Area 片区' },
      { id: '703', title: 'Company 公司' }
    ]
  },
  {
    id: '800',
    title: '其他组件',
    children: [
      {
        id: '801',
        title: '废弃组件',
        children: [
          {
            id: '80101',
            title: 'CreditCardForm 信用卡表单'
          },
          {
            id: '80102',
            title: 'DetailPage 表头详情栏'
          }
        ]
      },
      {
        id: '802',
        title: '新增组件',
        children: [
          {
            id: '80201',
            title: 'QrCode 二维码',
          },
          {
            id: '80202',
            title: 'Watermark 水印'
          },
          {
            id: '80203',
            title: 'MindMap 脑图'
          },
          {
            id: '80204',
            title: 'Skeleton 骨架屏'
          }
        ]
      },
      {
        id: '803',
        title: 'BulletinBoard 公告牌'
      },
      { id: '804', title: 'Calendar 日历' }
    ]
  }
];

function addTreePath(node, path, nodePathMap) {
  nodePathMap.set('' + node.id, path + '.' + node.id);
  if (node.children) {
    for (let i = 0; i < node.children.length; i++) {
      addTreePath(node.children[i], nodePathMap.get('' + node.id), nodePathMap);
    }
  }
}

function buildTreePath(nodeArray) {
  const nodePathMap = new Map();
  for (let i = 0; i < nodeArray.length; i++) {
    addTreePath(nodeArray[i], '', nodePathMap);
  }
  return nodePathMap;
}

const treePathMap = buildTreePath(noteTree);

function convertNoteTreeObj2TreeMenuObj(noteTreeObj) {
  return  {
    id: noteTreeObj.id,
    label: noteTreeObj.title,
    children: noteTreeObj.children ? noteTreeObj.children.map(item => convertNoteTreeObj2TreeMenuObj(item)) : []
  }
}

const getMenuDataSync = () => {
  return noteTree.map(item => convertNoteTreeObj2TreeMenuObj(item));
}

const treeData = getMenuDataSync();

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
});

const treeMenu = ref(null);

const treeMenuKey = ref(0);


// function handleMenuClick(node, childrenConfig) {
//   console.log(data)
// }


const handleNodeClick = (data) => {
  const rootData = treeData.find(t => t.id === (data.id.charAt(0) + '00'));
  mindMapData.value.nodeData.topic = rootData.label;
  mindMapData.value.nodeData.children = rootData.children.map(t => convertTreeMenuData2MindMapData(t));
}

function convertTreeMenuData2MindMapData(treeData) {
  const mindMapData = {
    'id': treeData.id,
    'topic': treeData.label
  }
  if (treeData.children) {
    mindMapData.children = treeData.children.map(t => convertTreeMenuData2MindMapData(t))
  }
  return mindMapData;
}

function onOperation(operation) {
  const info = operation.info;
  const obj = info.obj;
  const toObj = info.toObj;
  const toIndex = toObj.children.findIndex(item => item.id === obj.id);

  const nodePath = treePathMap.get(obj.id).split('.');
  const toNodePath = treePathMap.get(toObj.id).split('.');

  let treeDataArray = treeData;
  for (let i = 1; i < nodePath.length - 1; i++) {
      treeDataArray = treeDataArray.find(item => item.id === nodePath[i]).children;
  }
  const noteTreeObj = treeDataArray.find(item => item.id === obj.id);
  if (!noteTreeObj) {
    return;
  }

  treeDataArray.splice(treeDataArray.findIndex(item => item.id === nodePath.pop()), 1);

  let noteTreeToObj;
  treeDataArray = treeData;
  for (let i = 1; i < toNodePath.length; i++) {
    noteTreeToObj = treeDataArray.find(item => item.id === toNodePath[i]);
    treeDataArray = noteTreeToObj.children;
  }

  treePathMap.set(noteTreeObj.id,treePathMap.get(noteTreeToObj.id) + '.' + noteTreeObj.id);

  if (!noteTreeToObj.children) {
    noteTreeToObj.children = [];
  }

  noteTreeToObj.children.splice(toIndex, 0, noteTreeObj);
  treeMenu.value.$forceUpdate();
  treeMenuKey.value = treeMenuKey.value + 1;
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
                <tiny-tree ref="treeMenu" :key="treeMenuKey" class="tree-menu" :data="treeDataRef" draggable
                  @node-click="handleNodeClick"></tiny-tree>
              </div>
            </template>
            <template #right>
              <tiny-rich-text-editor v-model="value" :customToolBar="customToolBar"></tiny-rich-text-editor>
            </template>
          </tiny-split>
        </template>
        <template #right>
          <div class="split-content">
            <tiny-mind-map class="demo-mind-map-export-date" ref="mindmap" v-model="mindMapData" :options="mindMapOptions" @operation="onOperation" />
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
