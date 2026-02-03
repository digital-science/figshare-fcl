module.exports = ({ config: defaultConfig }) => {
  const cssRuleToLookFor = /\.css$/.toString();

  const postcssConfig = require("./postcss.config.js");

  const rules = defaultConfig.module.rules.map((rule) => {
    if (rule.test.toString() === cssRuleToLookFor) {
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
                plugins: postcssConfig(
                  ["node_modules"],
                  { isDebug: true },
                )(),
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
    ...defaultConfig,
    resolve: {
      ...defaultConfig.resolve,
      modules: ["node_modules"],
    },
    plugins: [
      ...defaultConfig.plugins,
    ],
    module: {
      ...defaultConfig.module,
      rules: [
        ...rules,
        {
          // eslint-disable-next-line max-len
          test: /.*__files__\/.*(?<!\.(pdf|js|jsx|svg|ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|mp4|webm|wav|mp3|m4a|aac|oga))$/,
          type: "asset/resource",
          generator: { filename: "static/media/[name].[hash:8][ext]" },
        },
      ],
    },
  };
};
