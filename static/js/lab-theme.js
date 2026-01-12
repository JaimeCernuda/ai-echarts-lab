const labThemeLight = {
    color: ['#00ff9d', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
    backgroundColor: 'transparent', // Changed from #ffffff to blend with page
    textStyle: { color: '#111111' },
    title: { textStyle: { color: '#111111' } },
    line: { smooth: true },
    grid: { show: false }, // Minimalist: Remove grid lines
    toolbox: { show: false } // Minimalist: Remove toolbox
};

const labThemeDark = {
    color: ['#00ff9d', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
    backgroundColor: 'transparent', // Changed from #111111 to blend with page
    textStyle: { color: '#ffffff' },
    title: { textStyle: { color: '#ffffff' } },
    line: { smooth: true },
    grid: { show: false }, // Minimalist: Remove grid lines
    toolbox: { show: false }, // Minimalist: Remove toolbox
    categoryAxis: {
        axisLine: { show: true, lineStyle: { color: '#333' } },
        axisLabel: { color: '#888' }
    },
    valueAxis: {
        axisLine: { show: false },
        splitLine: { show: false }
    }
};

window.labThemeLight = labThemeLight;
window.labThemeDark = labThemeDark;
