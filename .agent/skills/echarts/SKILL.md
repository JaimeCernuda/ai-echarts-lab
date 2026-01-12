---
name: apache-echarts
description: >
  Generate Apache ECharts visualizations with proper configuration objects.
  Use when: (1) User requests charts, graphs, or data visualizations,
  (2) Keywords like 'visualize', 'chart', 'graph', 'plot', 'dashboard', 'echarts',
  (3) Requests for line, bar, pie, scatter, radar, heatmap, treemap, sankey, gauge, or any chart type,
  (4) Time-series visualization, statistical charts, hierarchical data visualization,
  (5) Interactive dashboards or real-time data displays,
  (6) 3D visualizations or geographic/map charts.
  Outputs valid ECharts option objects for React (.jsx), HTML, or Node.js contexts.
---

# Apache ECharts Skill

Generate Apache ECharts configurations for data visualization. ECharts is a declarative library where charts are defined through an `option` configuration object passed to `chart.setOption()`.

## Quick Start

Minimum viable chart:
```javascript
const option = {
  xAxis: { type: 'category', data: ['A', 'B', 'C'] },
  yAxis: { type: 'value' },
  series: [{ type: 'bar', data: [10, 20, 30] }]
};
```

## Workflow

1. **Analyze data structure** → Determine dimensions, categories, values, hierarchies
2. **Select chart type** → Use selection guide below
3. **Choose data strategy** → Direct `series.data` vs `dataset` component
4. **Add components** → Tooltip, legend, axes, dataZoom as needed
5. **Apply styling** → Colors, emphasis states, responsive sizing
6. **Validate output** → Ensure valid JSON/JS object structure

## Chart Type Selection

| Data Pattern | Recommended Type | Reference |
|--------------|------------------|-----------|
| Categories + values | `bar`, `line` | [chart-types.md](references/chart-types.md#basic-charts) |
| Parts of whole | `pie`, `sunburst`, `treemap` | [chart-types.md](references/chart-types.md#part-to-whole) |
| X-Y relationships | `scatter`, `heatmap` | [chart-types.md](references/chart-types.md#correlation) |
| Time series | `line` with `xAxis.type: 'time'` | [chart-types.md](references/chart-types.md#time-series) |
| Hierarchical | `tree`, `treemap`, `sunburst` | [chart-types.md](references/chart-types.md#hierarchical) |
| Flow/relationships | `sankey`, `graph` | [chart-types.md](references/chart-types.md#relational) |
| Multi-dimensional | `radar`, `parallel` | [chart-types.md](references/chart-types.md#multi-dimensional) |
| Statistical | `boxplot`, `candlestick` | [chart-types.md](references/chart-types.md#statistical) |
| KPI/metrics | `gauge`, `funnel` | [chart-types.md](references/chart-types.md#kpi) |
| Geographic | `map`, `geo` + scatter | [advanced.md](references/advanced.md#maps) |
| 3D visualization | `bar3D`, `scatter3D`, `surface` | [advanced.md](references/advanced.md#3d-charts) |

## Option Object Structure

```javascript
const option = {
  // Global settings
  color: ['#5470c6', '#91cc75', '#fac858'],  // Palette
  backgroundColor: '#fff',
  
  // Components (Object or Array for multiples)
  title: { text: 'Chart Title', left: 'center' },
  tooltip: { trigger: 'axis' },
  legend: { data: ['Series A', 'Series B'] },
  grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
  xAxis: { type: 'category', data: [...] },
  yAxis: { type: 'value' },
  dataZoom: [{ type: 'slider' }],
  
  // Data (REQUIRED)
  series: [{ type: 'line', name: 'Series A', data: [...] }]
};
```

See [components.md](references/components.md) for detailed component configuration.

## Data Strategies

### Direct Series Data (Simple)
```javascript
series: [{
  type: 'bar',
  data: [120, 200, 150, 80, 70]  // Values only
}]
// OR with names:
series: [{
  type: 'pie',
  data: [
    { value: 40, name: 'Category A' },
    { value: 38, name: 'Category B' }
  ]
}]
```

### Dataset Component (Reusable, Multiple Series)
```javascript
dataset: {
  dimensions: ['product', '2015', '2016', '2017'],
  source: [
    { product: 'Matcha', '2015': 43, '2016': 85, '2017': 93 },
    { product: 'Milk Tea', '2015': 83, '2016': 73, '2017': 55 }
  ]
},
xAxis: { type: 'category' },
yAxis: {},
series: [
  { type: 'bar', encode: { x: 'product', y: '2015' } },
  { type: 'bar', encode: { x: 'product', y: '2016' } }
]
```

**Dataset-compatible**: line, bar, pie, scatter, effectScatter, parallel, candlestick, funnel, custom
**Requires series.data**: tree, treemap, sunburst, graph, sankey (hierarchical/relational structures)

## Output Contexts

### React Artifact (.jsx)
```jsx
import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

export default function Chart() {
  const chartRef = useRef(null);
  
  useEffect(() => {
    const chart = echarts.init(chartRef.current);
    chart.setOption({/* option */});
    const handleResize = () => chart.resize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      chart.dispose();  // CRITICAL: prevent memory leaks
    };
  }, []);
  
  return <div ref={chartRef} style={{ width: '100%', height: '400px' }} />;
}
```

### HTML Artifact
```html
<!DOCTYPE html>
<html>
<head>
  <script src="https://cdn.jsdelivr.net/npm/echarts@5/dist/echarts.min.js"></script>
</head>
<body>
  <div id="chart" style="width: 100%; height: 400px;"></div>
  <script>
    const chart = echarts.init(document.getElementById('chart'));
    chart.setOption({/* option */});
    window.addEventListener('resize', () => chart.resize());
  </script>
</body>
</html>
```

## Essential Patterns

### Responsive Container
Container MUST have explicit dimensions before `echarts.init()`:
```javascript
// Good: explicit dimensions
<div style={{ width: '100%', height: '400px' }} />

// Good: CSS class with defined height
<div className="chart-container" />  // .chart-container { height: 400px; }

// Bad: no height defined (chart won't render)
<div style={{ width: '100%' }} />
```

### Interactive Features
```javascript
tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
legend: { type: 'scroll', selectedMode: 'multiple' },
dataZoom: [
  { type: 'inside', xAxisIndex: 0 },  // Mouse wheel/pinch zoom
  { type: 'slider', xAxisIndex: 0 }   // Slider control
],
toolbox: {
  feature: {
    saveAsImage: {},
    dataZoom: {},
    restore: {}
  }
}
```

### Emphasis (Hover) States
```javascript
series: [{
  type: 'bar',
  emphasis: {
    focus: 'series',  // Dim other series on hover
    itemStyle: { color: '#ff0000' }
  },
  data: [...]
}]
```

## Reference Documentation

| File | Contents |
|------|----------|
| [chart-types.md](references/chart-types.md) | All 30+ chart types with configurations and data formats |
| [components.md](references/components.md) | Tooltip, legend, axes, grid, dataZoom, visualMap, toolbox |
| [events-api.md](references/events-api.md) | Event handling, dispatchAction, instance methods, setOption modes |
| [styling.md](references/styling.md) | Colors, themes, itemStyle, labels, rich text, animations |
| [advanced.md](references/advanced.md) | 3D/GL charts, maps, large data optimization, custom series |

## Common Mistakes to Avoid

1. **No container height** → Chart renders as 0px; always set explicit height
2. **Missing dispose()** → Memory leaks in SPAs; always call in cleanup
3. **Wrong data format for chart type** → Pie needs `{value, name}`, not just values
4. **Using dataset with hierarchical charts** → Tree/treemap/sankey require `series.data`
5. **Forgetting axis type** → Category axis needs `data` array; value/time axes don't
6. **Tooltip trigger mismatch** → Use `trigger: 'item'` for pie/scatter, `trigger: 'axis'` for line/bar

## Validation Checklist

Before outputting configuration:
- [ ] `series` array exists and has at least one item with `type`
- [ ] Container has explicit width AND height
- [ ] Category axes have `data` array defined
- [ ] Pie/funnel/gauge use `{value, name}` data format
- [ ] Hierarchical charts use nested `{name, children}` structure
- [ ] Legend `data` matches series `name` values (or omit for auto)
- [ ] Colors are valid hex, rgb(), or named colors
