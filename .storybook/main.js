const path = require("path");


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
    return {
      ...config,
      resolve: { ...config.resolve, modules: ["node_modules", path.resolve(__dirname, "../packages/ui/node_modules")] },
      module: {
        ...config.module,
        rules: [
          ...config.module.rules,
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

