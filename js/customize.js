/**
 * Petfolio - 自定义面板模块
 * 处理换装面板的交互逻辑
 */

const CustomizeModule = (function() {
  let isOpen = false;

  // DOM 元素
  let panel, overlay, friendBtn, closeBtn, randomBtn, downloadBtn;
  let colorOptions, hatOptions, glassesOptions, clothesOptions;

  // 初始化
  function init() {
    // 获取 DOM 元素
    panel = document.getElementById('customizePanel');
    overlay = document.getElementById('overlay');
    friendBtn = document.getElementById('friendBtn');
    closeBtn = document.getElementById('panelClose');
    randomBtn = document.getElementById('randomBtn');
    downloadBtn = document.getElementById('downloadBtn');
    
    colorOptions = document.getElementById('colorOptions');
    hatOptions = document.getElementById('hatOptions');
    glassesOptions = document.getElementById('glassesOptions');
    clothesOptions = document.getElementById('clothesOptions');

    // 绑定事件
    friendBtn.addEventListener('click', open);
    closeBtn.addEventListener('click', close);
    overlay.addEventListener('click', close);
    randomBtn.addEventListener('click', handleRandom);
    downloadBtn.addEventListener('click', handleDownload);

    // 颜色选择
    colorOptions.addEventListener('click', (e) => {
      const btn = e.target.closest('.color-btn');
      if (btn) {
        setActiveButton(colorOptions, btn);
        CharacterModule.update({ color: btn.dataset.color });
      }
    });

    // 帽子选择
    hatOptions.addEventListener('click', (e) => {
      const btn = e.target.closest('.accessory-btn');
      if (btn) {
        setActiveButton(hatOptions, btn);
        CharacterModule.update({ hat: btn.dataset.item });
      }
    });

    // 眼镜选择
    glassesOptions.addEventListener('click', (e) => {
      const btn = e.target.closest('.accessory-btn');
      if (btn) {
        setActiveButton(glassesOptions, btn);
        CharacterModule.update({ glasses: btn.dataset.item });
      }
    });

    // 衣服选择
    clothesOptions.addEventListener('click', (e) => {
      const btn = e.target.closest('.accessory-btn');
      if (btn) {
        setActiveButton(clothesOptions, btn);
        CharacterModule.update({ clothes: btn.dataset.item });
      }
    });

    // 同步当前状态到按钮
    syncButtonState();
  }

  // 打开面板
  function open() {
    isOpen = true;
    panel.classList.add('active');
    overlay.classList.add('active');
    
    // 添加角色反应动画
    const character = document.querySelector('.character-svg');
    if (character) {
      character.style.animation = 'none';
      character.offsetHeight; // 触发重绘
      character.style.animation = 'surprise 0.5s ease-out';
    }
  }

  // 关闭面板
  function close() {
    isOpen = false;
    panel.classList.remove('active');
    overlay.classList.remove('active');
  }

  // 设置激活按钮
  function setActiveButton(container, activeBtn) {
    container.querySelectorAll('.color-btn, .accessory-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    activeBtn.classList.add('active');
  }

  // 同步按钮状态
  function syncButtonState() {
    const state = CharacterModule.getState();
    
    // 同步颜色
    const colorBtn = colorOptions.querySelector(`[data-color="${state.color}"]`);
    if (colorBtn) setActiveButton(colorOptions, colorBtn);
    
    // 同步帽子
    const hatBtn = hatOptions.querySelector(`[data-item="${state.hat}"]`);
    if (hatBtn) setActiveButton(hatOptions, hatBtn);
    
    // 同步眼镜
    const glassesBtn = glassesOptions.querySelector(`[data-item="${state.glasses}"]`);
    if (glassesBtn) setActiveButton(glassesOptions, glassesBtn);
    
    // 同步衣服
    const clothesBtn = clothesOptions.querySelector(`[data-item="${state.clothes}"]`);
    if (clothesBtn) setActiveButton(clothesOptions, clothesBtn);
  }

  // 随机搭配
  function handleRandom() {
    CharacterModule.randomize();
    syncButtonState();
    
    // 添加动画效果
    randomBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
      randomBtn.style.transform = '';
    }, 150);
  }

  // 下载功能
  function handleDownload() {
    downloadBtn.textContent = '⏳ 生成中...';
    downloadBtn.disabled = true;
    
    setTimeout(() => {
      generateDownload();
      downloadBtn.textContent = '📥 下载我的主页';
      downloadBtn.disabled = false;
    }, 500);
  }

  // 生成可下载的 HTML
  function generateDownload() {
    const svgCode = CharacterModule.getSVGCode();
    
    const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>我的 Petfolio</title>
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg-cream: #FFF8F0;
      --accent-coral: #FF6B6B;
      --accent-lavender: #B8A9C9;
      --text-brown: #5D4E37;
    }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Nunito', sans-serif;
      background: var(--bg-cream);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 40px 20px;
    }
    .character-container {
      filter: drop-shadow(0 20px 40px rgba(93,78,55,0.15));
      animation: float 3s ease-in-out infinite;
    }
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
    h1 {
      margin-top: 30px;
      font-size: 2rem;
      background: linear-gradient(135deg, var(--accent-coral), var(--accent-lavender));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .credit {
      margin-top: 20px;
      padding: 12px 24px;
      background: white;
      border-radius: 30px;
      box-shadow: 0 5px 20px rgba(93,78,55,0.1);
      color: var(--text-brown);
      text-decoration: none;
      transition: transform 0.3s;
    }
    .credit:hover {
      transform: translateY(-3px);
    }
  </style>
</head>
<body>
  <div class="character-container">
    ${svgCode}
  </div>
  <h1>👋 你好！</h1>
  <a href="https://youlovedlittlebear.github.io" class="credit" target="_blank">
    🐻 来自 Petfolio 的问候
  </a>
</body>
</html>`;

    // 创建下载
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'my-petfolio.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  return {
    init,
    open,
    close
  };
})();

// 添加惊讶动画样式
const style = document.createElement('style');
style.textContent = `
  @keyframes surprise {
    0% { transform: scale(1); }
    30% { transform: scale(1.1) rotate(-5deg); }
    60% { transform: scale(1.05) rotate(3deg); }
    100% { transform: scale(1) rotate(0); }
  }
`;
document.head.appendChild(style);
