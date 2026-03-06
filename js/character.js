/**
 * Petfolio - 角色 SVG 渲染模块
 * 负责生成和管理动物角色的 SVG
 */

const CharacterModule = (function() {
  // 颜色配置
  const colorSchemes = {
    honey: {
      primary: '#FFCC99',
      secondary: '#FFB380',
      belly: '#FFE4C4',
      blush: '#FFB5B5'
    },
    strawberry: {
      primary: '#FFB5C5',
      secondary: '#FF9AB0',
      belly: '#FFD4DE',
      blush: '#FF8FAA'
    },
    mint: {
      primary: '#A8E6CF',
      secondary: '#7ECEC0',
      belly: '#D4F5E9',
      blush: '#FFB5B5'
    },
    lavender: {
      primary: '#D4B8E0',
      secondary: '#B8A9C9',
      belly: '#E8DCF0',
      blush: '#FFB5B5'
    },
    sky: {
      primary: '#87CEEB',
      secondary: '#6BB3D9',
      belly: '#C5E8F7',
      blush: '#FFB5B5'
    }
  };

  // 当前状态
  let currentState = {
    color: 'honey',
    hat: 'none',
    glasses: 'none',
    clothes: 'none'
  };

  // 生成基础角色 SVG
  function generateBaseBear(colors) {
    return `
      <!-- 身体阴影 -->
      <ellipse cx="100" cy="210" rx="60" ry="10" fill="rgba(93,78,55,0.1)"/>
      
      <!-- 身体组 -->
      <g class="body">
        <!-- 耳朵 -->
        <circle cx="55" cy="45" r="28" fill="${colors.primary}"/>
        <circle cx="55" cy="45" r="18" fill="${colors.secondary}"/>
        <circle cx="145" cy="45" r="28" fill="${colors.primary}"/>
        <circle cx="145" cy="45" r="18" fill="${colors.secondary}"/>
        
        <!-- 头部 -->
        <ellipse cx="100" cy="85" rx="65" ry="60" fill="${colors.primary}"/>
        
        <!-- 身体 -->
        <ellipse cx="100" cy="165" rx="55" ry="50" fill="${colors.primary}"/>
        
        <!-- 肚子 -->
        <ellipse cx="100" cy="170" rx="38" ry="35" fill="${colors.belly}"/>
        
        <!-- 手臂 -->
        <ellipse cx="45" cy="155" rx="18" ry="25" fill="${colors.primary}" transform="rotate(-15, 45, 155)"/>
        <ellipse cx="155" cy="155" rx="18" ry="25" fill="${colors.primary}" transform="rotate(15, 155, 155)"/>
        
        <!-- 脚 -->
        <ellipse cx="70" cy="200" rx="22" ry="15" fill="${colors.primary}"/>
        <ellipse cx="130" cy="200" rx="22" ry="15" fill="${colors.primary}"/>
        <ellipse cx="70" cy="202" rx="15" ry="10" fill="${colors.secondary}"/>
        <ellipse cx="130" cy="202" rx="15" ry="10" fill="${colors.secondary}"/>
      </g>
    `;
  }

  // 生成面部
  function generateFace(colors, hasGlasses) {
    const eyeSize = hasGlasses ? { rx: 10, ry: 12 } : { rx: 12, ry: 14 };
    const highlightSize = hasGlasses ? 4 : 5;
    
    return `
      <g class="face">
        <!-- 眼睛 -->
        <g class="eyes">
          <ellipse cx="75" cy="80" rx="${eyeSize.rx}" ry="${eyeSize.ry}" fill="#5D4E37"/>
          <ellipse cx="125" cy="80" rx="${eyeSize.rx}" ry="${eyeSize.ry}" fill="#5D4E37"/>
          <!-- 眼睛高光 -->
          <circle cx="79" cy="76" r="${highlightSize}" fill="white"/>
          <circle cx="129" cy="76" r="${highlightSize}" fill="white"/>
          <circle cx="72" cy="82" r="2" fill="white"/>
          <circle cx="122" cy="82" r="2" fill="white"/>
        </g>
        
        <!-- 腮红 -->
        <ellipse cx="50" cy="95" rx="12" ry="8" fill="${colors.blush}" opacity="0.5"/>
        <ellipse cx="150" cy="95" rx="12" ry="8" fill="${colors.blush}" opacity="0.5"/>
        
        <!-- 鼻子 -->
        <ellipse cx="100" cy="100" rx="10" ry="8" fill="#5D4E37"/>
        <ellipse cx="100" cy="98" rx="4" ry="3" fill="#8B7355"/>
        
        <!-- 嘴巴 -->
        <path d="M 90 110 Q 100 120 110 110" stroke="#5D4E37" stroke-width="3" fill="none" stroke-linecap="round"/>
      </g>
    `;
  }

  // 帽子 SVG
  const hats = {
    none: '',
    santa: `
      <g class="hat" transform="translate(10, -15)">
        <path d="M 35 55 Q 90 60 145 55 L 140 45 Q 90 50 40 45 Z" fill="#C41E3A"/>
        <path d="M 45 45 Q 90 10 115 -20" stroke="#C41E3A" stroke-width="40" fill="none" stroke-linecap="round"/>
        <ellipse cx="118" cy="-22" rx="14" ry="14" fill="white"/>
        <ellipse cx="90" cy="58" rx="55" ry="12" fill="white"/>
      </g>
    `,
    beret: `
      <g class="hat" transform="translate(0, -25)">
        <ellipse cx="100" cy="50" rx="55" ry="15" fill="#5D4E37"/>
        <ellipse cx="100" cy="35" rx="48" ry="28" fill="#8B7355"/>
        <circle cx="100" cy="12" r="10" fill="#5D4E37"/>
      </g>
    `,
    party: `
      <g class="hat" transform="translate(0, -20)">
        <defs>
          <pattern id="partyStripes" patternUnits="userSpaceOnUse" width="10" height="10" patternTransform="rotate(45)">
            <rect width="5" height="10" fill="#FF6B6B"/>
          </pattern>
        </defs>
        <polygon points="100,0 70,55 130,55" fill="#FFD93D"/>
        <polygon points="100,0 70,55 130,55" fill="url(#partyStripes)" opacity="0.4"/>
        <ellipse cx="100" cy="55" rx="32" ry="8" fill="#FF6B6B"/>
        <circle cx="100" cy="3" r="10" fill="#FF6B6B"/>
        <path d="M 95 3 Q 85 15 88 30" stroke="#7ECEC0" stroke-width="2.5" fill="none"/>
        <path d="M 105 3 Q 115 20 112 35" stroke="#B8A9C9" stroke-width="2.5" fill="none"/>
      </g>
    `,
    chef: `
      <g class="hat" transform="translate(0, -35)">
        <ellipse cx="100" cy="65" rx="45" ry="12" fill="#E8E8E8"/>
        <rect x="58" y="40" width="84" height="28" fill="white"/>
        <ellipse cx="100" cy="28" rx="38" ry="28" fill="white"/>
        <ellipse cx="70" cy="32" rx="18" ry="22" fill="white"/>
        <ellipse cx="130" cy="32" rx="18" ry="22" fill="white"/>
      </g>
    `
  };

  // 眼镜 SVG
  const glasses = {
    none: '',
    round: `
      <g class="glasses">
        <circle cx="75" cy="80" r="22" fill="none" stroke="#5D4E37" stroke-width="3"/>
        <circle cx="125" cy="80" r="22" fill="none" stroke="#5D4E37" stroke-width="3"/>
        <path d="M 97 80 L 103 80" stroke="#5D4E37" stroke-width="3"/>
        <path d="M 53 78 L 40 75" stroke="#5D4E37" stroke-width="2.5"/>
        <path d="M 147 78 L 160 75" stroke="#5D4E37" stroke-width="2.5"/>
      </g>
    `,
    heart: `
      <g class="glasses">
        <path d="M 75 65 C 55 65 48 82 75 100 C 102 82 95 65 75 65" fill="#FF6B6B"/>
        <path d="M 125 65 C 105 65 98 82 125 100 C 152 82 145 65 125 65" fill="#FF6B6B"/>
        <path d="M 95 82 L 105 82" stroke="#5D4E37" stroke-width="3"/>
        <path d="M 55 78 L 42 75" stroke="#5D4E37" stroke-width="2.5"/>
        <path d="M 145 78 L 158 75" stroke="#5D4E37" stroke-width="2.5"/>
      </g>
    `,
    aviator: `
      <g class="glasses">
        <ellipse cx="72" cy="82" rx="28" ry="22" fill="#2C3E50" opacity="0.75"/>
        <ellipse cx="128" cy="82" rx="28" ry="22" fill="#2C3E50" opacity="0.75"/>
        <ellipse cx="72" cy="82" rx="28" ry="22" fill="none" stroke="#C9A227" stroke-width="2.5"/>
        <ellipse cx="128" cy="82" rx="28" ry="22" fill="none" stroke="#C9A227" stroke-width="2.5"/>
        <path d="M 96 82 L 104 82" stroke="#C9A227" stroke-width="2.5"/>
        <path d="M 44 80 L 32 76" stroke="#C9A227" stroke-width="2"/>
        <path d="M 156 80 L 168 76" stroke="#C9A227" stroke-width="2"/>
      </g>
    `,
    star: `
      <g class="glasses">
        <polygon points="75,58 80,72 95,72 83,82 88,96 75,86 62,96 67,82 55,72 70,72" fill="#FFD93D" stroke="#E8B800" stroke-width="1.5"/>
        <polygon points="125,58 130,72 145,72 133,82 138,96 125,86 112,96 117,82 105,72 120,72" fill="#FFD93D" stroke="#E8B800" stroke-width="1.5"/>
        <path d="M 92 77 L 108 77" stroke="#5D4E37" stroke-width="2.5"/>
        <path d="M 58 72 L 45 68" stroke="#5D4E37" stroke-width="2"/>
        <path d="M 142 72 L 155 68" stroke="#5D4E37" stroke-width="2"/>
      </g>
    `
  };

  // 衣服配饰 SVG
  const clothes = {
    none: '',
    scarf: `
      <g class="clothes" transform="translate(0, 105)">
        <path d="M 50 20 Q 100 25 150 20 Q 155 30 150 40 Q 100 45 50 40 Q 45 30 50 20" fill="#C41E3A"/>
        <rect x="130" y="35" width="18" height="45" rx="5" fill="#C41E3A"/>
        <rect x="52" y="35" width="18" height="35" rx="5" fill="#C41E3A"/>
        <line x1="55" y1="50" x2="67" y2="50" stroke="#A01828" stroke-width="3"/>
        <line x1="55" y1="58" x2="67" y2="58" stroke="#A01828" stroke-width="3"/>
        <line x1="133" y1="55" x2="145" y2="55" stroke="#A01828" stroke-width="3"/>
        <line x1="133" y1="68" x2="145" y2="68" stroke="#A01828" stroke-width="3"/>
      </g>
    `,
    bowtie: `
      <g class="clothes" transform="translate(0, 115)">
        <ellipse cx="70" cy="20" rx="24" ry="16" fill="#FF6B6B"/>
        <ellipse cx="130" cy="20" rx="24" ry="16" fill="#FF6B6B"/>
        <ellipse cx="100" cy="20" rx="12" ry="10" fill="#C41E3A"/>
        <path d="M 95 15 Q 100 10 105 15" stroke="#FFB5B5" stroke-width="2" fill="none"/>
      </g>
    `,
    overalls: `
      <g class="clothes" transform="translate(0, 125)">
        <path d="M 55 15 L 55 75 L 78 75 L 78 40 L 122 40 L 122 75 L 145 75 L 145 15 Z" fill="#4A90D9"/>
        <rect x="82" y="20" width="36" height="18" rx="3" fill="#3A7BC8"/>
        <path d="M 60 15 L 75 -15" stroke="#4A90D9" stroke-width="10" stroke-linecap="round"/>
        <path d="M 140 15 L 125 -15" stroke="#4A90D9" stroke-width="10" stroke-linecap="round"/>
        <circle cx="75" cy="-15" r="6" fill="#FFD93D"/>
        <circle cx="125" cy="-15" r="6" fill="#FFD93D"/>
      </g>
    `,
    cape: `
      <g class="clothes" transform="translate(0, 95)">
        <path d="M 100 0 L 35 100 Q 100 85 165 100 L 100 0" fill="#B8A9C9"/>
        <path d="M 100 0 L 55 100 Q 100 88 145 100 L 100 0" fill="#9B8BB8"/>
        <ellipse cx="100" cy="3" rx="14" ry="10" fill="#C41E3A"/>
        <circle cx="100" cy="3" r="5" fill="#FFD93D"/>
      </g>
    `
  };

  // 生成完整角色 SVG
  function generateCharacter(state) {
    const colors = colorSchemes[state.color];
    const hasGlasses = state.glasses !== 'none';
    
    // 构建 SVG 层级（顺序很重要）
    let svg = `
      <svg class="character-svg" width="200" height="220" viewBox="0 0 200 220">
        <style>
          .body { transform-origin: center bottom; animation: breathe 2.5s ease-in-out infinite; }
          .eyes { transform-origin: center; animation: blink 4s ease-in-out infinite; }
          @keyframes breathe { 0%, 100% { transform: scaleY(1); } 50% { transform: scaleY(1.02); } }
          @keyframes blink { 0%, 90%, 100% { transform: scaleY(1); } 95% { transform: scaleY(0.1); } }
        </style>
        
        ${generateBaseBear(colors)}
        ${clothes[state.clothes]}
        ${generateFace(colors, hasGlasses)}
        ${glasses[state.glasses]}
        ${hats[state.hat]}
      </svg>
    `;
    
    return svg;
  }

  // 渲染角色到容器
  function render(containerId) {
    const container = document.getElementById(containerId);
    if (container) {
      container.innerHTML = generateCharacter(currentState);
    }
  }

  // 更新状态并重新渲染
  function update(newState) {
    currentState = { ...currentState, ...newState };
    render('characterContainer');
    // 保存到 localStorage
    localStorage.setItem('petfolioState', JSON.stringify(currentState));
  }

  // 随机生成
  function randomize() {
    const colors = Object.keys(colorSchemes);
    const hatKeys = Object.keys(hats);
    const glassesKeys = Object.keys(glasses);
    const clothesKeys = Object.keys(clothes);
    
    update({
      color: colors[Math.floor(Math.random() * colors.length)],
      hat: hatKeys[Math.floor(Math.random() * hatKeys.length)],
      glasses: glassesKeys[Math.floor(Math.random() * glassesKeys.length)],
      clothes: clothesKeys[Math.floor(Math.random() * clothesKeys.length)]
    });
  }

  // 初始化
  function init() {
    // 尝试从 localStorage 恢复状态
    const saved = localStorage.getItem('petfolioState');
    if (saved) {
      try {
        currentState = JSON.parse(saved);
      } catch (e) {
        console.log('使用默认状态');
      }
    }
    render('characterContainer');
  }

  // 获取当前状态
  function getState() {
    return { ...currentState };
  }

  // 获取完整 SVG 代码
  function getSVGCode() {
    return generateCharacter(currentState);
  }

  return {
    init,
    update,
    randomize,
    getState,
    getSVGCode,
    colorSchemes
  };
})();
