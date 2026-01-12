---
description: Analyzes an experiment and creates a mode-aware EChart.
---

1. **Analyze**: Explore the files in the provided arguments (or `data/`). Identify the key metrics.
2. **Strategy**: 
    - If a descriptor is provided in the args (e.g., 'Heatmap of latency'), prioritize that.
    - If no descriptor, plan the most insightful visualization (Radar for multi-metric, Heatmap for density, etc.).
3. **Build**:
    - **Identify**: Create a unique slug for the experiment (e.g., based on the folder name or date).
    - **Generate**: Write a NEW file to `content/experiments/<slug>.md`.
    - **Frontmatter**: Ensure the file has:
      ```yaml
      title: "Title based on analysis"
      date: 2026-01-12T14:24:50-06:00 (Use current time)
      draft: false
      ```
    - **Content**: Insert the ECharts HTML/JS snippet (using the Skill guidelines) into the body of this new file. Do NOT touch `lab.md`.
4. **Strict Verification Loop (CRITICAL)**:
    - **Deploy**: Start the local server (e.g., `hugo server`) and ensure it is running.
    - **Capture**: Use a browser tool to open the page.
        - Take a screenshot in **Light Mode**.
        - Toggle the system/browser to **Dark Mode** and take a second screenshot.
    - **Evaluate**: Analyze the screenshots for errors.
        - Check for overlapping text or cut-off labels.
        - Verify contrast and readability in both themes.
        - Confirm that the data matches the requested "descriptor".
    - **Iterate**: If ANY issues are found, you MUST modify the code/config and repeat the Deploy/Capture/Evaluate steps.
    - **Finalize**: Only mark the task as complete when visual verification passes.
