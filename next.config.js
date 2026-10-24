const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (fase) => ({
  output: "export",
  distDir: fase === PHASE_DEVELOPMENT_SERVER ? ".next-dev" : ".next"
});
