import '@/global.css';

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppProvider } from "@/components/app-provider";
import { colors } from "@/constants/theme";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <StatusBar style="dark" />
        <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.cream } }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="planks" />
          <Stack.Screen name="food-scan" />
          <Stack.Screen name="onboarding" />
        </Stack>
      </AppProvider>
    </SafeAreaProvider>
  );
}
