import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  awesomeSidebar: [
    {type: 'doc', id: 'awesome/ai', label: '🤖 AI'},
    {type: 'doc', id: 'awesome/frontend', label: '🎨 前端'},
    {type: 'doc', id: 'awesome/react', label: '⚛️ React'},
    {type: 'doc', id: 'awesome/vue', label: '💚 Vue'},
    {type: 'doc', id: 'awesome/node', label: '🟢 Node.js'},
    {type: 'doc', id: 'awesome/css', label: '🎭 CSS'},
    {type: 'doc', id: 'awesome/engineering', label: '🔧 工程化'},
    {type: 'doc', id: 'awesome/tools', label: '🛠 开发工具'},
    {type: 'doc', id: 'awesome/website', label: '🌐 网站推荐'},
  ],
  guideSidebar: [
    {type: 'doc', id: 'guide/libraries', label: '📚 常用库'},
    {
      type: 'category',
      label: '⚙️ 开发环境',
      items: [
        'guide/development/nginx',
        'guide/development/docker',
        'guide/development/server',
      ],
    },
    {
      type: 'category',
      label: '🔍 调研笔记',
      items: [
        'guide/research/responsive',
        'guide/research/markdown',
        'guide/research/ssg',
      ],
    },
  ],
};

export default sidebars;
