# Advanced Features Reference

3D charts, maps, large data optimization, and custom rendering.

## Table of Contents
- [3D Charts (ECharts-GL)](#3d-charts)
- [Map Visualizations](#maps)
- [Large Data Optimization](#large-data)
- [Custom Series](#custom-series)
- [Dataset Transforms](#dataset-transforms)
- [Extensions](#extensions)

---

## 3D Charts

Requires `echarts-gl` extension:
```html
<script src="https://cdn.jsdelivr.net/npm/echarts-gl@2/dist/echarts-gl.min.js"></script>
```

### 3D Coordinate System

```javascript
option = {
  grid3D: {
    viewControl: {
      projection: 'perspective',   // 'perspective' | 'orthographic'
      autoRotate: false,
      autoRotateSpeed: 10,
      distance: 200,               // Camera distance
      alpha: 20,                   // Vertical rotation angle
      beta: 40,                    // Horizontal rotation angle
      minAlpha: -90,
      maxAlpha: 90,
      minBeta: -Infinity,
      maxBeta: Infinity,
      rotateSensitivity: 1,
      zoomSensitivity: 1,
      panSensitivity: 1
    },
    
    // Lighting
    light: {
      main: {
        color: '#fff',
        intensity: 1,
        shadow: true,
        shadowQuality: 'medium',   // 'low' | 'medium' | 'high' | 'ultra'
        alpha: 40,
        beta: 40
      },
      ambient: {
        color: '#fff',
        intensity: 0.2
      }
    },
    
    // Post effects
    postEffect: {
      enable: true,
      bloom: { enable: false },
      depthOfField: { enable: false },
      SSAO: {
        enable: true,
        quality: 'medium',
        radius: 2
      },
      colorCorrection: {
        enable: true,
        exposure: 0,
        brightness: 0,
        contrast: 1,
        saturation: 1
      }
    },
    
    // Environment
    environment: 'auto',           // 'auto' | 'none' | texture URL
    
    // Axes
    boxWidth: 100,
    boxHeight: 100,
    boxDepth: 100
  },
  
  xAxis3D: { type: 'category', data: [...] },
  yAxis3D: { type: 'category', data: [...] },
  zAxis3D: { type: 'value' }
};
```

### Bar3D

```javascript
series: [{
  type: 'bar3D',
  coordinateSystem: 'cartesian3D',
  
  // Data format: [[x, y, z], ...]
  data: [
    [0, 0, 5],
    [0, 1, 3],
    [1, 0, 8],
    [1, 1, 2]
  ],
  
  // Styling
  bevelSize: 0.1,
  bevelSmoothness: 2,
  shading: 'realistic',            // 'color' | 'lambert' | 'realistic'
  
  itemStyle: {
    color: '#5470c6',
    opacity: 1
  },
  
  // Labels
  label: {
    show: false,
    formatter: '{c}'
  },
  
  // Emphasis
  emphasis: {
    itemStyle: { color: '#ff0000' },
    label: { show: true }
  }
}]
```

### Scatter3D

```javascript
series: [{
  type: 'scatter3D',
  coordinateSystem: 'cartesian3D',
  
  // Data: [[x, y, z], ...] or [[x, y, z, size], ...]
  data: [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
  
  symbol: 'circle',
  symbolSize: 10,
  // OR dynamic:
  symbolSize: function(data) {
    return Math.sqrt(data[3]) * 5;
  },
  
  itemStyle: {
    color: '#5470c6',
    opacity: 0.8
  }
}]
```

### Surface

```javascript
series: [{
  type: 'surface',
  
  // Parametric equation
  parametric: true,
  parametricEquation: {
    u: { min: 0, max: Math.PI, step: Math.PI / 20 },
    v: { min: 0, max: 2 * Math.PI, step: Math.PI / 20 },
    x: function(u, v) { return Math.sin(u) * Math.cos(v); },
    y: function(u, v) { return Math.sin(u) * Math.sin(v); },
    z: function(u, v) { return Math.cos(u); }
  },
  
  // OR grid data
  data: [
    // Row 0
    [[0, 0, 1], [1, 0, 2], [2, 0, 3]],
    // Row 1
    [[0, 1, 2], [1, 1, 4], [2, 1, 1]]
  ],
  
  shading: 'realistic',
  wireframe: { show: true }
}]
```

### Globe

```javascript
option = {
  globe: {
    baseTexture: '/earth.jpg',     // Day texture
    heightTexture: '/earth-height.png',
    displacementScale: 0.05,
    
    shading: 'realistic',
    realisticMaterial: {
      roughness: 0.8,
      metalness: 0
    },
    
    light: {
      main: { intensity: 1.5 },
      ambient: { intensity: 0.3 }
    },
    
    viewControl: {
      autoRotate: true,
      autoRotateSpeed: 3
    }
  },
  
  series: [{
    type: 'scatter3D',
    coordinateSystem: 'globe',
    data: [
      { name: 'NYC', value: [-74.0, 40.7, 100] }  // [lng, lat, value]
    ]
  }]
};
```

---

## Maps

### Register Map Data

```javascript
// Register GeoJSON
echarts.registerMap('USA', usaGeoJson);

// Register with special areas
echarts.registerMap('USA', usaGeoJson, {
  Alaska: {
    left: -131,
    top: 25,
    width: 15
  },
  Hawaii: {
    left: -110,
    top: 28,
    width: 5
  }
});
```

### Geo Component (Background Map)

```javascript
option = {
  geo: {
    map: 'USA',
    roam: true,                    // Enable pan/zoom
    
    // Projection
    projection: {
      project: (point) => [point[0] / 180 * Math.PI, ...],
      unproject: (point) => [point[0] * 180 / Math.PI, ...]
    },
    
    // Bounds
    center: [-100, 40],            // [lng, lat]
    zoom: 1,
    
    // Styling
    itemStyle: {
      areaColor: '#e0e0e0',
      borderColor: '#111'
    },
    emphasis: {
      itemStyle: { areaColor: '#ffd700' },
      label: { show: true }
    },
    
    // Region-specific styling
    regions: [{
      name: 'California',
      itemStyle: { areaColor: 'red' }
    }]
  }
};
```

### Map Series (Choropleth)

```javascript
series: [{
  type: 'map',
  map: 'USA',
  
  // Data by region name
  data: [
    { name: 'California', value: 1000 },
    { name: 'Texas', value: 800 },
    { name: 'New York', value: 1200 }
  ],
  
  // Labels
  label: {
    show: true,
    formatter: '{b}'
  },
  
  // Use visualMap for color
  // (add visualMap component)
}],

visualMap: {
  min: 0,
  max: 1500,
  calculable: true,
  inRange: { color: ['#e0f3f8', '#abd9e9', '#74add1', '#4575b4', '#313695'] }
}
```

### Scatter on Map

```javascript
option = {
  geo: { map: 'USA', roam: true },
  
  series: [{
    type: 'scatter',
    coordinateSystem: 'geo',
    
    // Data: [[lng, lat, value], ...]
    data: [
      { name: 'NYC', value: [-74.0, 40.7, 100] },
      { name: 'LA', value: [-118.2, 34.0, 80] }
    ],
    
    symbolSize: function(val) {
      return val[2] / 10;
    },
    
    encode: { value: 2 }
  }]
};
```

### Lines on Map (Flows)

```javascript
series: [{
  type: 'lines',
  coordinateSystem: 'geo',
  
  data: [{
    coords: [
      [-122.4, 37.8],              // Start: San Francisco
      [-74.0, 40.7]                // End: New York
    ],
    value: 100
  }],
  
  // Effect (animated line)
  effect: {
    show: true,
    period: 6,
    trailLength: 0.7,
    symbol: 'arrow',
    symbolSize: 6
  },
  
  lineStyle: {
    color: '#5470c6',
    width: 1,
    curveness: 0.2,
    opacity: 0.6
  }
}]
```

---

## Large Data

### Large Mode

```javascript
series: [{
  type: 'scatter',
  
  // Enable large mode
  large: true,
  largeThreshold: 2000,           // Auto-enable when > this
  
  data: massiveDataArray          // Tens of thousands of points
}]
```

### Progressive Rendering

```javascript
series: [{
  type: 'scatter',
  
  progressive: 400,               // Render this many per frame
  progressiveThreshold: 3000,     // Enable when > this
  progressiveChunkMode: 'mod',    // 'sequential' | 'mod'
  
  data: largeDataset
}]
```

### Sampling for Line Charts

```javascript
series: [{
  type: 'line',
  
  // Sampling strategies
  sampling: 'lttb',               // 'lttb' | 'average' | 'max' | 'min' | 'sum'
  // lttb = Largest-Triangle-Three-Buckets (best for visual)
  
  data: denseTimeSeriesData
}]
```

### Disable Animations

```javascript
option = {
  animation: false,               // Disable all
  
  // OR use threshold
  animationThreshold: 2000,       // Auto-disable if > 2000 elements
  
  series: [{
    animation: false              // Per-series disable
  }]
};
```

### Append Data (Streaming)

```javascript
// Initial render
chart.setOption({ series: [{ type: 'line', data: initialData }] });

// Append new data without re-render
chart.appendData({
  seriesIndex: 0,
  data: newDataChunk              // Appended to end
});
```

### Performance Tips

1. Use `large: true` for scatter/line with >2000 points
2. Use `sampling: 'lttb'` for dense time series
3. Disable animations for very large datasets
4. Use Canvas renderer (default) over SVG for large data
5. Use `appendData()` for streaming instead of `setOption()`
6. Limit tooltip calculations with `axisPointer.snap: false`
7. Use `progressive` rendering for 10k+ points

---

## Custom Series

Create completely custom visualizations.

### Basic Structure

```javascript
series: [{
  type: 'custom',
  coordinateSystem: 'cartesian2d',
  
  renderItem: function(params, api) {
    // Read data
    const xValue = api.value(0);
    const yValue = api.value(1);
    
    // Convert to pixel coordinates
    const point = api.coord([xValue, yValue]);
    
    // Return graphic element
    return {
      type: 'circle',
      shape: {
        cx: point[0],
        cy: point[1],
        r: 10
      },
      style: api.style({
        fill: '#5470c6',
        stroke: '#333'
      })
    };
  },
  
  data: [[10, 20], [30, 40], [50, 60]]
}]
```

### API Methods

```javascript
renderItem: function(params, api) {
  // params contains:
  // - params.context: Shared object across renderItem calls
  // - params.seriesId, params.seriesName, params.seriesIndex
  // - params.dataIndex, params.dataIndexInside
  // - params.coordSys: { type, x, y, width, height }
  
  // api methods:
  api.value(dim);                  // Get data value at dimension
  api.coord([x, y]);               // Convert data to pixel
  api.size([dx, dy]);              // Get pixel size for data range
  api.style(extra);                // Get series itemStyle + extra
  api.styleEmphasis(extra);        // Get emphasis style
  api.visual('color');             // Get visualMap color
  api.barLayout({ barGap, barWidth, count });  // For bar-like layouts
  api.currentSeriesIndices();      // Indices of visible series
  api.font(textStyle);             // Get CSS font string
  api.getWidth();
  api.getHeight();
}
```

### Graphic Elements

```javascript
// Rectangle
{ type: 'rect', shape: { x, y, width, height, r }, style: {...} }

// Circle
{ type: 'circle', shape: { cx, cy, r }, style: {...} }

// Sector (pie slice)
{ type: 'sector', shape: { cx, cy, r, r0, startAngle, endAngle }, style: {...} }

// Polygon
{ type: 'polygon', shape: { points: [[x1,y1], [x2,y2], ...] }, style: {...} }

// Polyline
{ type: 'polyline', shape: { points: [...] }, style: {...} }

// Line
{ type: 'line', shape: { x1, y1, x2, y2 }, style: {...} }

// Bezier curve
{ type: 'bezierCurve', shape: { x1, y1, x2, y2, cpx1, cpy1, cpx2, cpy2 }, style: {...} }

// Arc
{ type: 'arc', shape: { cx, cy, r, startAngle, endAngle }, style: {...} }

// Text
{ type: 'text', style: { x, y, text: 'Hello', fill: '#000', font: '14px sans-serif' } }

// Image
{ type: 'image', style: { image: 'url', x, y, width, height } }

// Group (container)
{ type: 'group', children: [element1, element2, ...] }

// SVG Path
{ type: 'path', shape: { pathData: 'M0,0 L100,100 Z' }, style: {...} }
```

### Example: Gantt Chart

```javascript
series: [{
  type: 'custom',
  renderItem: function(params, api) {
    const categoryIndex = api.value(0);
    const start = api.coord([api.value(1), categoryIndex]);
    const end = api.coord([api.value(2), categoryIndex]);
    const height = api.size([0, 1])[1] * 0.6;
    
    return {
      type: 'rect',
      shape: {
        x: start[0],
        y: start[1] - height / 2,
        width: end[0] - start[0],
        height: height
      },
      style: api.style()
    };
  },
  encode: { x: [1, 2], y: 0 },
  data: [
    [0, '2020-01-01', '2020-03-15'],  // [category, start, end]
    [1, '2020-02-01', '2020-04-20'],
    [2, '2020-03-01', '2020-05-10']
  ]
}]
```

---

## Dataset Transforms

Process and filter data declaratively.

### Filter Transform

```javascript
dataset: [
  {
    source: [
      ['Product', 'Sales', 'Price'],
      ['A', 100, 20],
      ['B', 50, 30],
      ['C', 150, 15]
    ]
  },
  {
    fromDatasetIndex: 0,
    transform: {
      type: 'filter',
      config: { dimension: 'Sales', '>=': 80 }
    }
  }
],
series: [{ type: 'bar', datasetIndex: 1 }]
```

### Filter Operators

- `>`, `>=`, `<`, `<=`, `=`, `!=`
- `reg` (regex): `{ dimension: 'Name', reg: /^A/ }`

### Sort Transform

```javascript
{
  fromDatasetIndex: 0,
  transform: {
    type: 'sort',
    config: { dimension: 'Sales', order: 'desc' }
  }
}

// Multiple sort keys
{
  transform: {
    type: 'sort',
    config: [
      { dimension: 'Category', order: 'asc' },
      { dimension: 'Sales', order: 'desc' }
    ]
  }
}
```

### Chained Transforms

```javascript
{
  fromDatasetIndex: 0,
  transform: [
    { type: 'filter', config: { dimension: 'Sales', '>=': 50 } },
    { type: 'sort', config: { dimension: 'Sales', order: 'desc' } }
  ]
}
```

### External Transform (ecStat)

```javascript
// Register transform
echarts.registerTransform(ecStatTransform.regression);

// Use in dataset
{
  transform: {
    type: 'ecStat:regression',
    config: { method: 'linear' }
  }
}
```

---

## Extensions

### echarts-gl
3D charts, globe, large-scale rendering
```html
<script src="https://cdn.jsdelivr.net/npm/echarts-gl@2/dist/echarts-gl.min.js"></script>
```

### echarts-wordcloud
Word cloud visualization
```html
<script src="https://cdn.jsdelivr.net/npm/echarts-wordcloud@2/dist/echarts-wordcloud.min.js"></script>
```

### echarts-liquidfill
Liquid fill gauge
```html
<script src="https://cdn.jsdelivr.net/npm/echarts-liquidfill@3/dist/echarts-liquidfill.min.js"></script>
```

### ecStat
Statistical transforms and analysis
```html
<script src="https://cdn.jsdelivr.net/npm/echarts-stat@latest/dist/ecStat.min.js"></script>
```

### Usage Pattern

```javascript
// CDN
<script src="https://cdn.jsdelivr.net/npm/echarts@5/dist/echarts.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/echarts-gl@2/dist/echarts-gl.min.js"></script>

// NPM
import * as echarts from 'echarts';
import 'echarts-gl';
```
