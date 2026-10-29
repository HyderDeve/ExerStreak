import type { Ionicons } from "@expo/vector-icons";
import type { ComponentProps } from "react";

type IconName = ComponentProps<typeof Ionicons>["name"];

declare global {
    interface AppTab {
        name: string;
        title: string;
        icon: IconName;
    }

    interface TabIconProps {
        focused: boolean;
        icon: IconName;
    }

    interface Exercise {
        id: string;
        name: string;
        hint: string;
        duration: string;
        done: boolean;
    }

    interface Routine {
        id: string;
        title: string;
        tagline: string;
        description: string;
        minutes: number;
        icon: IconName;
        exercises: Exercise[];
    }

    type WeightUnit = "kg" | "lb";
    type HeightUnit = "cm" | "ft / in";
    type BodyType = "Lean" | "Athletic" | "Broad" | "Prefer not to say";

    interface UserProfile {
        name: string;
        weight: string;
        weightUnit: WeightUnit;
        height: string;
        heightUnit: HeightUnit;
        age: string;
        bodyType: BodyType;
    }

    interface FoodEntry {
        id: string;
        name: string;
        kcal: number;
        protein: number;
        carbs: number;
        fat: number;
        loggedAt: string;
    }

    interface ListHeadingProps {
        title: string;
        meta?: string;
    }

    interface RoutineCardProps {
        routine: Routine;
        onPress: () => void;
    }

    interface ExerciseRowProps {
        exercise: Exercise;
        onPress: () => void;
    }

    interface StreakCardProps {
        streak: number;
        completedDates: string[];
        todayDone: boolean;
    }

    interface RoutineStore {
        routines: Routine[];
        completedDates: string[];
        toggleExercise: (routineId: string, exerciseId: string) => void;
        completeNext: (routineId: string) => void;
    }

    interface FoodStore {
        entries: FoodEntry[];
        addEntry: (entry: Omit<FoodEntry, "id" | "loggedAt">) => void;
    }

    /** Persisted to AsyncStorage (only `profile` is saved; `hasHydrated` is runtime-only). */
    interface ProfileStore {
        profile: UserProfile | null;
        hasHydrated: boolean;
        setProfile: (profile: UserProfile) => void;
        clearProfile: () => void;
    }
}

export {};
