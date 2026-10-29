import { useProfileStore } from "@/lib/profileStore";

export const useProfile = () => {
    const profile = useProfileStore((s) => s.profile);
    const hasHydrated = useProfileStore((s) => s.hasHydrated);
    const saveProfile = useProfileStore((s) => s.setProfile);
    const clearProfile = useProfileStore((s) => s.clearProfile);

    return {
        profile,
        hasHydrated,
        onboarded: !!profile,
        saveProfile,
        clearProfile,
        displayName: profile?.name || "there",
    };
};
