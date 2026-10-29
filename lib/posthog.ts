import Constants from "expo-constants";
import PostHog from "posthog-react-native";

const projectToken = Constants.expoConfig?.extra?.posthogProjectToken as string | undefined;
const host = Constants.expoConfig?.extra?.posthogHost as string | undefined;

if (__DEV__ && (!projectToken || !host)) {
    console.warn(
        "[posthog] EXPO_PUBLIC_POSTHOG_PROJECT_TOKEN / EXPO_PUBLIC_POSTHOG_HOST are not set. Analytics are disabled.",
    );
}

export const posthog = projectToken && host ? new PostHog(projectToken, { host }) : null;
