---
description: Analyzes an experiment and creates a mode-aware EChart.
---

1. **Analyze**: Explore the files in the provided arguments (or `data/`). Identify the key metrics.

2. **Strategy**: 
    - If a descriptor is provided in the args (e.g., 'Heatmap of latency'), prioritize that.
    - If no descriptor, plan the most insightful visualization (Radar for multi-metric, Heatmap for density, etc.).

3. **Build Process**:
    - **Identify**: Create a unique slug for the experiment (e.g., based on the folder name or date).
    - **Start**: Write a NEW file to `content/experiments/<slug>.md`.
    - **Frontmatter**: Ensure the file has:
      ```yaml
      title: "Title based on analysis"
      date: 2026-01-12T14:24:50-06:00 (Use current time)
      draft: false
      ```

4. **Content Generation**
    - ALWAYS read the skills on .agent/skills:
        - Reference the **Lab skill** for: Environment setup, theme usage (`labTheme`), Alpine.js integration, and valid HTML structure.
        - Reference the **ECharts skill** for: Chart type selection, option configuration components (series, axes, legends), and data formatting strategies.
    - With that knoeldge create the eachart snippet, try to really think about the best figure to represent the figure, while common, is not always lines and charts that is best and more beautifull. 
    - Insert the ECharts HTML/JS snippet (using the Skill guidelines) into the body of this new file. Do NOT touch `lab.md`.

5. **Strict Verification Loop (CRITICAL)**:
    - **Deploy**: Start the local server (e.g., `hugo server`) and ensure it is running.
    - **Capture**: Use a browser tool to open the current_work page by going to (VERY IMPORTANT) directly http://localhost:1313.
        - **CRITICAL RESTRICTION**: Do NOT navigate to the individual experiment page (e.g. /experiments/slug). Verify the card as it appears on the dashboard.
        - **ACTION**: Scroll to the experiment card if needed, but do NOT click it. 
        - Take a screenshot in **Light Mode**.
        - Toggle the system/browser to **Dark Mode** and take a second screenshot.
    - **Evaluate**: Analyze the screenshots for errors and possible improvemetns:
        - Check for overlapping text or cut-off labels.
        - Verify contrast and readability in both themes.
        - Confirm that the data matches the requested "descriptor".
        - Consider the action that happen on hover, are they the most suiotable to the visualization.
        - Any think that you might come up with. 
    - **Iterate**: If ANY issues are found, you MUST modify the code/config and repeat the Deploy/Capture/Evaluate steps.

6. **User Feedback**:
    - Once your verification is done, let the user provide feedback on the image.
    - If the user provides feedback go back to step 4 and work on implementing it and verifying it.
    - **Finalize**: Only mark the task as complete when visual verification passes and the user has give its okay.