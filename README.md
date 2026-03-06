# 🐻 Petfolio

> 动物派对风格的互动作品集主页

一个可爱、有趣的个人作品展示网站，以可自定义的小熊角色为中心，访客可以为小熊换装并下载自己的专属版本！

## ✨ 特性

- 🎨 **可爱的动物角色** - 5种毛色可选
- 👒 **丰富的装饰** - 帽子、眼镜、衣服配饰
- 🎯 **四象限作品展示** - 独特的拟物化设计
- 📥 **一键下载** - 访客可生成自己的主页版本
- 📱 **响应式设计** - 完美适配各种设备
- 🎁 **彩蛋** - 试试 Konami Code！

## 🚀 部署到 GitHub Pages

### 方法一：直接使用

1. **Fork 或创建仓库**
   ```bash
   # 在 GitHub 上创建名为 youlovedlittlebear.github.io 的仓库
   ```

2. **上传文件**
   - 将所有文件上传到仓库根目录

3. **启用 GitHub Pages**
   - 进入仓库 Settings → Pages
   - Source 选择 `main` 分支
   - 点击 Save

4. **访问你的网站**
   - 几分钟后访问 `https://youlovedlittlebear.github.io`

### 方法二：使用 Git 命令

```bash
# 克隆你的仓库
git clone https://github.com/YoulovedLittleBear/youlovedlittlebear.github.io.git

# 复制文件到仓库
cp -r petfolio-github/* youlovedlittlebear.github.io/

# 进入仓库目录
cd youlovedlittlebear.github.io

# 提交更改
git add .
git commit -m "🐻 初始化 Petfolio"
git push origin main
```

## 📁 项目结构

```
petfolio-github/
├── index.html          # 主页面
├── css/
│   └── style.css       # 样式文件
├── js/
│   ├── character.js    # 角色渲染模块
│   ├── customize.js    # 自定义面板模块
│   ├── portfolio.js    # 作品展示模块
│   └── main.js         # 主入口
└── README.md           # 说明文档
```

## 🎨 自定义你的作品

编辑 `js/portfolio.js` 文件中的 `portfolioData` 对象来添加你自己的作品：

```javascript
const portfolioData = {
  ui: {
    title: 'UI/UX 设计',
    icon: '🎨',
    works: [
      {
        title: '你的作品标题',
        description: '作品描述',
        emoji: '📱',
        link: 'https://你的作品链接'
      },
      // 添加更多作品...
    ]
  },
  // 其他类别...
};
```

## 🎨 自定义角色颜色

在 `js/character.js` 中可以添加新的颜色方案：

```javascript
const colorSchemes = {
  // 添加你自己的配色
  sunset: {
    primary: '#FF7F50',
    secondary: '#FF6347',
    belly: '#FFDAB9',
    blush: '#FFB6C1'
  }
};
```

## 🌈 添加新装饰

在 `js/character.js` 中的 `hats`、`glasses`、`clothes` 对象中添加新的 SVG 代码。

## 📝 许可

MIT License - 自由使用和修改！

---

Made with 💕 by [YoulovedLittleBear](https://github.com/YoulovedLittleBear)

如果你喜欢这个项目，欢迎给个 ⭐ Star！
