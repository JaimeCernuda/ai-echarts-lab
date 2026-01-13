/**
 * Alpine.js Chart Component Factory
 * Used by the {{< chart >}} Hugo shortcode
 */
function chartComponent(dataPath, chartName) {
    return {
        chart: null,

        init() {
            this.fetchData(dataPath, chartName);
            window.addEventListener('resize', () => {
                if (this.chart) this.chart.resize();
            });
            window.addEventListener('themeChanged', () => {
                this.fetchData(dataPath, chartName);
            });
        },

        fetchData(dataPath, chartName) {
            fetch(dataPath)
                .then(response => response.json())
                .then(data => {
                    // Look for chart-specific render function
                    const renderFn = window['renderChart_' + chartName.replace(/-/g, '_')];
                    if (renderFn) {
                        this.renderChart(data, renderFn);
                    } else {
                        console.error('Chart render function not found:', 'renderChart_' + chartName);
                    }
                });
        },

        renderChart(data, optionFn) {
            const chartDom = this.$refs.chart;
            const isDark = document.documentElement.classList.contains('dark');

            if (this.chart) {
                this.chart.dispose();
            }

            this.chart = echarts.init(chartDom, isDark ? window.labThemeDark : window.labThemeLight);
            const option = optionFn(data, echarts);
            this.chart.setOption(option);
        }
    };
}
