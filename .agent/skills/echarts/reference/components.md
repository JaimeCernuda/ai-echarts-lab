# Components Reference

Configuration reference for ECharts auxiliary components.

## Table of Contents
- [Tooltip](#tooltip)
- [Legend](#legend)
- [Axis](#axis)
- [Grid](#grid)
- [DataZoom](#datazoom)
- [VisualMap](#visualmap)
- [Toolbox](#toolbox)
- [Title](#title)
- [Graphic](#graphic)

---

## Tooltip

Shows information on hover/click.

```javascript
tooltip: {
  // Trigger
  trigger: 'axis',                 // 'item' | 'axis' | 'none'
  triggerOn: 'mousemove|click',    // 'mousemove' | 'click' | 'mousemove|click' | 'none'
  
  // Axis pointer (for trigger: 'axis')
  axisPointer: {
    type: 'cross',                 // 'line' | 'shadow' | 'cross' | 'none'
    axis: 'auto',                  // 'x' | 'y' | 'auto'
    snap: true,                    // Snap to data point
    crossStyle: { color: '#999' },
    lineStyle: { type: 'dashed' },
    shadowStyle: { color: 'rgba(150,150,150,0.3)' }
  },
  
  // Formatting
  formatter: '{b}: {c}',           // Template string
  // OR function:
  formatter: function(params) {
    // params.seriesName, params.name, params.value, params.color, params.percent
    return `${params.name}: <b>${params.value}</b>`;
  },
  // Value formatter (v5.3+)
  valueFormatter: (value) => '$' + value.toFixed(2),
  
  // Positioning
  position: 'top',                 // 'top'|'left'|'right'|'bottom'|'inside' or [x, y] or function
  confine: true,                   // Keep within container
  enterable: true,                 // Mouse can enter tooltip
  
  // Styling
  backgroundColor: 'rgba(50,50,50,0.7)',
  borderColor: '#333',
  borderWidth: 1,
  padding: [5, 10],
  textStyle: { color: '#fff' },
  extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);'
}
```

**Trigger by chart type**:
- `'item'`: pie, scatter, graph, funnel, gauge
- `'axis'`: line, bar, candlestick, boxplot

**Formatter placeholders**:
- `{a}` - series name
- `{b}` - data name / category
- `{c}` - value
- `{d}` - percentage (pie only)

---

## Legend

Controls series visibility.

```javascript
legend: {
  // Type
  type: 'scroll',                  // 'plain' | 'scroll' (for many items)
  
  // Data (optional - auto from series.name if omitted)
  data: ['Series A', 'Series B'],
  // OR with icons:
  data: [
    { name: 'Series A', icon: 'circle' },
    { name: 'Series B', icon: 'rect' }
  ],
  
  // Position
  left: 'center',                  // 'left'|'center'|'right' or pixel/percent
  top: 'top',                      // 'top'|'middle'|'bottom' or pixel/percent
  orient: 'horizontal',            // 'horizontal' | 'vertical'
  
  // Selection
  selectedMode: 'multiple',        // 'single' | 'multiple' | 'series' | false
  selected: { 'Series A': true, 'Series B': false },  // Initial state
  
  // Formatting
  formatter: '{name}',             // or function(name) => string
  
  // Styling
  itemWidth: 25,
  itemHeight: 14,
  itemGap: 10,
  textStyle: { color: '#333' },
  inactiveColor: '#ccc',
  
  // Icon options
  icon: 'circle',                  // 'circle'|'rect'|'roundRect'|'triangle'|'diamond'|'pin'|'arrow'|'none' or 'path://...'
  
  // Scroll (type: 'scroll')
  pageButtonPosition: 'end',       // 'start' | 'end'
  pageButtonItemGap: 5,
  pageIconColor: '#2f4554',
  pageIconInactiveColor: '#aaa',
  pageTextStyle: { color: '#333' }
}
```

---

## Axis

### Category Axis
```javascript
xAxis: {
  type: 'category',
  data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  
  // Boundaries
  boundaryGap: true,               // Space at edges (true for bar, false for line)
  
  // Label
  axisLabel: {
    show: true,
    rotate: 45,                    // Rotation angle
    interval: 'auto',              // 0 = show all, 'auto', or number
    formatter: '{value} Day',      // or function(value, index) => string
    margin: 8,
    align: 'center',
    fontSize: 12
  },
  
  // Line
  axisLine: {
    show: true,
    lineStyle: { color: '#333', width: 1, type: 'solid' }
  },
  
  // Tick marks
  axisTick: {
    show: true,
    alignWithLabel: true,
    inside: false,
    length: 5
  },
  
  // Split lines
  splitLine: {
    show: false,                   // Usually hidden for category axis
    lineStyle: { type: 'dashed' }
  },
  
  // Split areas (alternating bands)
  splitArea: { show: false }
}
```

### Value Axis
```javascript
yAxis: {
  type: 'value',
  
  // Range
  min: 0,                          // 'dataMin' or number or function
  max: 'dataMax',                  // 'dataMax' or number or function
  scale: false,                    // Start from 0 (false) or data min (true)
  
  // Splitting
  splitNumber: 5,
  minInterval: 1,                  // Minimum interval (useful for integers)
  maxInterval: 100,
  interval: 20,                    // Force exact interval
  
  // Label
  axisLabel: {
    formatter: '{value} kg',       // or function
    formatter: function(value) {
      return value >= 1000 ? (value/1000) + 'k' : value;
    }
  },
  
  // Position for multiple axes
  position: 'left',                // 'left' | 'right' (yAxis) or 'top' | 'bottom' (xAxis)
  offset: 0,                       // Offset from default position
  
  // Grid alignment
  alignTicks: true                 // Align ticks of multiple axes
}
```

### Time Axis
```javascript
xAxis: {
  type: 'time',
  min: '2020-01-01',
  max: '2020-12-31',
  axisLabel: {
    formatter: '{yyyy}-{MM}-{dd}'
  }
}
```

### Log Axis
```javascript
yAxis: {
  type: 'log',
  logBase: 10,                     // Base of logarithm
  min: 1                           // Must be > 0
}
```

### Multiple Axes
```javascript
yAxis: [
  { type: 'value', position: 'left', name: 'Precipitation' },
  { type: 'value', position: 'right', name: 'Temperature', alignTicks: true }
],
series: [
  { type: 'bar', yAxisIndex: 0, data: [...] },
  { type: 'line', yAxisIndex: 1, data: [...] }
]
```

---

## Grid

Defines the drawing area for Cartesian charts.

```javascript
grid: {
  // Sizing
  left: '10%',                     // Pixel or percentage
  right: '10%',
  top: 60,
  bottom: 60,
  width: 'auto',
  height: 'auto',
  
  // Include axis labels in sizing
  containLabel: true,              // IMPORTANT: usually set to true
  
  // Styling
  show: false,                     // Show border
  borderColor: '#ccc',
  borderWidth: 1,
  backgroundColor: 'transparent',
  shadowBlur: 0,
  shadowColor: 'rgba(0,0,0,0)'
}
```

**Multiple Grids** (for dashboard layouts):
```javascript
grid: [
  { left: '7%', right: '53%', top: '10%', bottom: '55%' },
  { left: '57%', right: '7%', top: '10%', bottom: '55%' }
],
xAxis: [
  { gridIndex: 0, type: 'category', data: [...] },
  { gridIndex: 1, type: 'category', data: [...] }
],
yAxis: [
  { gridIndex: 0, type: 'value' },
  { gridIndex: 1, type: 'value' }
]
```

---

## DataZoom

Enables zoom and pan on data.

```javascript
dataZoom: [
  // Slider (external control)
  {
    type: 'slider',
    xAxisIndex: 0,                 // or [0, 1] for multiple axes
    start: 0,                      // Percentage (0-100)
    end: 100,
    // Position
    left: '10%',
    right: '10%',
    bottom: 0,
    height: 20,
    // Appearance
    show: true,
    backgroundColor: 'rgba(47,69,84,0)',
    fillerColor: 'rgba(47,69,84,0.25)',
    borderColor: '#ddd',
    handleIcon: 'path://M-9.5,0a9.5,9.5,0,1,0,19,0',
    handleSize: '80%',
    handleStyle: { color: '#fff', shadowBlur: 3 },
    // Data window
    startValue: '2020-01-01',      // Use instead of start/end for time axis
    endValue: '2020-06-01',
    minSpan: 10,                   // Minimum zoom (percent)
    maxSpan: 100,
    // Text
    showDetail: true,
    showDataShadow: true
  },
  // Inside (mouse wheel/touch)
  {
    type: 'inside',
    xAxisIndex: 0,
    start: 0,
    end: 100,
    zoomOnMouseWheel: true,        // Enable wheel zoom
    moveOnMouseMove: true,         // Enable drag pan
    moveOnMouseWheel: false,       // Scroll to pan
    preventDefaultMouseMove: true
  }
]
```

---

## VisualMap

Maps data values to visual properties (color, size).

### Continuous
```javascript
visualMap: {
  type: 'continuous',
  min: 0,
  max: 100,
  
  // Target
  dimension: 2,                    // Data dimension to map (or 'x', 'y')
  seriesIndex: 0,                  // or [0, 1] or 'all'
  
  // Visual output
  inRange: {
    color: ['#50a3ba', '#eac736', '#d94e5d'],
    symbolSize: [10, 50]
  },
  outOfRange: {
    color: '#999',
    symbolSize: 5
  },
  
  // UI
  show: true,
  calculable: true,                // Draggable handles
  orient: 'vertical',              // 'horizontal' | 'vertical'
  left: 'right',
  top: 'center',
  itemWidth: 20,
  itemHeight: 140,
  text: ['High', 'Low'],
  textStyle: { color: '#333' },
  
  // Range
  range: [20, 80],                 // Initial selected range
  realtime: true                   // Update chart while dragging
}
```

### Piecewise
```javascript
visualMap: {
  type: 'piecewise',
  
  // Categories
  categories: ['Low', 'Medium', 'High'],
  // OR splits:
  splitNumber: 5,
  // OR custom pieces:
  pieces: [
    { min: 0, max: 50, label: 'Low', color: 'green' },
    { min: 50, max: 80, label: 'Medium', color: 'yellow' },
    { min: 80, label: 'High', color: 'red' }
  ],
  
  // Selection
  selectedMode: 'multiple',        // 'multiple' | 'single' | false
  selected: { 'Low': true, 'High': false }
}
```

---

## Toolbox

Built-in tool buttons.

```javascript
toolbox: {
  show: true,
  orient: 'horizontal',            // 'horizontal' | 'vertical'
  left: 'right',
  top: 'top',
  
  feature: {
    // Save as image
    saveAsImage: {
      type: 'png',                 // 'png' | 'jpeg' | 'svg'
      name: 'chart',
      backgroundColor: '#fff',
      pixelRatio: 2,
      title: 'Save'
    },
    
    // Restore to original
    restore: { title: 'Restore' },
    
    // Data view
    dataView: {
      show: true,
      readOnly: false,             // Allow editing
      title: 'Data',
      lang: ['Data View', 'Close', 'Refresh']
    },
    
    // Zoom controls
    dataZoom: {
      yAxisIndex: 'none',          // Only zoom x-axis
      title: { zoom: 'Zoom', back: 'Reset Zoom' }
    },
    
    // Magic type switch
    magicType: {
      type: ['line', 'bar', 'stack'],
      title: { line: 'Line', bar: 'Bar', stack: 'Stack' }
    },
    
    // Brush selection
    brush: {
      type: ['rect', 'polygon', 'lineX', 'lineY', 'keep', 'clear'],
      title: { rect: 'Rectangle', polygon: 'Polygon', lineX: 'X Line', lineY: 'Y Line', keep: 'Keep', clear: 'Clear' }
    }
  },
  
  // Icons
  iconStyle: {
    borderColor: '#666',
    borderWidth: 1
  },
  emphasis: {
    iconStyle: { borderColor: '#3E98C5' }
  }
}
```

---

## Title

```javascript
title: {
  show: true,
  text: 'Main Title',
  subtext: 'Subtitle here',
  
  // Position
  left: 'center',                  // 'left' | 'center' | 'right' | number | '%'
  top: 'top',                      // 'top' | 'middle' | 'bottom' | number | '%'
  
  // Styling
  textStyle: {
    color: '#333',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
    fontSize: 18,
    lineHeight: 24
  },
  subtextStyle: {
    color: '#aaa',
    fontSize: 12
  },
  
  // Alignment
  textAlign: 'auto',               // 'auto' | 'left' | 'center' | 'right'
  textVerticalAlign: 'auto',
  
  // Link
  link: 'https://example.com',
  target: 'blank',                 // 'self' | 'blank'
  
  // Background
  backgroundColor: 'transparent',
  borderColor: '#ccc',
  borderWidth: 0,
  padding: 5
}
```

---

## Graphic

Draw custom shapes and text overlays.

```javascript
graphic: {
  elements: [
    // Text overlay
    {
      type: 'text',
      left: 'center',
      top: 'middle',
      style: {
        text: 'Watermark',
        fontSize: 80,
        fontWeight: 'bold',
        fill: 'rgba(0,0,0,0.1)'
      }
    },
    // Rectangle
    {
      type: 'rect',
      left: 100,
      top: 100,
      shape: { width: 200, height: 100 },
      style: {
        fill: 'rgba(0,140,255,0.2)',
        stroke: 'rgba(0,0,0,0.3)'
      }
    },
    // Circle
    {
      type: 'circle',
      position: [200, 200],
      shape: { cx: 0, cy: 0, r: 50 },
      style: { fill: 'red' }
    },
    // Image
    {
      type: 'image',
      left: 10,
      top: 10,
      style: {
        image: 'https://example.com/logo.png',
        width: 100,
        height: 50
      }
    }
  ]
}
```

Available element types: `group`, `image`, `text`, `rect`, `circle`, `ring`, `sector`, `arc`, `polygon`, `polyline`, `line`, `bezierCurve`
