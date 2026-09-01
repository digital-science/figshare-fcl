/** @type {import('@storybook/react-vite').StorybookConfig} */
export default {
  stories: [
    "../stories/**/*.stories.@(js|jsx|mjs|mjsx)",
    "../stories/**/*.mdx",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
  ],
  staticDirs: ["./"],
};
