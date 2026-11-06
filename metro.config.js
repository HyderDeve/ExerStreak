const { getDefaultConfig } = require("expo/metro-config");
const { withNativewind } = require("nativewind/metro");

/** @type {import('expo/metro-config').MetroConfig} */
const config = withNativewind(getDefaultConfig(__dirname));

// NativeWind swaps every `import "react-native"` for a wrapper that only re-exports a fixed list of
// names. That list lacks `NativeComponentRegistry` and `AssetRegistry`, which these three packages read
// from "react-native" (expo-router at startup -> "Cannot read property 'get' of undefined"). They don't
// use `className`, so they get the real `react-native`. Everything else, including @expo/vector-icons
// and your own files, keeps going through NativeWind exactly as before.
// (Metro caches this resolution per directory, so the match is by package rather than by single file.)
const needsRealReactNative = /[\\/]node_modules[\\/](?:expo-router|expo-modules-core|expo-asset)[\\/]/;
const resolveRequest = config.resolver.resolveRequest;

config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === "react-native" && needsRealReactNative.test(context.originModulePath)) {
    return { type: "sourceFile", filePath: require.resolve("react-native") };
  }
  return resolveRequest ? resolveRequest(context, moduleName, platform) : context.resolveRequest(context, moduleName, platform);
};

module.exports = config;