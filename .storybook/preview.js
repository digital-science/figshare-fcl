import "@digital-science/figshare-fcl/styles/index.css";
import "./styles/index.css";


export const parameters = {
  layout: "fullscreen",

  options: {
    panelPosition: "right",
    storySort: {
      method: "alphabetical",
      order: ["Global Styles", "Layout", "UI", "Components", "Icons", "Utils"],
    },
  },

  backgrounds: {
    default: "default",
    values: [{
      name: "default",
      value: "#ffffff",
    }],
    grid: {
      cellSize: 6,
      cellAmount: 10,
      opacity: 0.2,
    },
  },

  controls: { expanded: true },

  a11y: {
    // 'todo' - show a11y violations in the test UI only
    // 'error' - fail CI on a11y violations
    // 'off' - skip a11y checks entirely
    test: "todo",
  }
};
