# Chart Types Reference

Complete configuration reference for all ECharts chart types.

## Table of Contents
- [Basic Charts](#basic-charts) - line, bar, area
- [Part-to-Whole](#part-to-whole) - pie, doughnut, sunburst, treemap
- [Correlation](#correlation) - scatter, bubble, heatmap
- [Time Series](#time-series) - time axis configuration
- [Hierarchical](#hierarchical) - tree, treemap, sunburst
- [Relational](#relational) - sankey, graph, chord
- [Multi-dimensional](#multi-dimensional) - radar, parallel
- [Statistical](#statistical) - boxplot, candlestick
- [KPI](#kpi) - gauge, funnel

---

## Basic Charts

### Line Chart
```javascript
series: [{
  type: 'line',
  name: 'Series Name',
  data: [150, 230, 224, 218, 135],
  // Line style
  smooth: true,                    // Curved line (false for straight)
  smoothMonotone: 'x',             // Monotone smoothing for time series
  step: 'start',                   // Step line: 'start' | 'middle' | 'end' | false
  connectNulls: false,             // Connect across null values
  // Symbols (data points)
  symbol: 'circle',                // 'circle'|'rect'|'triangle'|'diamond'|'pin'|'arrow'|'none'
  symbolSize: 4,                   // Size or function(value, params) => size
  showSymbol: true,
  showAllSymbol: 'auto',           // Show all or auto-hide dense points
  // Styling
  lineStyle: { width: 2, type: 'solid' },  // 'solid'|'dashed'|'dotted'
  itemStyle: { color: '#5470c6' },
  // Area fill
  areaStyle: { opacity: 0.3 },     // Add this for area chart
  // Stacking
  stack: 'total',                  // Stack with same stack name
  stackStrategy: 'samesign',       // 'samesign'|'all'|'positive'|'negative'
  // Labels
  label: { show: false, position: 'top' }
}]
```

### Bar Chart
```javascript
series: [{
  type: 'bar',
  name: 'Series Name',
  data: [120, 200, 150, 80, 70],
  // Bar sizing
  barWidth: '60%',                 // Pixel or percentage
  barMaxWidth: 50,                 // Maximum width
  barMinWidth: 1,                  // Minimum width
  barMinHeight: 0,                 // Minimum height (for small values)
  barGap: '30%',                   // Gap between bars of different series
  barCategoryGap: '20%',           // Gap between categories
  // Stacking
  stack: 'total',
  // Background
  showBackground: true,
  backgroundStyle: { color: 'rgba(180, 180, 180, 0.2)' },
  // Styling
  itemStyle: {
    color: '#5470c6',
    borderRadius: [5, 5, 0, 0]     // Rounded corners [topLeft, topRight, bottomRight, bottomLeft]
  },
  // Labels
  label: { show: true, position: 'top' }  // 'top'|'inside'|'insideTop'|'insideBottom'
}]
```

**Horizontal Bar**: Swap xAxis and yAxis types:
```javascript
xAxis: { type: 'value' },
yAxis: { type: 'category', data: ['A', 'B', 'C'] }
```

---

## Part-to-Whole

### Pie Chart
```javascript
series: [{
  type: 'pie',
  name: 'Category',
  // REQUIRED: data format
  data: [
    { value: 1048, name: 'Search Engine' },
    { value: 735, name: 'Direct' },
    { value: 580, name: 'Email', itemStyle: { color: '#91cc75' } }
  ],
  // Sizing and position
  radius: '50%',                   // Single value for pie
  radius: ['40%', '70%'],          // [inner, outer] for doughnut
  center: ['50%', '50%'],          // Position [x, y]
  // Rose (Nightingale) chart
  roseType: 'radius',              // 'radius' | 'area' | false
  // Angles
  startAngle: 90,
  minAngle: 0,                     // Minimum sector angle
  // Selection
  selectedMode: 'single',          // 'single' | 'multiple' | 'series' | false
  selectedOffset: 10,
  // Labels
  label: {
    show: true,
    position: 'outside',           // 'outside' | 'inside' | 'center'
    formatter: '{b}: {c} ({d}%)'   // {a}=series, {b}=name, {c}=value, {d}=percent
  },
  labelLine: { show: true },
  // Styling
  itemStyle: {
    borderRadius: 10,
    borderColor: '#fff',
    borderWidth: 2
  }
}]
```

### Sunburst Chart
```javascript
series: [{
  type: 'sunburst',
  // REQUIRED: hierarchical data
  data: [{
    name: 'Root',
    children: [
      {
        name: 'Child A',
        value: 10,
        children: [{ name: 'Grandchild', value: 5 }]
      },
      { name: 'Child B', value: 20 }
    ]
  }],
  radius: ['15%', '80%'],
  // Level-specific styling
  levels: [
    {},  // Level 0 (center)
    { r0: '15%', r: '35%', itemStyle: { borderWidth: 2 } },
    { r0: '35%', r: '70%', label: { rotate: 'tangential' } }
  ],
  // Highlight
  highlightPolicy: 'ancestor',     // 'descendant' | 'ancestor' | 'self' | 'none'
  sort: 'desc'                     // null | 'desc' | 'asc' | function
}]
```

---

## Correlation

### Scatter Chart
```javascript
series: [{
  type: 'scatter',
  name: 'Scatter',
  // Data format: [[x, y], [x, y], ...] or [[x, y, size], ...]
  data: [[10.0, 8.04], [8.0, 6.95], [13.0, 7.58]],
  // Symbol
  symbolSize: 10,                  // Fixed size
  symbolSize: function(data) {     // Dynamic size (for bubble)
    return Math.sqrt(data[2]) * 5;
  },
  // Large dataset optimization
  large: true,
  largeThreshold: 2000,
  // Styling
  itemStyle: {
    color: '#5470c6',
    opacity: 0.8
  }
}]
```

### Heatmap
```javascript
// Requires visualMap for color mapping
visualMap: {
  min: 0,
  max: 10,
  calculable: true,
  orient: 'horizontal',
  left: 'center',
  bottom: '15%',
  inRange: { color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026'] }
},
series: [{
  type: 'heatmap',
  // Data format: [[x, y, value], ...]
  data: [[0, 0, 5], [0, 1, 1], [1, 0, 3]],
  // Label
  label: { show: true },
  // Styling
  itemStyle: {
    borderWidth: 1,
    borderColor: '#fff'
  }
}]
```

**Calendar Heatmap**: Use `coordinateSystem: 'calendar'` with `calendar` component.

---

## Time Series

### Time Axis Configuration
```javascript
xAxis: {
  type: 'time',
  // Axis boundaries
  min: '2020-01-01',               // or timestamp or 'dataMin'
  max: '2020-12-31',               // or timestamp or 'dataMax'
  // Tick formatting
  axisLabel: {
    formatter: '{yyyy}-{MM}-{dd}',
    rotate: 45
  },
  // Splitting
  splitNumber: 5,
  minInterval: 3600 * 1000 * 24,   // 1 day minimum
  maxInterval: 3600 * 1000 * 24 * 30  // 30 days maximum
},
series: [{
  type: 'line',
  // Data with timestamps
  data: [
    ['2020-01-01', 150],
    ['2020-01-02', 230],
    [1577923200000, 224]           // Unix timestamp (ms) also works
  ]
}]
```

**Time formatting tokens**: `{yyyy}`, `{yy}`, `{MM}`, `{M}`, `{dd}`, `{d}`, `{HH}`, `{H}`, `{mm}`, `{m}`, `{ss}`, `{s}`, `{SSS}`

---

## Hierarchical

### Tree Chart
```javascript
series: [{
  type: 'tree',
  // REQUIRED: hierarchical data structure
  data: [{
    name: 'Root',
    children: [
      {
        name: 'Child A',
        children: [
          { name: 'Grandchild 1', value: 10 },
          { name: 'Grandchild 2', value: 20 }
        ]
      },
      { name: 'Child B', value: 30 }
    ]
  }],
  // Layout
  layout: 'orthogonal',            // 'orthogonal' | 'radial'
  orient: 'LR',                    // 'LR' | 'RL' | 'TB' | 'BT' (orthogonal only)
  // Interaction
  expandAndCollapse: true,
  initialTreeDepth: 2,             // Initially expanded depth (-1 for all)
  // Styling
  symbol: 'emptyCircle',
  symbolSize: 7,
  lineStyle: { width: 1, curveness: 0.5 },
  label: { position: 'left', verticalAlign: 'middle' }
}]
```

### Treemap Chart
```javascript
series: [{
  type: 'treemap',
  // REQUIRED: hierarchical data
  data: [{
    name: 'Root',
    children: [
      { name: 'A', value: 10 },
      { name: 'B', value: 20, children: [
        { name: 'B1', value: 8 },
        { name: 'B2', value: 12 }
      ]}
    ]
  }],
  // Drill-down
  leafDepth: 1,                    // Depth of visible leaves
  drillDownIcon: '▶',
  // Levels styling
  levels: [
    { itemStyle: { borderWidth: 3, borderColor: '#333', gapWidth: 3 } },
    { colorSaturation: [0.3, 0.6], itemStyle: { borderColorSaturation: 0.7 } }
  ],
  // Breadcrumb
  breadcrumb: { show: true, left: 'center' }
}]
```

---

## Relational

### Sankey Diagram
```javascript
series: [{
  type: 'sankey',
  layout: 'none',
  // REQUIRED: nodes and links
  data: [
    { name: 'A' },
    { name: 'B' },
    { name: 'C' },
    { name: 'D' }
  ],
  links: [
    { source: 'A', target: 'C', value: 5 },
    { source: 'A', target: 'D', value: 3 },
    { source: 'B', target: 'C', value: 8 },
    { source: 'B', target: 'D', value: 2 }
  ],
  // Layout
  orient: 'horizontal',            // 'horizontal' | 'vertical'
  nodeWidth: 20,
  nodeGap: 8,
  layoutIterations: 32,
  // Styling
  lineStyle: {
    color: 'gradient',             // 'source' | 'target' | 'gradient'
    curveness: 0.5,
    opacity: 0.3
  }
}]
```

### Graph (Network)
```javascript
series: [{
  type: 'graph',
  layout: 'force',                 // 'none' | 'force' | 'circular'
  // Data
  data: [
    { name: 'Node 1', symbolSize: 50, category: 0 },
    { name: 'Node 2', symbolSize: 30, category: 1 }
  ],
  links: [
    { source: 'Node 1', target: 'Node 2', value: 10 }
  ],
  categories: [
    { name: 'Category A' },
    { name: 'Category B' }
  ],
  // Force layout
  force: {
    repulsion: 100,
    gravity: 0.1,
    edgeLength: [50, 200],
    layoutAnimation: true
  },
  // Interactivity
  roam: true,                      // Allow pan/zoom
  draggable: true,
  // Labels
  label: { show: true, position: 'right' },
  edgeLabel: { show: false }
}]
```

---

## Multi-dimensional

### Radar Chart
```javascript
// Requires radar component
radar: {
  indicator: [
    { name: 'Sales', max: 6500 },
    { name: 'Admin', max: 16000 },
    { name: 'IT', max: 30000 },
    { name: 'Support', max: 38000 },
    { name: 'Dev', max: 52000 }
  ],
  shape: 'polygon',                // 'polygon' | 'circle'
  splitNumber: 5,
  center: ['50%', '50%'],
  radius: '65%'
},
series: [{
  type: 'radar',
  // Data format: array of objects with value arrays
  data: [
    { value: [4200, 3000, 20000, 35000, 50000], name: 'Budget' },
    { value: [5000, 14000, 28000, 26000, 42000], name: 'Actual' }
  ],
  // Styling
  areaStyle: { opacity: 0.3 },
  lineStyle: { width: 2 }
}]
```

### Parallel Coordinates
```javascript
parallelAxis: [
  { dim: 0, name: 'Price', type: 'value' },
  { dim: 1, name: 'Brand', type: 'category', data: ['A', 'B', 'C'] },
  { dim: 2, name: 'Rating', type: 'value', min: 0, max: 5 }
],
series: [{
  type: 'parallel',
  lineStyle: { width: 1, opacity: 0.5 },
  // Data: array of arrays matching parallelAxis dimensions
  data: [
    [100, 'A', 4.5],
    [200, 'B', 3.8],
    [150, 'C', 4.2]
  ]
}]
```

---

## Statistical

### Boxplot
```javascript
series: [{
  type: 'boxplot',
  // Data format: [[min, Q1, median, Q3, max], ...]
  data: [
    [655, 850, 940, 980, 1175],
    [672, 800, 845, 885, 1012],
    [780, 840, 855, 880, 940]
  ],
  // Styling
  itemStyle: {
    color: '#b8c5f2',
    borderColor: '#429',
    borderWidth: 2
  },
  // Box width
  boxWidth: ['40%', '80%']         // [min, max] percentage
}]
```

**With outliers**: Add scatter series for outlier points.

### Candlestick
```javascript
series: [{
  type: 'candlestick',
  // Data format: [[open, close, low, high], ...]
  data: [
    [20, 34, 10, 38],
    [40, 35, 30, 50],
    [31, 38, 33, 44]
  ],
  // Colors
  itemStyle: {
    color: '#ec0000',              // Bullish (close > open)
    color0: '#00da3c',             // Bearish (close < open)
    borderColor: '#ec0000',
    borderColor0: '#00da3c'
  }
}]
```

---

## KPI

### Gauge
```javascript
series: [{
  type: 'gauge',
  // Value
  data: [{ value: 52, name: 'Performance' }],
  // Range
  min: 0,
  max: 100,
  // Appearance
  progress: { show: true, width: 18 },
  pointer: { show: true, length: '60%', width: 8 },
  axisLine: { lineStyle: { width: 18 } },
  axisTick: { show: true, splitNumber: 5 },
  splitLine: { length: 15, lineStyle: { width: 2 } },
  axisLabel: { distance: 25, fontSize: 12 },
  // Title and detail
  title: { offsetCenter: [0, '70%'] },
  detail: {
    valueAnimation: true,
    formatter: '{value}%',
    offsetCenter: [0, '40%'],
    fontSize: 30
  }
}]
```

### Funnel
```javascript
series: [{
  type: 'funnel',
  // REQUIRED: data with value and name
  data: [
    { value: 60, name: 'Visit' },
    { value: 40, name: 'Inquiry' },
    { value: 20, name: 'Order' },
    { value: 10, name: 'Paid' }
  ],
  // Orientation
  orient: 'vertical',              // 'vertical' | 'horizontal'
  sort: 'descending',              // 'descending' | 'ascending' | 'none'
  // Sizing
  left: '10%',
  top: 60,
  width: '80%',
  minSize: '0%',
  maxSize: '100%',
  gap: 2,
  // Alignment
  funnelAlign: 'center',           // 'left' | 'center' | 'right'
  // Labels
  label: { show: true, position: 'inside' },
  labelLine: { show: false }
}]
```

---

## Data Format Summary

| Chart Type | Data Format |
|------------|-------------|
| line, bar | `[v1, v2, ...]` or `[[x,y], ...]` |
| pie, funnel | `[{value, name}, ...]` |
| scatter | `[[x, y], ...]` or `[[x, y, size], ...]` |
| heatmap | `[[x, y, value], ...]` |
| radar | `[{value: [v1, v2, ...], name}, ...]` |
| boxplot | `[[min, Q1, median, Q3, max], ...]` |
| candlestick | `[[open, close, low, high], ...]` |
| tree, treemap, sunburst | `{name, value?, children: [...]}` |
| sankey | `{data: [{name}], links: [{source, target, value}]}` |
| graph | `{data: [{name, x?, y?}], links: [{source, target}]}` |
| gauge | `[{value, name}]` |
