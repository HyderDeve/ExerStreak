import dayjs from "dayjs";
import { icons } from "./icons";

export const tabs: AppTab[] = [
    { name: "index", title: "Today", icon: icons.home },
    { name: "history", title: "History", icon: icons.history },
    { name: "nutrition", title: "Nutrition", icon: icons.nutrition },
    { name: "settings", title: "Settings", icon: icons.settings },
];

export const BODY_TYPES: BodyType[] = ["Lean", "Athletic", "Broad", "Prefer not to say"];

export const DAILY_TAGLINE = "A little stronger, daily.";

export const ROUTINES: Routine[] = [
    {
        id: "morning-mobility",
        title: "Morning mobility",
        tagline: "Your daily wake-up routine",
        description: "Loosen up your spine, hips and shoulders before the day begins.",
        minutes: 8,
        icon: icons.walk,
        exercises: [
            { id: "m1", name: "Cat-cow", hint: "Move with your breath", duration: "45 sec", done: true },
            { id: "m2", name: "Hip circles", hint: "Slow and wide", duration: "30 sec", done: true },
            { id: "m3", name: "Thoracic rotation", hint: "Follow your hand with your eyes", duration: "30 sec", done: true },
            { id: "m4", name: "World’s greatest stretch", hint: "Both sides", duration: "60 sec", done: true },
            { id: "m5", name: "Neck rolls", hint: "Keep your shoulders soft", duration: "30 sec", done: true },
            { id: "m6", name: "Shoulder openers", hint: "Reach long through the fingertips", duration: "30 sec", done: true },
        ],
    },
    {
        id: "planks",
        title: "Planks",
        tagline: "Your daily core routine",
        description: "Build a stronger core, one hold at a time.",
        minutes: 5,
        icon: icons.timer,
        exercises: [
            { id: "p1", name: "Forearm plank", hint: "Completed", duration: "30 sec", done: true },
            { id: "p2", name: "High plank", hint: "Completed", duration: "30 sec", done: true },
            { id: "p3", name: "Side plank · left", hint: "Stack your hips and feet", duration: "30 sec", done: false },
            { id: "p4", name: "Side plank · right", hint: "Keep your hips lifted", duration: "30 sec", done: false },
            { id: "p5", name: "Forearm plank hold", hint: "A steady finish", duration: "60 sec", done: false },
        ],
    },
];

// Demo history: the six days before today are already complete.
export const SEED_COMPLETED_DATES: string[] = Array.from({ length: 6 }, (_, i) =>
    dayjs().subtract(i + 1, "day").format("YYYY-MM-DD"),
);

export const SCAN_RESULT = {
    title: "Chicken & rice bowl",
    subtitle: "Grilled chicken, brown rice & vegetables",
    kcal: 510,
    protein: 38,
    carbs: 49,
    fat: 18,
    extras: [
        { label: "Fiber", value: 7, unit: "g" },
        { label: "Sugars", value: 6, unit: "g" },
        { label: "Sodium", value: 620, unit: "mg" },
        { label: "Sat. fat", value: 3, unit: "g" },
    ],
};

export const SERVINGS = [
    { label: "½ bowl · about 175 g", factor: 0.5 },
    { label: "1 bowl · about 350 g", factor: 1 },
    { label: "1½ bowls · about 525 g", factor: 1.5 },
    { label: "2 bowls · about 700 g", factor: 2 },
];
