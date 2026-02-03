module.exports = {
  stories: ["../stories/**/*.stories.@(js|jsx|mdx|mjs|mjsx)"],
  core: {
    builder: {
      name: "webpack5",
      options: {
        fsCache: true,
        lazyCompilation: true,
      },
    },
  },
  addons: [
    {
      name: "@storybook/addon-docs", options: {
        configureJSX: true,
        babelOptions: {},
        sourceLoaderOptions: null,
        transcludeMarkdown: true,
      },
    },
    "@storybook/addon-essentials",
    "@storybook/addon-jest",
    "storybook-addon-designs",
  ],
  reactOptions: {
    fastRefresh: true,
    strictMode: true,
  },
  features: { modernInlineRender: true },
  /**
   * new storybook@6.5.x webpack5 settings include babel-loader default rules for mdx and other files
   * setting them through the "babel" config property will ignore some of those default rules.
   * the setting and parsing below will set loose to false based on the existing way,
   * but for most rules that include the loader.
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
