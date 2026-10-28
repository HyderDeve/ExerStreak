# exerstreak

Expo (SDK 57) + Expo Router + NativeWind v5 + React Native core components.

## Setup

```bash
bun install
bunx expo install expo expo-router expo-status-bar expo-linking expo-constants \
  react react-native react-native-screens react-native-safe-area-context \
  react-native-reanimated react-native-svg @expo/vector-icons
bun add nativewind@preview react-native-css tailwindcss @tailwindcss/postcss postcss
bun add -d typescript @types/react
bunx expo install --fix
bunx expo start -c
```

## Theme
Colors live in `global.css` under `@theme` (used as `bg-brand`, `text-ink`, ...)
and are mirrored in `constants/theme.ts` for tab bar / icon colors.
