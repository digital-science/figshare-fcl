module.exports = {
  stories: ["../stories/**/*.stories.@(js|jsx|mdx|mjs|mjsx)"],
  framework: {
    name: "@storybook/react-webpack5",
    options: {
      fastRefresh: false,
      strictMode: true,
      builder: {
        fsCache: true,
        lazyCompilation: true,
      },
    },
  },
  addons: [
    {
      name: "@storybook/addon-docs", options: {
        configureJSX: true,
        sourceLoaderOptions: null,
        transcludeMarkdown: true,
      },
    },
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
  ],
  features: { modernInlineRender: true },
  /**
   * storybook@7.x webpack5 settings — disable loose mode on babel-loader rules
   */
  webpackFinal: (config) => {
    function disableLooseSetting(pluginOrPreset) {
      if (Array.isArray(pluginOrPreset) && pluginOrPreset[1].loose) {
        pluginOrPreset[1].loose = false;
      }
    }

    function simpleGet(object, path) {
      return path.split(".").reduce((result, key) => {
        if (result !== undefined) {
          return result[key];
        }

        return undefined;
      }, object);
    }

    config.module.rules.forEach((rule) => {
      const loader = simpleGet(rule, "use.0.loader") || "";
      const matches = loader.includes("babel-loader");

      if (matches) {
        const options = simpleGet(rule, "use.0.options") || {};

        (options.plugins || []).forEach(disableLooseSetting);
        (options.presets || []).forEach(disableLooseSetting);
      }
    });

    return Promise.resolve(config);
  },
};
