# ECharts Skill

You are an expert in data visualization using Apache ECharts. When asked to build a graph, you must adhere to the following strict guidelines to ensure consistency and high operational standards in the Research Lab.

## 1. Chart Architecture (Shortcode Pattern)

Use the `{{< chart >}}` shortcode for all visualizations. This separates concerns:

**Markdown file** (`data/viz/<slug>.md`):
```yaml
---
title: "Chart Title"
date: 2026-01-12T19:09:59-06:00
chart: <slug>
draft: false
---

{{< chart >}}
```

**JavaScript file** (`data/viz/<slug>.js`):
```javascript
/**
 * Chart Configuration
 * Data: /data/experiments/<slug>.json
 */
function renderChart_<slug_underscored>(data, echarts) {
    return {
        // ECharts option object
        title: { text: 'Title', left: 'center' },
        tooltip: { trigger: 'axis' },
        xAxis: { type: 'category', data: data.map(d => d.label) },
        yAxis: { type: 'value' },
        series: [{ type: 'bar', data: data.map(d => d.value) }]
    };
}

// Register globally (replace dashes with underscores in function name)
window.renderChart_<slug_underscored> = renderChart_<slug_underscored>;
```

**JSON data** (`static/data/experiments/<slug>.json`):
```json
[{"label": "A", "value": 10}, {"label": "B", "value": 20}]
```

## 2. Theme Awareness

The `chart-component.js` handles theme switching automatically. Your render function receives the `echarts` object to use gradients:

```javascript
itemStyle: {
    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        { offset: 0, color: '#00ff9d' },
        { offset: 1, color: '#00b36b' }
    ])
}
```

Themes `labThemeLight` and `labThemeDark` are applied automatically based on system preference.

## 3. Minimalist Aesthetic

- **Colors**: Use `labGreen` (#00ff9d) for primary data points
- **Contrast**: Ensure high visibility against #111111 (Dark) and #ffffff (Light)
- **Paper-ready**:
    - **Title**: Avoid titles in the chart (use page title instead)
    - **Legend**: Position inside the chart when possible
    - **Accessibility**: Use different shapes/textures (not just colors) for print readability
- **Tooltips**: Use hover to display values, and make a pop up that shows all values for the current x-axis value.

## 4. Auto-Sizing

Handled automatically by `chart-component.js`. The component listens for resize and theme change events.

## 5. File Organization

```
data/viz/
├── my-chart.md        # Markdown with shortcode
├── my-chart.js        # ECharts option function
static/data/experiments/
└── my-chart.json      # Data file
```

The Hugo config mounts `data/viz/*.js` to `/js/charts/` for serving.
