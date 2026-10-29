// Raw values for places className can't reach (tab bar, icon colors).
// Keep in sync with @theme in global.css.
export const colors = {
    background: "#fff6ee",
    foreground: "#8f3a12",
    card: "#ffffff",
    muted: "#ffebdb",
    mutedForeground: "#a15a38",
    faint: "#c48466",
    primary: "#f97316",
    primarySoft: "#fdba74",
    accent: "#ffdcc2",
    border: "#fce3cf",
    success: "#16a34a",
    destructive: "#dc2626",
} as const;

export const spacing = {
    0: 0,
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    7: 28,
    8: 32,
    9: 36,
    10: 40,
    11: 44,
    12: 48,
    14: 56,
    16: 64,
    18: 72,
    20: 80,
    24: 96,
    30: 120,
} as const;

export const components = {
    tabBar: {
        height: spacing[18],
        horizontalInset: spacing[5],
        radius: spacing[8],
        iconFrame: spacing[12],
        itemPaddingVertical: spacing[2],
    },
} as const;

export const theme = { colors, spacing, components } as const;
