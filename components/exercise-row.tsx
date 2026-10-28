import { Pressable, Text, View } from "react-native";
import { Exercise } from "@/constants/data";
import { Checkbox } from "./checkbox";

export function ExerciseRow({ item, onPress }: { item: Exercise; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} className="flex-row items-center gap-3 border-b border-line py-4">
      <Checkbox checked={item.done} />
      <View className="flex-1">
        <Text className="text-base font-medium text-ink">{item.name}</Text>
        <Text className="mt-0.5 text-xs text-body">{item.hint}</Text>
      </View>
      <Text className="text-sm font-medium text-ink">{item.duration}</Text>
    </Pressable>
  );
}
