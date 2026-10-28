import { Feather, Ionicons } from "@expo/vector-icons";
import { ComponentProps } from "react";
import { Pressable, Text, View } from "react-native";
import { colors } from "@/constants/theme";

type Props = {
  title: string;
  meta: string;
  icon: ComponentProps<typeof Ionicons>["name"];
  done?: boolean;
  onPress?: () => void;
};

export function RoutineCard({ title, meta, icon, done, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center gap-4 rounded-2xl border border-line bg-white p-4 active:opacity-90"
    >
      <View className="h-11 w-11 items-center justify-center rounded-xl bg-peach">
        <Ionicons name={icon} size={20} color={colors.brand} />
      </View>
      <View className="flex-1">
        <Text className="text-base font-semibold text-ink">{title}</Text>
        <Text className="mt-0.5 text-xs text-body">{meta}</Text>
      </View>
      {done ? (
        <Text className="text-xs font-medium text-brand">Done</Text>
      ) : (
        <Feather name="arrow-up-right" size={18} color={colors.brand} />
      )}
    </Pressable>
  );
}
