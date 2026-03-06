/**
 * Petfolio - 作品展示模块
 * 管理四个作品展示区和弹窗
 */

const PortfolioModule = (function() {
  // 作品数据（你可以替换成自己的作品）
  const portfolioData = {
    ui: {
      title: 'UI/UX 设计',
      icon: '🎨',
      works: [
        {
          title: '移动应用设计',
          description: '社交 App 界面设计',
          emoji: '📱',
          link: '#'
        },
        {
          title: '仪表盘设计',
          description: '数据可视化后台',
          emoji: '📊',
          link: '#'
        },
        {
          title: '电商网站',
          description: '购物平台 UI 设计',
          emoji: '🛒',
          link: '#'
        },
        {
          title: '设计系统',
          description: '组件库与规范',
          emoji: '🧩',
          link: '#'
        }
      ]
    },
    illustration: {
      title: '插画作品',
      icon: '✨',
      works: [
        {
          title: '角色设计',
          description: '可爱动物系列',
          emoji: '🐻',
          link: '#'
        },
        {
          title: '场景插画',
          description: '梦幻世界',
          emoji: '🌈',
          link: '#'
        },
        {
          title: '图标设计',
          description: '扁平化图标集',
          emoji: '⭐',
          link: '#'
        },
        {
          title: '表情包',
          description: '日常表情系列',
          emoji: '😊',
          link: '#'
        }
      ]
    },
    motion: {
      title: '动效设计',
      icon: '🎬',
      works: [
        {
          title: '加载动画',
          description: '趣味等待体验',
          emoji: '⏳',
          link: '#'
        },
        {
          title: '转场效果',
          description: '页面切换动画',
          emoji: '🔄',
          link: '#'
        },
        {
          title: '微交互',
          description: '按钮与反馈动效',
          emoji: '👆',
          link: '#'
        },
        {
          title: 'Lottie 动画',
          description: '轻量级动画',
          emoji: '✨',
          link: '#'
        }
      ]
    },
    brand: {
      title: '品牌设计',
      icon: '💼',
      works: [
        {
          title: 'Logo 设计',
          description: '品牌标识系统',
          emoji: '🏷️',
          link: '#'
        },
        {
          title: '视觉识别',
          description: 'VI 设计规范',
          emoji: '📐',
          link: '#'
        },
        {
          title: '包装设计',
          description: '产品包装视觉',
          emoji: '📦',
          link: '#'
        },
        {
          title: '海报设计',
          description: '活动宣传物料',
          emoji: '🖼️',
          link: '#'
        }
      ]
    }
  };

  // DOM 元素
  let modal, modalClose, modalIcon, modalTitle, workGrid, overlay;
  let zones;

  // 初始化
  function init() {
    modal = document.getElementById('workModal');
    modalClose = document.getElementById('modalClose');
    modalIcon = document.getElementById('modalIcon');
    modalTitle = document.getElementById('modalTitle');
    workGrid = document.getElementById('workGrid');
    overlay = document.getElementById('overlay');
    
    zones = document.querySelectorAll('.portfolio-zone');

    // 绑定区域点击事件
    zones.forEach(zone => {
      zone.addEventListener('click', () => {
        const category = zone.dataset.category;
        openModal(category);
      });
    });

    // 关闭弹窗
    modalClose.addEventListener('click', closeModal);
    
    // 点击遮罩时也检查是否需要关闭弹窗
    overlay.addEventListener('click', () => {
      if (modal.classList.contains('active')) {
        closeModal();
      }
    });

    // ESC 键关闭
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });
  }

  // 打开弹窗
  function openModal(category) {
    const data = portfolioData[category];
    if (!data) return;

    modalIcon.textContent = data.icon;
    modalTitle.textContent = data.title;

    // 生成作品卡片
    workGrid.innerHTML = data.works.map(work => `
      <a href="${work.link}" class="work-card" target="_blank">
        <div class="work-card-image">${work.emoji}</div>
        <div class="work-card-info">
          <h4>${work.title}</h4>
          <p>${work.description}</p>
        </div>
      </a>
    `).join('');

    modal.classList.add('active');
    overlay.classList.add('active');
  }

  // 关闭弹窗
  function closeModal() {
    modal.classList.remove('active');
    // 不在这里关闭 overlay，让其他模块管理
    if (!document.getElementById('customizePanel').classList.contains('active')) {
      overlay.classList.remove('active');
    }
  }

  return {
    init,
    openModal,
    closeModal
  };
})();
