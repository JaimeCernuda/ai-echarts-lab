# Antigravity Research Lab

A specialized environment for creating and viewing mode-aware ECharts visualizations.
Main file structure (mostly .agent) is designed for antigravity due to its native browser support. 
Welcomed PRs with support for other enviornments. 

## Features
- **Lab**: Shows only the current experiment for distraction free AI reference (`/lab`).
- **Archive**: Browsable history of past experiments (`/archive`).
- **Mode-Aware**: Automatically adapts charts to System Light/Dark mode.
- **Workflow Integrated**: Use `/Build-graph` to generate new experiments from data.

## Setup
1.  **Install Hugo**:
    -   **Windows (Winget)**: `winget install Hugo.Hugo.Extended` (Recommended) or `Hugo.Hugo`
    -   **Linux (Apt)**: `sudo apt-get install hugo`
    -   **Mac (Homebrew)**: `brew install hugo`
2.  Run `hugo server`.
3.  Navigate to `localhost:1313`.

## Usage
-   **Add Data**: Drop CSV/JSON into `data/`.
-   **Create Chart**: Type `/Build-graph @[your-file] "description"`.
