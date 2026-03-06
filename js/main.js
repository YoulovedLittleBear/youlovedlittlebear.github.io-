/**
 * Petfolio - 主入口
 * 初始化所有模块
 */

document.addEventListener('DOMContentLoaded', () => {
  // 初始化角色模块
  CharacterModule.init();
  
  // 初始化自定义面板
  CustomizeModule.init();
  
  // 初始化作品展示
  PortfolioModule.init();
  
  // 添加页面加载动画
  addLoadAnimation();
  
  console.log('🐻 Petfolio 已加载！');
  console.log('👋 欢迎访问 YoulovedLittleBear 的主页');
});

// 页面加载动画
function addLoadAnimation() {
  const elements = document.querySelectorAll('.portfolio-zone, .character-area, .header');
  
  elements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 100 + index * 100);
  });
}

// 添加彩蛋：Konami Code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
  konamiCode.push(e.key);
  konamiCode = konamiCode.slice(-10);
  
  if (konamiCode.join(',') === konamiSequence.join(',')) {
    activateRainbow();
  }
});

function activateRainbow() {
  document.body.style.animation = 'rainbow 2s linear infinite';
  
  const style = document.createElement('style');
  style.textContent = `
    @keyframes rainbow {
      0% { filter: hue-rotate(0deg); }
      100% { filter: hue-rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
  
  // 3秒后恢复
  setTimeout(() => {
    document.body.style.animation = '';
  }, 5000);
}
