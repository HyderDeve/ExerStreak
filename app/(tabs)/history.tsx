import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { useApp } from "@/components/app-provider";
import { Screen } from "@/components/screen";
import { colors } from "@/constants/theme";

export default function History() {
  const { streak } = useApp();
  const rows = Array.from({ length: streak }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return d.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" });
  });

  return (
    <Screen tabbed>
      <Text className="text-3xl font-bold tracking-tight text-ink">History</Text>
      <Text className="mt-1 text-sm text-body">Every day you showed up.</Text>
      <View className="mt-5 rounded-3xl bg-white px-4">
        {rows.map((r, i) => (
          <View key={r} className={`flex-row items-center gap-3 py-4 ${i < rows.length - 1 ? "border-b border-line" : ""}`}>
            <View className="h-7 w-7 items-center justify-center rounded-full bg-brand">
              <Ionicons name="checkmark" size={15} color="#fff" />
            </View>
            <Text className="flex-1 text-sm font-medium text-ink">{r}</Text>
            <Ionicons name="flame-outline" size={16} color={colors.brand} />
          </View>
        ))}
      </View>
    </Screen>
  );
}
