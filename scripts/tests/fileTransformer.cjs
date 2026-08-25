const path = require("path");


module.exports = {
  process(src, name) {
    return { code: `module.exports = ${JSON.stringify(path.basename(name))};` };
  },
};
