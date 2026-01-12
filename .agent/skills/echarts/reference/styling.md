# Styling Reference

Colors, themes, visual styling, labels, and animations.

## Table of Contents
- [Color Palette](#color-palette)
- [Item Styles](#item-styles)
- [Line and Area Styles](#line-and-area-styles)
- [Labels](#labels)
- [Rich Text](#rich-text)
- [Emphasis States](#emphasis-states)
- [Themes](#themes)
- [Animations](#animations)
- [Responsive Design](#responsive-design)

---

## Color Palette

### Global Color Array

```javascript
option = {
  // Global palette - series auto-pick colors in order
  color: [
    '#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de',
    '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'
  ]
};
```

### Individual Colors

```javascript
series: [{
  type: 'bar',
  // Single color for entire series
  itemStyle: { color: '#5470c6' },
  
  // Per-item colors
  data: [
    { value: 120, itemStyle: { color: '#ff0000' } },
    { value: 200, itemStyle: { color: '#00ff00' } },
    { value: 150 }  // Uses series or global color
  ]
}]
```

### Gradient Colors

```javascript
itemStyle: {
  // Linear gradient
  color: {
    type: 'linear',
    x: 0, y: 0, x2: 0, y2: 1,      // Direction (0,0)-(0,1) = top to bottom
    colorStops: [
      { offset: 0, color: '#ff0000' },
      { offset: 0.5, color: '#ffff00' },
      { offset: 1, color: '#00ff00' }
    ]
  }
}

// Radial gradient
itemStyle: {
  color: {
    type: 'radial',
    x: 0.5, y: 0.5, r: 0.5,        // Center and radius (0-1)
    colorStops: [
      { offset: 0, color: '#fff' },
      { offset: 1, color: '#5470c6' }
    ]
  }
}
```

### Color Functions

```javascript
series: [{
  type: 'bar',
  itemStyle: {
    // Dynamic color based on value
    color: function(params) {
      const value = params.value;
      if (value > 100) return '#ff0000';
      if (value > 50) return '#ffaa00';
      return '#00ff00';
    }
  }
}]
```

### Built-in Color Utilities

```javascript
// Within formatter functions
echarts.color.lift('#5470c6', 0.1);     // Lighten
echarts.color.lift('#5470c6', -0.1);    // Darken
echarts.color.parse('#5470c6');          // Parse to RGBA array
```

---

## Item Styles

### itemStyle Properties

```javascript
itemStyle: {
  color: '#5470c6',
  borderColor: '#333',
  borderWidth: 1,
  borderType: 'solid',             // 'solid' | 'dashed' | 'dotted'
  borderRadius: 4,                 // Single value or [tl, tr, br, bl]
  shadowBlur: 10,
  shadowColor: 'rgba(0,0,0,0.3)',
  shadowOffsetX: 0,
  shadowOffsetY: 5,
  opacity: 1,
  
  // Decal pattern (accessibility)
  decal: {
    symbol: 'rect',                // 'circle' | 'rect' | 'roundRect' | 'triangle' | 'diamond' | 'pin' | 'arrow' | 'none' | path://
    symbolSize: 1,
    symbolKeepAspect: true,
    color: 'rgba(0,0,0,0.2)',
    backgroundColor: 'transparent',
    dashArrayX: 5,
    dashArrayY: 5,
    rotation: 0,
    maxTileWidth: 512,
    maxTileHeight: 512
  }
}
```

---

## Line and Area Styles

### lineStyle

```javascript
lineStyle: {
  color: '#5470c6',
  width: 2,
  type: 'solid',                   // 'solid' | 'dashed' | 'dotted' | [5, 10]
  dashOffset: 0,
  cap: 'butt',                     // 'butt' | 'round' | 'square'
  join: 'bevel',                   // 'bevel' | 'round' | 'miter'
  miterLimit: 10,
  shadowBlur: 0,
  shadowColor: 'transparent',
  shadowOffsetX: 0,
  shadowOffsetY: 0,
  opacity: 1
}
```

### areaStyle

```javascript
areaStyle: {
  color: '#5470c6',
  // OR gradient:
  color: {
    type: 'linear',
    x: 0, y: 0, x2: 0, y2: 1,
    colorStops: [
      { offset: 0, color: 'rgba(84,112,198,0.5)' },
      { offset: 1, color: 'rgba(84,112,198,0)' }
    ]
  },
  origin: 'auto',                  // 'auto' | 'start' | 'end' | number
  shadowBlur: 0,
  shadowColor: 'transparent',
  shadowOffsetX: 0,
  shadowOffsetY: 0,
  opacity: 0.7
}
```

---

## Labels

### Basic Labels

```javascript
label: {
  show: true,
  position: 'top',                 // Position varies by chart type
  distance: 5,                     // Distance from data point
  rotate: 0,
  
  // Formatter
  formatter: '{b}: {c}',           // Template string
  // OR function:
  formatter: function(params) {
    return params.name + ': ' + params.value.toFixed(2);
  },
  
  // Text style
  color: '#333',
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontFamily: 'sans-serif',
  fontSize: 12,
  lineHeight: 14,
  
  // Background
  backgroundColor: 'transparent',
  borderColor: '#aaa',
  borderWidth: 0,
  borderRadius: 3,
  padding: [2, 4],
  
  // Shadow
  shadowColor: 'transparent',
  shadowBlur: 0,
  shadowOffsetX: 0,
  shadowOffsetY: 0,
  
  // Overflow
  overflow: 'truncate',            // 'truncate' | 'break' | 'breakAll'
  ellipsis: '...'
}
```

### Position by Chart Type

| Chart | Positions |
|-------|-----------|
| bar | `'top'`, `'bottom'`, `'inside'`, `'insideTop'`, `'insideBottom'`, `'insideLeft'`, `'insideRight'` |
| line/scatter | `'top'`, `'bottom'`, `'left'`, `'right'` |
| pie | `'outside'`, `'inside'`, `'center'` |
| funnel | `'left'`, `'right'`, `'inside'`, `'insideLeft'`, `'insideRight'` |

### Label Line (for pie/funnel)

```javascript
labelLine: {
  show: true,
  length: 15,                      // First segment length
  length2: 10,                     // Second segment length
  smooth: false,
  minTurnAngle: 90,
  lineStyle: {
    color: '#aaa',
    width: 1,
    type: 'solid'
  }
}
```

---

## Rich Text

Create styled text with multiple formats.

```javascript
label: {
  formatter: [
    '{title|Title Text}',
    '{value|{c}}',
    '{unit|units}'
  ].join('\n'),
  
  rich: {
    title: {
      color: '#333',
      fontSize: 14,
      fontWeight: 'bold',
      lineHeight: 20
    },
    value: {
      color: '#5470c6',
      fontSize: 24,
      fontWeight: 'bold',
      lineHeight: 30
    },
    unit: {
      color: '#999',
      fontSize: 12,
      lineHeight: 16
    }
  }
}
```

### Rich Text Properties

Each rich text style can have:
- `color`, `backgroundColor`
- `fontSize`, `fontWeight`, `fontStyle`, `fontFamily`
- `lineHeight`, `align`, `verticalAlign`
- `padding`, `borderColor`, `borderWidth`, `borderRadius`
- `width`, `height`
- `textShadowColor`, `textShadowBlur`, `textShadowOffsetX/Y`

### Inline Images

```javascript
formatter: '{img|} Some text',
rich: {
  img: {
    backgroundColor: {
      image: 'path/to/icon.png'
    },
    height: 20,
    width: 20
  }
}
```

---

## Emphasis States

Control appearance on hover/select.

```javascript
series: [{
  type: 'bar',
  
  // Normal state
  itemStyle: { color: '#5470c6' },
  
  // Hover state
  emphasis: {
    disabled: false,               // Disable emphasis entirely
    focus: 'series',               // 'none' | 'self' | 'series' | 'ancestor' | 'descendant'
    blurScope: 'coordinateSystem', // 'coordinateSystem' | 'series' | 'global'
    
    itemStyle: {
      color: '#ff0000',
      shadowBlur: 10,
      shadowColor: 'rgba(0,0,0,0.3)'
    },
    label: {
      show: true,
      fontSize: 14,
      fontWeight: 'bold'
    }
  },
  
  // Selected state (pie, map, etc.)
  select: {
    disabled: false,
    itemStyle: { color: '#00ff00' },
    label: { show: true }
  },
  
  // Blur state (when other items emphasized)
  blur: {
    itemStyle: { opacity: 0.3 },
    label: { show: false }
  }
}]
```

### Focus Modes

| Value | Behavior |
|-------|----------|
| `'none'` | No fade effect |
| `'self'` | Only emphasize current item |
| `'series'` | Emphasize current series, fade others |
| `'ancestor'` | For hierarchical, emphasize ancestors |
| `'descendant'` | For hierarchical, emphasize descendants |

---

## Themes

### Built-in Themes

```javascript
// Light (default)
const chart = echarts.init(dom);

// Dark
const chart = echarts.init(dom, 'dark');
```

### Register Custom Theme

```javascript
// Define theme
const myTheme = {
  color: ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae'],
  backgroundColor: '#f4f4f4',
  textStyle: {
    color: '#333'
  },
  title: {
    textStyle: { color: '#333', fontSize: 18 },
    subtextStyle: { color: '#aaa', fontSize: 12 }
  },
  line: {
    itemStyle: { borderWidth: 2 },
    lineStyle: { width: 2 },
    symbolSize: 4,
    symbol: 'circle',
    smooth: false
  },
  bar: {
    itemStyle: { barBorderWidth: 0, barBorderColor: '#ccc' }
  },
  pie: {
    itemStyle: { borderWidth: 0, borderColor: '#ccc' }
  },
  categoryAxis: {
    axisLine: { lineStyle: { color: '#333' } },
    splitLine: { lineStyle: { color: ['#eee'] } }
  },
  valueAxis: {
    axisLine: { lineStyle: { color: '#333' } },
    splitLine: { lineStyle: { color: ['#eee'] } }
  }
};

// Register
echarts.registerTheme('myTheme', myTheme);

// Use
const chart = echarts.init(dom, 'myTheme');
```

### Theme Builder

Use the official theme builder: https://echarts.apache.org/en/theme-builder.html

Export JSON and register with `echarts.registerTheme()`.

---

## Animations

### Global Animation Settings

```javascript
option = {
  animation: true,
  animationThreshold: 2000,        // Disable if > this many elements
  animationDuration: 1000,
  animationEasing: 'cubicOut',
  animationDelay: 0,
  
  // Update animations
  animationDurationUpdate: 300,
  animationEasingUpdate: 'cubicInOut',
  animationDelayUpdate: 0
};
```

### Easing Functions

`'linear'`, `'quadraticIn'`, `'quadraticOut'`, `'quadraticInOut'`, `'cubicIn'`, `'cubicOut'`, `'cubicInOut'`, `'quarticIn'`, `'quarticOut'`, `'quarticInOut'`, `'quinticIn'`, `'quinticOut'`, `'quinticInOut'`, `'sinusoidalIn'`, `'sinusoidalOut'`, `'sinusoidalInOut'`, `'exponentialIn'`, `'exponentialOut'`, `'exponentialInOut'`, `'circularIn'`, `'circularOut'`, `'circularInOut'`, `'elasticIn'`, `'elasticOut'`, `'elasticInOut'`, `'backIn'`, `'backOut'`, `'backInOut'`, `'bounceIn'`, `'bounceOut'`, `'bounceInOut'`

### Staggered Animations

```javascript
option = {
  animationDelay: function(idx) {
    return idx * 100;              // 100ms delay per item
  },
  animationDelayUpdate: function(idx) {
    return idx * 50;
  }
};
```

### Series-level Animation

```javascript
series: [{
  type: 'bar',
  animation: true,
  animationDuration: 2000,
  animationEasing: 'elasticOut',
  animationDelay: function(idx) {
    return idx * 50;
  }
}]
```

### Universal Transition

Morph between chart types (v5.2+):

```javascript
// First render
chart.setOption({
  series: [{
    type: 'bar',
    id: 'main',
    universalTransition: true,
    data: [...]
  }]
});

// Switch to pie - animates morphing
chart.setOption({
  series: [{
    type: 'pie',
    id: 'main',                    // Same ID enables transition
    universalTransition: true,
    data: [...]
  }]
});
```

---

## Responsive Design

### Container-based

```javascript
// Responsive initialization
const chart = echarts.init(container);

// Handle resize
window.addEventListener('resize', () => {
  chart.resize();
});

// OR with ResizeObserver (recommended)
const observer = new ResizeObserver(() => chart.resize());
observer.observe(container);
```

### Media Query in Option

```javascript
option = {
  baseOption: {
    // Default configuration
    title: { text: 'Chart' },
    grid: { left: '10%', right: '10%' },
    series: [...]
  },
  media: [
    {
      query: { maxWidth: 500 },    // When container width <= 500px
      option: {
        grid: { left: 50, right: 50 },
        legend: { orient: 'horizontal', top: 'bottom' }
      }
    },
    {
      query: { minWidth: 501, maxWidth: 800 },
      option: {
        grid: { left: '8%', right: '8%' }
      }
    },
    {
      query: { minWidth: 801 },
      option: {
        grid: { left: '10%', right: '10%' }
      }
    }
  ]
};
```

### Media Query Properties

- `minWidth`, `maxWidth`
- `minHeight`, `maxHeight`
- `minAspectRatio`, `maxAspectRatio`

### Adaptive Font Size

```javascript
const fontSize = Math.max(12, container.offsetWidth / 50);

option = {
  title: {
    textStyle: { fontSize: fontSize * 1.5 }
  },
  xAxis: {
    axisLabel: { fontSize: fontSize }
  }
};
```
