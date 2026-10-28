import { Ionicons } from "@expo/vector-icons";
import { ComponentProps } from "react";
import { Pressable, Text, View } from "react-native";
import { useApp } from "@/components/app-provider";
import { Screen } from "@/components/screen";
import { router } from "expo-router";
import { colors } from "@/constants/theme";

function Row({ icon, label, hint, onPress }: { icon: ComponentProps<typeof Ionicons>["name"]; label: string; hint: string; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} className="flex-row items-center gap-4 rounded-2xl border border-line bg-white p-4 active:opacity-90">
      <View className="h-11 w-11 items-center justify-center rounded-xl bg-peach">
        <Ionicons name={icon} size={20} color={colors.brand} />
      </View>
      <View className="flex-1">
        <Text className="text-base font-semibold text-ink">{label}</Text>
        <Text className="mt-0.5 text-xs text-body">{hint}</Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color={colors.faint} />
    </Pressable>
  );
}

export default function Profile() {
  const { profile, foodLogCount } = useApp();
  return (
    <Screen tabbed>
      <View className="items-center">
        <View className="h-16 w-16 items-center justify-center rounded-full bg-peach">
          <Text className="text-2xl font-bold text-brand">{profile.name.charAt(0).toUpperCase()}</Text>
        </View>
        <Text className="mt-3 text-xl font-bold text-ink">{profile.name}</Text>
        <Text className="mt-1 text-xs text-body">
          {profile.weight} {profile.weightUnit} · {profile.height} {profile.heightUnit} · {profile.age} yrs
        </Text>
      </View>
      <View className="mt-8 gap-3">
        <Row icon="create-outline" label="Edit profile" hint="Weight, height, age and body type" onPress={() => router.push("/onboarding")} />
        <Row icon="scan-outline" label="Scan a meal" hint={`${foodLogCount} meals logged today`} onPress={() => router.push("/food-scan")} />
      </View>
    </Screen>
  );
}
