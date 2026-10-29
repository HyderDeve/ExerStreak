# exerstreak

Daily movement + nutrition streak app. Expo SDK 57 · Expo Router · NativeWind v5 · Zustand · AsyncStorage.
No accounts or backend: the onboarding profile is saved on the device.

## Setup

```bash
bun install
bun run android     # or: bun run ios / bun start
```

## Structure

```
app/
  _layout.tsx            fonts, splash (waits for fonts + saved profile), Stack
  index.tsx              redirect: no saved profile → onboarding, else tabs
  onboarding.tsx         profile setup (saved to AsyncStorage)
  food-scan.tsx          scan result, serving adjust, add to log
  routines/[id].tsx      routine detail (planks, mobility...)
  (tabs)/                index (Today), history, nutrition, settings — floating tab bar
components/              PascalCase UI components
constants/               data, icons, images, theme
lib/                     utils, zustand stores, useProfile
global.css               @theme tokens + semantic @utility classes
type.d.ts                global app types (incl. store interfaces)
```

## Notes
- `lightningcss` is pinned to **1.30.1** (`overrides` + `resolutions`). Newer versions break `react-native-css`.
- Only the profile persists across restarts. Routine progress, streak history and the food log are in memory with demo seed data.
- App icon / splash image are not included — add them in `app.json`.
- The food-scan result is a fixed demo.
