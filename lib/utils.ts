import dayjs, { type ConfigType } from "dayjs";

export const dateKey = (value: ConfigType = dayjs()): string => dayjs(value).format("YYYY-MM-DD");

/** Consecutive completed days ending today (or yesterday, if today isn't done yet). */
export const computeStreak = (dates: string[]): number => {
    const set = new Set(dates);
    let cursor = dayjs();
    if (!set.has(dateKey(cursor))) cursor = cursor.subtract(1, "day");
    let count = 0;
    while (set.has(dateKey(cursor))) {
        count += 1;
        cursor = cursor.subtract(1, "day");
    }
    return count;
};

export const longestStreak = (dates: string[]): number => {
    const sorted = [...new Set(dates)].sort();
    let best = 0;
    let run = 0;
    let prev: dayjs.Dayjs | null = null;
    for (const d of sorted) {
        const current = dayjs(d);
        run = prev && current.diff(prev, "day") === 1 ? run + 1 : 1;
        best = Math.max(best, run);
        prev = current;
    }
    return best;
};

export const lastDays = (count = 7) =>
    Array.from({ length: count }, (_, i) => dayjs().subtract(count - 1 - i, "day"));

export const routineProgress = (routine: Routine) => {
    const total = routine.exercises.length;
    const done = routine.exercises.filter((e) => e.done).length;
    return { done, total, ratio: total === 0 ? 0 : done / total, complete: total > 0 && done === total };
};

export const initialOf = (name?: string | null) => (name?.trim().charAt(0) || "?").toUpperCase();

export const formatKcal = (value: number) => `${Math.round(value)} kcal`;

export const formatLongDate = (value: ConfigType = dayjs()) => dayjs(value).format("dddd, MMMM D");
