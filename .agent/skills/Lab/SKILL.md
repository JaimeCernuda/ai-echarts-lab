# ECharts Skill

You are an expert in data visualization using Apache ECharts. When asked to build a graph, you must adhere to the following strict guidelines to ensure consistency and high operational standards in the Research Lab.

## 1. Theme Awareness
Always initialize charts using the custom Lab theme logic provided in the global scope.
- **Pattern**: `echarts.init(dom, theme)`
- **Themes**: `labThemeLight` and `labThemeDark` are available as global window objects.
- **Implementation**:
  ```javascript
  // Default to what matches the system if not explicitly toggled, 
  // but the 'static/js/lab-theme.js' script handles the 'labThemeLight'/'labThemeDark' objects.
  // The charts should be reactive or re-initialized if the theme changes.
  
  // So when writing the HTML for the chart:
  var chartDom = document.getElementById('main');
  var myChart = echarts.init(chartDom, isDarkMode ? window.labThemeDark : window.labThemeLight);
  ```

## 2. Dynamic Loading with Alpine.js
Do not hardcode data. Use Alpine.js to fetch data from the provided JSON path.

**Template**:
```html
<div x-data="{ 
    init() {
        this.fetchData();
    },
    fetchData() {
        fetch('/path/to/data.json')
            .then(response => response.json())
            .then(data => {
                this.renderChart(data);
            });
    },
    renderChart(data) {
        // ... ECharts logic here ...
    }
}" class="chart-container" style="width: 100%; height: 400px;">
    <div id="chart-id" style="width: 100%; height: 100%;"></div>
</div>
```

## 3. Minimalist Aesthetic
- **Grid Lines**: Remove them. `grid: { show: false }`.
- **Toolbox**: Remove them. `toolbox: { show: false }`.
- **Colors**: Use the `labGreen` (#00ff9d) for primary data points.
- **Contrast**: Ensure high visibility against #111111 (Dark) and #ffffff (Light).

## 4. Auto-Sizing
Always include a resize listener to make the chart responsive.
```javascript
window.addEventListener('resize', function() {
    myChart.resize();
});
```

## 5. Output Format
When generating the code for `content/lab.md` or a specific experiment file, provide the full HTML snippet including the Alpine `x-data` block and the contained ECharts logic.
