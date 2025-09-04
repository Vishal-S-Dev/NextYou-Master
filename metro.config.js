/* eslint-env node */

const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

// SVG support
const assetExts = config.resolver.assetExts.filter((ext) => ext !== 'svg');
const sourceExts = [...config.resolver.sourceExts, 'svg'];

config.resolver.assetExts = assetExts;
config.resolver.sourceExts = sourceExts;

config.transformer.babelTransformerPath = require.resolve(
  'react-native-svg-transformer'
);

module.exports = withNativeWind(config, { input: './global.css' });
