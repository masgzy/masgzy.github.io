# 主题配置文档

本文档说明如何通过 `res/theme.js` 自定义网站的主题样式。

## 文件位置

```
res/theme.js    # 主题配置文件
```

## 配置结构

```javascript
const theme = {
    // 渐变背景
    gradient: {
        colors: [...],    // 渐变颜色数组
        angle: '135deg'   // 渐变角度
    },
    
    // 装饰圆形颜色
    orbs: [...],
    
    // 主题色
    colors: {...},
    
    // 毛玻璃效果
    glass: {...}
};
```

---

## 渐变背景 (gradient)

配置页面背景渐变。

```javascript
gradient: {
    colors: [
        '#E8F4F8 0%',      // 淡蓝 - 起始位置
        '#F0E6F0 25%',     // 淡紫 - 25%位置
        '#E6EAF5 50%',     // 淡蓝灰 - 50%位置
        '#F5F0E8 75%',     // 米色 - 75%位置
        '#E8F0F5 100%'     // 淡蓝 - 结束位置
    ],
    angle: '135deg'        // 渐变角度
}
```

**参数说明：**
- `colors`: 颜色数组，格式为 `颜色值 位置百分比`
- `angle`: 渐变角度，可选值：`0deg` - `360deg`

**预设方案：**

| 名称 | 配置 |
|------|------|
| 默认(柔和) | `['#E8F4F8 0%', '#F0E6F0 25%', '#E6EAF5 50%', '#F5F0E8 75%', '#E8F0F5 100%']` |
| 日落 | `['#FFE5B4 0%', '#FFCCCB 35%', '#FFB6C1 70%', '#DDA0DD 100%']` |
| 海洋 | `['#E0F7FA 0%', '#B2EBF2 50%', '#80DEEA 100%']` |
| 森林 | `['#E8F5E9 0%', '#C8E6C9 50%', '#A5D6A7 100%']` |
| 渐变紫 | `['#EDE7F6 0%', '#D1C4E9 50%', '#B39DDB 100%']` |

---

## 装饰圆形 (orbs)

配置背景装饰性渐变圆形。

```javascript
orbs: [
    {
        color: 'rgba(120, 160, 200, 0.25)',       // 主要颜色
        innerColor: 'rgba(120, 160, 200, 0.1)'    // 内部颜色(更透明)
    },
    {
        color: 'rgba(180, 140, 180, 0.25)',
        innerColor: 'rgba(180, 140, 180, 0.1)'
    },
    {
        color: 'rgba(200, 180, 160, 0.25)',
        innerColor: 'rgba(200, 180, 160, 0.1)'
    }
]
```

**参数说明：**
- `color`: 圆形中心颜色 (建议透明度 0.15 - 0.35)
- `innerColor`: 圆形边缘颜色 (建议透明度 0.05 - 0.15)

**配色建议：**
- 颜色应与渐变背景协调
- 建议使用 rgba 格式便于控制透明度
- 三个圆形使用不同色调增加层次感

---

## 主题色 (colors)

配置网站主要文字和强调色。

```javascript
colors: {
    primary: '#5A6B7A',         // 主色调 - 用于标题、按钮等
    primaryLight: '#8B7B8B',    // 浅主色调 - 用于渐变结束
    text: '#3A3A3A',            // 主要文字颜色
    textSecondary: '#6A6A6A'    // 次要文字颜色
}
```

**参数说明：**
- `primary`: 用于标题渐变起始色、按钮等
- `primaryLight`: 用于标题渐变结束色
- `text`: 页面主要文字颜色
- `textSecondary`: 描述文字等次要颜色

---

## 毛玻璃效果 (glass)

配置卡片的毛玻璃样式。

```javascript
glass: {
    blur: '40px',                       // 模糊程度
    bg: 'rgba(255, 255, 255, 0.5)',     // 背景颜色
    border: 'rgba(255, 255, 255, 0.6)', // 边框颜色
    shadow: 'rgba(90, 107, 122, 0.1)'   // 阴影颜色
}
```

**参数说明：**
- `blur`: 背景模糊程度，值越大越模糊 (推荐 20px - 60px)
- `bg`: 卡片背景色，透明度影响毛玻璃明显程度 (推荐 0.4 - 0.7)
- `border`: 卡片边框颜色
- `shadow`: 卡片阴影颜色

---

## CSS 变量映射

`theme.js` 会将配置映射到以下 CSS 变量：

| 配置项 | CSS 变量 |
|--------|----------|
| gradient | `--theme-gradient` |
| orbs[0].color | `--theme-orb-1` |
| orbs[0].innerColor | `--theme-orb-1-inner` |
| orbs[1].color | `--theme-orb-2` |
| orbs[1].innerColor | `--theme-orb-2-inner` |
| orbs[2].color | `--theme-orb-3` |
| orbs[2].innerColor | `--theme-orb-3-inner` |
| colors.primary | `--theme-primary` |
| colors.primaryLight | `--theme-primary-light` |
| colors.text | `--theme-text` |
| colors.textSecondary | `--theme-text-secondary` |
| glass.blur | `--theme-glass-blur` |
| glass.bg | `--theme-glass-bg` |
| glass.border | `--theme-glass-border` |
| glass.shadow | `--theme-glass-shadow` |

---

## 使用示例

### 示例1：改为暖色调

```javascript
const theme = {
    gradient: {
        colors: [
            '#FFF8E7 0%',
            '#FFE4C4 30%',
            '#FFDAB9 60%',
            '#FFE4E1 100%'
        ],
        angle: '135deg'
    },
    orbs: [
        { color: 'rgba(255, 160, 100, 0.25)', innerColor: 'rgba(255, 160, 100, 0.1)' },
        { color: 'rgba(255, 120, 120, 0.25)', innerColor: 'rgba(255, 120, 120, 0.1)' },
        { color: 'rgba(255, 200, 150, 0.25)', innerColor: 'rgba(255, 200, 150, 0.1)' }
    ],
    colors: {
        primary: '#B8860B',
        primaryLight: '#DAA520',
        text: '#4A4A4A',
        textSecondary: '#7A7A7A'
    },
    glass: {
        blur: '40px',
        bg: 'rgba(255, 255, 255, 0.5)',
        border: 'rgba(255, 255, 255, 0.6)',
        shadow: 'rgba(184, 134, 11, 0.1)'
    }
};
```

### 示例2：改为深色主题

```javascript
const theme = {
    gradient: {
        colors: [
            '#1a1a2e 0%',
            '#16213e 50%',
            '#0f3460 100%'
        ],
        angle: '145deg'
    },
    orbs: [
        { color: 'rgba(100, 100, 200, 0.15)', innerColor: 'rgba(100, 100, 200, 0.05)' },
        { color: 'rgba(150, 100, 180, 0.15)', innerColor: 'rgba(150, 100, 180, 0.05)' },
        { color: 'rgba(80, 150, 180, 0.15)', innerColor: 'rgba(80, 150, 180, 0.05)' }
    ],
    colors: {
        primary: '#94a3b8',
        primaryLight: '#cbd5e1',
        text: '#e2e8f0',
        textSecondary: '#94a3b8'
    },
    glass: {
        blur: '40px',
        bg: 'rgba(30, 30, 50, 0.6)',
        border: 'rgba(100, 100, 150, 0.3)',
        shadow: 'rgba(0, 0, 0, 0.3)'
    }
};
```

---

## 注意事项

1. **颜色格式**: 推荐使用 `rgba()` 格式，便于控制透明度
2. **透明度**: 装饰圆形透明度不宜过高，避免喧宾夺主
3. **对比度**: 确保文字颜色与背景有足够对比度，保证可读性
4. **测试**: 修改后请在多个页面测试效果一致性

---

## 调用方法

### 1. 引入脚本

在 HTML 页面中引入 `theme.js`，必须**在 CSS 之后、其他 JS 之前**引入：

```html
<!-- 根目录下的页面 (如 index.html, 404.html) -->
<link rel="stylesheet" href="res/index.css" />
<script src="res/theme.js"></script>    <!-- 引入主题 -->
<script src="res/config.js"></script>
<script src="res/app.js"></script>
```

```html
<!-- 子目录下的页面 (如 down/index.html) -->
<link rel="stylesheet" href="index.css" />
<script src="../res/theme.js"></script>  <!-- 使用相对路径 -->
<script src="config.js"></script>
<script src="app.js"></script>
```

### 2. 自动应用

`theme.js` 会在加载时自动执行 `applyTheme()` 函数，将配置应用到 CSS 变量。无需手动调用。

### 3. 手动调用

如需在运行时动态修改主题：

```javascript
// 修改配置
theme.colors.primary = '#FF6B6B';
theme.colors.primaryLight = '#FF8E8E';

// 重新应用
applyTheme();
```

### 4. 切换主题

可以预设多个主题并切换：

```javascript
// 定义多个主题
const themes = {
    light: {
        gradient: { colors: ['#E8F4F8 0%', '#F0E6F0 50%', '#E8F0F5 100%'], angle: '135deg' },
        colors: { primary: '#5A6B7A', primaryLight: '#8B7B8B' }
    },
    dark: {
        gradient: { colors: ['#1a1a2e 0%', '#16213e 50%', '#0f3460 100%'], angle: '145deg' },
        colors: { primary: '#94a3b8', primaryLight: '#cbd5e1' }
    }
};

// 切换主题函数
function switchTheme(name) {
    const t = themes[name];
    Object.assign(theme.gradient, t.gradient);
    Object.assign(theme.colors, t.colors);
    applyTheme();
}

// 使用
switchTheme('dark');
```

### 5. CSS 中使用变量

在 CSS 中使用主题变量：

```css
.my-element {
    background: var(--theme-gradient);
    color: var(--theme-primary);
    backdrop-filter: blur(var(--theme-glass-blur));
    background-color: var(--theme-glass-bg);
}
```

### 6. JS 中读取变量

在 JavaScript 中读取当前主题值：

```javascript
// 读取 CSS 变量
const primary = getComputedStyle(document.documentElement)
    .getPropertyValue('--theme-primary').trim();

// 读取 theme 对象
console.log(theme.colors.primary);
```

---

## 加载顺序

正确的加载顺序至关重要：

```
1. CSS 文件加载 (包含 CSS 变量默认值)
2. theme.js 加载 (覆盖 CSS 变量)
3. 其他 JS 文件加载 (可使用主题变量)
4. DOM 渲染完成
```

**错误示例：**
```html
<!-- 错误：theme.js 在 CSS 之前加载 -->
<script src="res/theme.js"></script>  <!-- ❌ 此时 CSS 变量未定义 -->
<link rel="stylesheet" href="res/index.css" />
```

**正确示例：**
```html
<!-- 正确：CSS 先加载，theme.js 后加载 -->
<link rel="stylesheet" href="res/index.css" />
<script src="res/theme.js"></script>  <!-- ✅ CSS 变量已定义 -->
```

---

## 相关文件

- `res/theme.js` - 主题配置
- `res/index.css` - 主页样式
- `down/index.css` - 下载页样式
- `404.html` - 404页面样式(内联)
