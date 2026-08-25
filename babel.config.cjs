process.env.NODE_ENV = process.env.NODE_ENV || "development";

const env = process.env.BABEL_ENV || process.env.NODE_ENV;
if (env !== "development" && env !== "production" && env !== "test") {
  throw new Error(
    `[babel-preset]: NODE_ENV/BABEL_ENV missing or invalid. (value: ${env})`
  );
}

module.exports = {
  presets: [
    ["@babel/preset-env"],
    ["@babel/preset-react"],
  ],
  assumptions: {
    privateFieldsAsProperties: false,
    setPublicClassFields: false,
  },
  plugins: [
    "@babel/proposal-class-properties",
    ...(env === "production" ? [require.resolve("babel-plugin-transform-react-remove-prop-types")] : []),
  ],
};
