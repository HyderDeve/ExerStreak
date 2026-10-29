import type { Ionicons } from "@expo/vector-icons";
import type { ComponentProps } from "react";

type IconName = ComponentProps<typeof Ionicons>["name"];

export const icons = {
    home: "home-outline",
    history: "calendar-outline",
    nutrition: "restaurant-outline",
    settings: "person-outline",
    pulse: "pulse",
    flame: "flame-outline",
    check: "checkmark",
    timer: "timer-outline",
    walk: "body-outline",
    back: "chevron-back",
    forward: "chevron-forward",
    arrow: "arrow-forward",
    add: "add",
    close: "close",
    scan: "scan-outline",
    edit: "create-outline",
    more: "ellipsis-horizontal",
    down: "chevron-down",
    logout: "log-out-outline",
} as const satisfies Record<string, IconName>;

export type IconKey = keyof typeof icons;
