import { useRoutineStore } from "@/lib/routineStore";
import { useEffect } from "react";
import { AppState } from "react-native";

/**
 * Resets routine progress when the local date changes — on launch, when the app
 * returns to the foreground, and while it stays open across midnight.
 */
export const useDailyReset = () => {
    useEffect(() => {
        const { resetIfNewDay } = useRoutineStore.getState();
        resetIfNewDay();

        // Cheap no-op unless the date changed (the store returns the same state).
        const interval = setInterval(resetIfNewDay, 60_000);
        const sub = AppState.addEventListener("change", (status) => {
            if (status === "active") resetIfNewDay();
        });

        return () => {
            clearInterval(interval);
            sub.remove();
        };
    }, []);
};
