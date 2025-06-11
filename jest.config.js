module.exports = {
  coverageDirectory: ".coverage",
  collectCoverageFrom: [
    "<rootDir>/packages/**/*.{js,jsx}",
    "!<rootDir>/packages/**/*.test.{js,jsx}",
    "!<rootDir>/**/*.stories.{js,jsx}",
    "!<rootDir>/packages/**/__files__/**",
    "!<rootDir>/node_modules",
  ],
  coverageReporters: ["html"],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  modulePaths: ["<rootDir>/packages"],
  setupFiles: ["<rootDir>/scripts/tests/jest.setup.js"],
  setupFilesAfterEnv: ["<rootDir>/scripts/tests/jsdom.setup.js"],
  snapshotSerializers: ["enzyme-to-json/serializer"],
  transform: {
    "^.+\\.(js|jsx)$": require.resolve("babel-jest"),
    "\\.(jpg|jpeg|png|gif)$": "<rootDir>/scripts/tests/fileTransformer.js",
    "\\.(eot|otf|webp|svg|ttf|woff|woff2)$": "<rootDir>/scripts/tests/fileTransformer.js",
    "\\.(mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/scripts/tests/fileTransformer.js",
    ".*__files__/.*(?<!.(js|jsx))$": "<rootDir>/scripts/tests/fileTransformer.js",
  },
  moduleNameMapper: {
    "\\.css$": require.resolve("identity-obj-proxy"),
    "file-loader!*": "<rootDir>/scripts/tests/fileTransformer.js",
    "@digital-science/figshare-fcl/(.*)": "@digital-science/figshare-fcl/$1",
  },
  testEnvironment: "jsdom",
};
