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
  // Storybook's dev server rejects requests whose Host header isn't in
  // core.allowedHosts (DNS-rebinding protection) - needed since this is
  // deployed behind fcl.figshare.dev, not accessed as localhost.
  core: {
    allowedHosts: [".figshare.dev"],
  },
};
