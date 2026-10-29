import dayjs from "dayjs";
import { create } from "zustand";

export const useFoodStore = create<FoodStore>((set) => ({
    entries: [],
    addEntry: (entry) =>
        set((state) => ({
            entries: [{ ...entry, id: `meal-${Date.now()}`, loggedAt: dayjs().toISOString() }, ...state.entries],
        })),
}));
