import type { Href, useRouter } from "expo-router";

/** Navigate after Clerk finalizes a session (handles the web redirect URL case). */
export function goTo(router: ReturnType<typeof useRouter>, url: string) {
    if (url.startsWith("http")) {
        if (typeof window !== "undefined" && window.location) {
            window.location.href = url;
        } else {
            router.replace("/" as Href);
        }
        return;
    }
    router.replace(url as Href);
}
