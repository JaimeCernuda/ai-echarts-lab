# Antigravity Research Lab

A specialized environment for creating and viewing mode-aware ECharts visualizations.

## Features
- **Distraction-Free Lab**: Shows only the current experiment (`/lab`).
- **Archive**: Browsable history of past experiments (`/archive`).
- **Mode-Aware**: Automatically adapts charts to System Light/Dark mode.
- **Workflow Integrated**: Use `/Build-graph` to generate new experiments from data.

## Setup
1.  Install Hugo.
2.  Run `hugo server`.
3.  Navigate to `localhost:1313`.

## Usage
-   **Add Data**: Drop CSV/JSON into `data/`.
-   **Create Chart**: Type `/Build-graph @[your-file] "description"`.
