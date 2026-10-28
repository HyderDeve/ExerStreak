import { Pressable, Text, View } from "react-native";

export function RadioCard({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      className={`h-12 w-[48.5%] flex-row items-center gap-2 rounded-xl border px-3 ${
        selected ? "border-brand bg-peach" : "border-line bg-white"
      }`}
    >
      <View
        className={`h-4 w-4 items-center justify-center rounded-full border ${
          selected ? "border-brand" : "border-brand-soft"
        }`}
      >
        {selected ? <View className="h-2 w-2 rounded-full bg-brand" /> : null}
      </View>
      <Text className="text-xs text-ink">{label}</Text>
    </Pressable>
  );
}
