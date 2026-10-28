import { Text, View } from "react-native";

export function Macro({ value, label }: { value: number; label: string }) {
  return (
    <View>
      <Text className="text-2xl font-bold text-ink">{value} g</Text>
      <Text className="text-xs text-body">{label}</Text>
    </View>
  );
}
