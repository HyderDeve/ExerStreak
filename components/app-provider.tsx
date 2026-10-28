import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from "react";
import {
  BASE_STREAK,
  Exercise,
  INITIAL_PLANKS,
  INITIAL_PROFILE,
  Profile,
} from "@/constants/data";

type AppState = {
  planks: Exercise[];
  togglePlank: (id: string) => void;
  completeNextPlank: () => void;
  mobilityDone: boolean;
  profile: Profile;
  setProfile: (p: Profile) => void;
  streak: number;
  routinesDone: number;
  routinesTotal: number;
  allDone: boolean;
  foodLogCount: number;
  addToFoodLog: () => void;
};

const Ctx = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [planks, setPlanks] = useState(INITIAL_PLANKS);
  const [profile, setProfile] = useState(INITIAL_PROFILE);
  const [foodLogCount, setFoodLogCount] = useState(0);
  const mobilityDone = true;

  const togglePlank = useCallback((id: string) => {
    setPlanks((list) => list.map((e) => (e.id === id ? { ...e, done: !e.done } : e)));
  }, []);

  const completeNextPlank = useCallback(() => {
    setPlanks((list) => {
      const next = list.find((e) => !e.done);
      return next ? list.map((e) => (e.id === next.id ? { ...e, done: true } : e)) : list;
    });
  }, []);

  const value = useMemo<AppState>(() => {
    const planksDone = planks.every((e) => e.done);
    const routinesDone = (mobilityDone ? 1 : 0) + (planksDone ? 1 : 0);
    const allDone = routinesDone === 2;
    return {
      planks,
      togglePlank,
      completeNextPlank,
      mobilityDone,
      profile,
      setProfile,
      streak: BASE_STREAK + (allDone ? 1 : 0),
      routinesDone,
      routinesTotal: 2,
      allDone,
      foodLogCount,
      addToFoodLog: () => setFoodLogCount((n) => n + 1),
    };
  }, [planks, profile, foodLogCount, togglePlank, completeNextPlank]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useApp() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useApp must be used inside <AppProvider>");
  return ctx;
}
