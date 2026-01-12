# Events and API Reference

Event handling, programmatic control, and instance methods.

## Table of Contents
- [Initialization](#initialization)
- [Event Handling](#event-handling)
- [Instance Methods](#instance-methods)
- [Actions (dispatchAction)](#actions)
- [setOption Modes](#setoption-modes)

---

## Initialization

```javascript
// Basic initialization
const chart = echarts.init(dom, theme?, opts?);

// Parameters
const chart = echarts.init(
  document.getElementById('main'),
  'dark',                          // Theme: null | 'light' | 'dark' | customThemeName
  {
    renderer: 'canvas',            // 'canvas' | 'svg'
    devicePixelRatio: window.devicePixelRatio,
    width: 800,                    // Auto from DOM if omitted
    height: 600,
    locale: 'EN',                  // 'EN' | 'ZH'
    useDirtyRect: true             // Performance optimization
  }
);

// Set configuration
chart.setOption(option);
```

**Renderer selection**:
- `'canvas'` (default): Better for large datasets, special effects, complex interactions
- `'svg'`: Better for mobile, print quality, DOM inspection, SSR

---

## Event Handling

### Mouse Events

```javascript
// Basic click handler
chart.on('click', function(params) {
  console.log(params);
});

// Event with component filter
chart.on('click', 'series.bar', function(params) {
  // Only fires for bar series clicks
});

// Query syntax
chart.on('click', { seriesIndex: 0 }, handler);
chart.on('click', { seriesName: 'Sales' }, handler);
chart.on('click', { seriesType: 'line' }, handler);
chart.on('click', { componentType: 'markPoint' }, handler);
```

**Mouse events**: `click`, `dblclick`, `mousedown`, `mouseup`, `mouseover`, `mouseout`, `mousemove`, `globalout` (mouse leaves chart), `contextmenu`

### Event Parameters Object

```javascript
chart.on('click', function(params) {
  // Component info
  params.componentType;     // 'series' | 'markPoint' | 'xAxis' | etc.
  params.seriesType;        // 'line' | 'bar' | 'pie' | etc.
  params.seriesIndex;       // Index in series array
  params.seriesName;        // series.name value
  params.seriesId;          // series.id value
  
  // Data info
  params.name;              // Data item name
  params.dataIndex;         // Index in data array
  params.data;              // Raw data item
  params.value;             // Data value
  
  // Visual info
  params.color;             // Item color
  params.percent;           // Percentage (pie charts)
  
  // Event info
  params.event;             // Original DOM event
});
```

### Component Events

```javascript
// Legend selection
chart.on('legendselectchanged', function(params) {
  console.log(params.name);      // Changed legend item name
  console.log(params.selected);  // { 'Series A': true, 'Series B': false }
});

// DataZoom
chart.on('datazoom', function(params) {
  console.log(params.start, params.end);  // 0-100 percentage
  console.log(params.startValue, params.endValue);  // Actual values
});

// Brush selection
chart.on('brushselected', function(params) {
  params.batch[0].selected;  // Array of selected data indices per series
});

// Tooltip shown
chart.on('showTip', function(params) {
  console.log(params);
});

// Finished rendering
chart.on('finished', function() {
  console.log('Render complete');
});

// Data loaded (for async data)
chart.on('rendered', function() {
  // Called after each render
});
```

### Remove Event Handlers

```javascript
// Remove specific handler
chart.off('click', handler);

// Remove all handlers for event type
chart.off('click');

// Remove handler with query
chart.off('click', 'series.bar');
```

### ZRender Events (Low-level)

```javascript
// Get ZRender instance
const zr = chart.getZr();

// Low-level events (includes empty area clicks)
zr.on('click', function(params) {
  console.log(params.offsetX, params.offsetY);
});
```

---

## Instance Methods

### Core Methods

| Method | Description |
|--------|-------------|
| `setOption(option, opts?)` | Set/update chart configuration |
| `getOption()` | Get current merged option |
| `resize(opts?)` | Resize chart |
| `dispose()` | Destroy instance (CRITICAL for cleanup) |
| `clear()` | Clear content, keep instance |
| `isDisposed()` | Check if disposed |

### Resize

```javascript
// Auto-detect container size
chart.resize();

// Explicit dimensions
chart.resize({
  width: 800,
  height: 600,
  animation: {
    duration: 300,
    easing: 'cubicOut'
  }
});

// Responsive handling
window.addEventListener('resize', () => chart.resize());
// OR with ResizeObserver (recommended)
const observer = new ResizeObserver(() => chart.resize());
observer.observe(container);
```

### Loading State

```javascript
// Show loading
chart.showLoading('default', {
  text: 'Loading...',
  color: '#5470c6',
  textColor: '#000',
  maskColor: 'rgba(255, 255, 255, 0.8)',
  zlevel: 0,
  fontSize: 12,
  showSpinner: true,
  spinnerRadius: 10
});

// Hide loading
chart.hideLoading();
```

### Export

```javascript
// Get as data URL
const dataURL = chart.getDataURL({
  type: 'png',                    // 'png' | 'jpeg' | 'svg'
  pixelRatio: 2,
  backgroundColor: '#fff',
  excludeComponents: ['toolbox']
});

// Get as connected charts (for multiple linked charts)
const dataURL = chart.getConnectedDataURL({
  type: 'png',
  pixelRatio: 2,
  backgroundColor: '#fff'
});
```

### Coordinate Conversion

```javascript
// Data coordinates → pixel coordinates
const pixel = chart.convertToPixel('grid', [xValue, yValue]);
const pixel = chart.convertToPixel({ seriesIndex: 0 }, [xValue, yValue]);

// Pixel coordinates → data coordinates
const data = chart.convertFromPixel('grid', [x, y]);
const data = chart.convertFromPixel({ xAxisIndex: 0, yAxisIndex: 0 }, [x, y]);

// Check if point is in coordinate system
const isInGrid = chart.containPixel('grid', [x, y]);
```

### Other Methods

```javascript
// Get dimensions info
const width = chart.getWidth();
const height = chart.getHeight();

// Get DOM
const dom = chart.getDom();

// Get ZRender instance (low-level)
const zr = chart.getZr();

// Group charts for linked interactions
echarts.connect([chart1, chart2]);
echarts.disconnect(groupId);

// Append data (for streaming)
chart.appendData({
  seriesIndex: 0,
  data: newDataArray
});
```

---

## Actions

Programmatically trigger chart behaviors.

### Dispatch Syntax

```javascript
chart.dispatchAction({
  type: 'actionType',
  // Action-specific params
});
```

### Highlight/Downplay

```javascript
// Highlight data point
chart.dispatchAction({
  type: 'highlight',
  seriesIndex: 0,
  dataIndex: 2
});

// Highlight by name
chart.dispatchAction({
  type: 'highlight',
  seriesName: 'Sales',
  name: 'January'
});

// Downplay (remove highlight)
chart.dispatchAction({
  type: 'downplay',
  seriesIndex: 0,
  dataIndex: 2
});
```

### Tooltip Control

```javascript
// Show tooltip
chart.dispatchAction({
  type: 'showTip',
  seriesIndex: 0,
  dataIndex: 3
});

// Show tooltip at position
chart.dispatchAction({
  type: 'showTip',
  x: 100,
  y: 200
});

// Hide tooltip
chart.dispatchAction({
  type: 'hideTip'
});
```

### Legend Control

```javascript
// Toggle selection
chart.dispatchAction({
  type: 'legendToggleSelect',
  name: 'Series A'
});

// Select specific
chart.dispatchAction({
  type: 'legendSelect',
  name: 'Series A'
});

// Unselect
chart.dispatchAction({
  type: 'legendUnSelect',
  name: 'Series A'
});

// Scroll legend
chart.dispatchAction({
  type: 'legendScroll',
  scrollDataIndex: 5,
  legendId: 'legendId'
});
```

### DataZoom Control

```javascript
// Zoom to range
chart.dispatchAction({
  type: 'dataZoom',
  start: 20,
  end: 80
});

// Zoom by values
chart.dispatchAction({
  type: 'dataZoom',
  startValue: '2020-01-01',
  endValue: '2020-06-30'
});

// Target specific dataZoom
chart.dispatchAction({
  type: 'dataZoom',
  dataZoomIndex: 0,
  start: 10,
  end: 50
});
```

### Pie/Sunburst Selection

```javascript
// Select sector
chart.dispatchAction({
  type: 'pieSelect',
  seriesIndex: 0,
  dataIndex: 2
});

// Unselect
chart.dispatchAction({
  type: 'pieUnSelect',
  seriesIndex: 0,
  dataIndex: 2
});

// Toggle
chart.dispatchAction({
  type: 'pieToggleSelect',
  name: 'Category A'
});
```

### Geo/Map Actions

```javascript
// Select region
chart.dispatchAction({
  type: 'geoSelect',
  name: 'California'
});

// Roam (pan/zoom)
chart.dispatchAction({
  type: 'geoRoam',
  dx: 10,                         // Pan x
  dy: 10,                         // Pan y
  zoom: 1.1,                      // Zoom factor
  originX: 400,                   // Zoom center x
  originY: 300                    // Zoom center y
});
```

### Brush Actions

```javascript
// Start brush
chart.dispatchAction({
  type: 'brush',
  areas: [{
    brushType: 'rect',
    coordRange: [[10, 20], [30, 40]]
  }]
});

// Clear brush
chart.dispatchAction({
  type: 'brush',
  command: 'clear',
  areas: []
});
```

---

## setOption Modes

Control how new options merge with existing configuration.

### Default Merge

```javascript
// Merges with existing option
chart.setOption({
  series: [{ data: newData }]
});
// Other properties preserved
```

### notMerge (Full Replace)

```javascript
// Replaces entire option
chart.setOption(newOption, { notMerge: true });
// OR shorthand
chart.setOption(newOption, true);
```

### replaceMerge (Selective Replace)

```javascript
// Replace only specified components
chart.setOption(newOption, {
  replaceMerge: ['series']        // Replace series array entirely
});

// Replace multiple component types
chart.setOption(newOption, {
  replaceMerge: ['series', 'xAxis', 'yAxis']
});
```

### Lazy Update

```javascript
// Defer rendering until next frame
chart.setOption(option, {
  lazyUpdate: true
});
```

### Silent Update

```javascript
// Don't trigger events
chart.setOption(option, {
  silent: true
});
```

### Transition Animation

```javascript
// Control update animation
chart.setOption(option, {
  transition: ['series']          // Animate series transitions
});
```

### Combined Options

```javascript
chart.setOption(newOption, {
  notMerge: false,
  replaceMerge: ['series'],
  lazyUpdate: false,
  silent: false
});
```

---

## Common Patterns

### Dynamic Data Update

```javascript
// Efficient data update (merge mode)
setInterval(() => {
  chart.setOption({
    series: [{
      data: generateNewData()
    }]
  });
}, 1000);
```

### Click to Detail

```javascript
chart.on('click', function(params) {
  if (params.componentType === 'series') {
    // Navigate or show detail
    showDetailView(params.data);
  }
});
```

### Linked Charts

```javascript
// Connect multiple charts
echarts.connect([chart1, chart2, chart3]);

// Now tooltip, legend, dataZoom sync automatically
```

### Responsive with Debounce

```javascript
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => chart.resize(), 100);
});
```

### Cleanup in SPA

```javascript
// React
useEffect(() => {
  const chart = echarts.init(ref.current);
  chart.setOption(option);
  return () => chart.dispose();  // CRITICAL
}, []);

// Vue
onBeforeUnmount(() => {
  chart.dispose();
});
```
