const { getDefaultConfig } = require("expo/metro-config");
const { withDebugIds } = require("@saravana.devx/mapup/metro");

module.exports = withDebugIds(getDefaultConfig(__dirname));
