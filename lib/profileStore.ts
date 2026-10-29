import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

/** Onboarding profile, saved on-device in AsyncStorage (no account or backend). */
export const useProfileStore = create<ProfileStore>()(
    persist(
        (set) => ({
            profile: null,
            hasHydrated: false,
            setProfile: (profile) => set({ profile }),
            clearProfile: () => set({ profile: null }),
        }),
        {
            name: "exerstreak-profile",
            storage: createJSONStorage(() => AsyncStorage),
            partialize: (state) => ({ profile: state.profile }),
            // Runs after the saved profile has been read (or the read failed) so screens can stop waiting.
            onRehydrateStorage: () => () => {
                useProfileStore.setState({ hasHydrated: true });
            },
        },
    ),
);
