export type Exercise = {
  id: string;
  name: string;
  hint: string;
  duration: string;
  done: boolean;
};

export type BodyType = "Lean" | "Athletic" | "Broad" | "Prefer not to say";

export type Profile = {
  name: string;
  weight: string;
  weightUnit: "kg" | "lb";
  height: string;
  heightUnit: "cm" | "ft / in";
  age: string;
  bodyType: BodyType;
};

export const BODY_TYPES: BodyType[] = ["Lean", "Athletic", "Broad", "Prefer not to say"];

export const INITIAL_PLANKS: Exercise[] = [
  { id: "p1", name: "Forearm plank", hint: "Completed", duration: "30 sec", done: true },
  { id: "p2", name: "High plank", hint: "Completed", duration: "30 sec", done: true },
  { id: "p3", name: "Side plank · left", hint: "Stack your hips and feet", duration: "30 sec", done: false },
  { id: "p4", name: "Side plank · right", hint: "Keep your hips lifted", duration: "30 sec", done: false },
  { id: "p5", name: "Forearm plank hold", hint: "A steady finish", duration: "60 sec", done: false },
];

export const INITIAL_PROFILE: Profile = {
  name: "Alex Morgan",
  weight: "68",
  weightUnit: "kg",
  height: "172",
  heightUnit: "cm",
  age: "28",
  bodyType: "Prefer not to say",
};

export const BASE_STREAK = 6;

export const SCAN_RESULT = {
  title: "Chicken & rice bowl",
  subtitle: "Grilled chicken, brown rice & vegetables",
  image:
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80",
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
