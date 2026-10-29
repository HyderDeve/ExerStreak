import { ROUTINES, SEED_COMPLETED_DATES } from "@/constants/data";
import { dateKey } from "@/lib/utils";
import { create } from "zustand";

/** Keep `completedDates` in sync: today is in the list only while every routine is done. */
const syncToday = (routines: Routine[], dates: string[]) => {
    const today = dateKey();
    const allDone = routines.every((r) => r.exercises.every((e) => e.done));
    const rest = dates.filter((d) => d !== today);
    return allDone ? [...rest, today] : rest;
};

export const useRoutineStore = create<RoutineStore>((set) => ({
    routines: ROUTINES,
    completedDates: syncToday(ROUTINES, SEED_COMPLETED_DATES),

    toggleExercise: (routineId, exerciseId) =>
        set((state) => {
            const routines = state.routines.map((r) =>
                r.id !== routineId
                    ? r
                    : { ...r, exercises: r.exercises.map((e) => (e.id === exerciseId ? { ...e, done: !e.done } : e)) },
            );
            return { routines, completedDates: syncToday(routines, state.completedDates) };
        }),

    completeNext: (routineId) =>
        set((state) => {
            const routines = state.routines.map((r) => {
                if (r.id !== routineId) return r;
                const next = r.exercises.find((e) => !e.done);
                return next
                    ? { ...r, exercises: r.exercises.map((e) => (e.id === next.id ? { ...e, done: true } : e)) }
                    : r;
            });
            return { routines, completedDates: syncToday(routines, state.completedDates) };
        }),
}));
