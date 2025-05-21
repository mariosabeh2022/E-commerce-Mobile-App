const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const defaultConfig = getDefaultConfig(__dirname);

// Modify assetExts and sourceExts
const {assetExts, sourceExts} = defaultConfig.resolver;

defaultConfig.resolver = {
  assetExts: assetExts.filter(ext => ext !== 'json'),
  sourceExts: [...sourceExts, 'json'],
};

const config = {};

module.exports = mergeConfig(defaultConfig, config);
