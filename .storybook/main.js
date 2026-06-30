const path = require("path");
const postcssConfig = require("./postcss.config.js");

module.exports = {
  stories: [
    "../stories/**/*.stories.@(js|jsx|mjs|mjsx)",
    "../stories/**/*.mdx",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: { fsCache: true, lazyCompilation: true },
  },
  addons: ["@storybook/addon-docs"],
  staticDirs: ["./"],
  webpackFinal: (config) => {
    const cssRuleToLookFor = /\.css$/.toString();

    const rules = config.module.rules.map((rule) => {
      if (rule.test?.toString() === cssRuleToLookFor) {
        return {
          ...rule,
          use: [
            require.resolve("style-loader"),
            {
              loader: require.resolve("css-loader"),
              options: {
                importLoaders: 1,
                modules: { localIdentName: "[name]-[local]-[hash:base64:5]" },
                sourceMap: true,
              },
            },
            {
              loader: require.resolve("postcss-loader"),
              options: {
                postcssOptions: {
                  plugins: postcssConfig(["node_modules"], { isDebug: true })(),
                  config: false,
                },
                sourceMap: true,
              },
            },
          ],
        };
      }
      return rule;
    });

    return {
      ...config,
      resolve: { ...config.resolve, modules: ["node_modules", path.resolve(__dirname, "../packages/ui/node_modules")] },
      module: {
        ...config.module,
        rules: [
          ...rules,
          {
            test: /\.[jt]sx?$/,
            exclude: /node_modules/,
            use: {
              loader: require.resolve("babel-loader"),
              options: {
                cacheDirectory: true,
                presets: [
                  require.resolve("@babel/preset-env"),
                  require.resolve("@babel/preset-react"),
                ],
              },
            },
          },
          {
            // eslint-disable-next-line max-len
            test: /.*__files__\/.*(?<!\.(pdf|js|jsx|svg|ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|mp4|webm|wav|mp3|m4a|aac|oga))$/,
            type: "asset/resource",
            generator: { filename: "static/media/[name].[hash:8][ext]" },
          },
        ],
      },
    };
  },
};
