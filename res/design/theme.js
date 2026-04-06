// 主题配置
const theme = {
    // 渐变背景
    gradient: {
        colors: [
            '#E8F4F8 0%',
            '#F0E6F0 25%',
            '#E6EAF5 50%',
            '#F5F0E8 75%',
            '#E8F0F5 100%'
        ],
        angle: '135deg'
    },
    
    // 装饰圆形颜色
    orbs: [
        { color: 'rgba(120, 160, 200, 0.25)', innerColor: 'rgba(120, 160, 180, 0.1)' },
        { color: 'rgba(180, 140, 180, 0.25)', innerColor: 'rgba(180, 140, 180, 0.1)' },
        { color: 'rgba(200, 180, 160, 0.25)', innerColor: 'rgba(200, 180, 160, 0.1)' }
    ],
    
    // 主题色
    colors: {
        primary: '#5A6B7A',
        primaryLight: '#8B7B8B',
        text: '#3A3A3A',
        textSecondary: '#6A6A6A'
    },
    
    // 毛玻璃效果 - iOS Control Center 风格
    glass: {
        blur: '40px',
        bg: 'rgba(255, 255, 255, 0.45)',
        border: 'rgba(255, 255, 255, 0.5)',
        shadow: 'rgba(0, 0, 0, 0.08)'
    }
};

// 应用主题到 CSS 变量
function applyTheme() {
    const root = document.documentElement;
    
    // 渐变
    const gradientStr = `linear-gradient(${theme.gradient.angle}, ${theme.gradient.colors.join(', ')})`;
    root.style.setProperty('--theme-gradient', gradientStr);
    
    // 装饰圆形
    theme.orbs.forEach((orb, index) => {
        root.style.setProperty(`--theme-orb-${index + 1}`, orb.color);
        root.style.setProperty(`--theme-orb-${index + 1}-inner`, orb.innerColor);
    });
    
    // 主题色
    root.style.setProperty('--theme-primary', theme.colors.primary);
    root.style.setProperty('--theme-primary-light', theme.colors.primaryLight);
    root.style.setProperty('--theme-text', theme.colors.text);
    root.style.setProperty('--theme-text-secondary', theme.colors.textSecondary);
    
    // 毛玻璃
    root.style.setProperty('--theme-glass-blur', theme.glass.blur);
    root.style.setProperty('--theme-glass-bg', theme.glass.bg);
    root.style.setProperty('--theme-glass-border', theme.glass.border);
    root.style.setProperty('--theme-glass-shadow', theme.glass.shadow);
}

// 自动应用
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyTheme);
} else {
    applyTheme();
}
