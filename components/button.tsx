import { Ionicons } from "@expo/vector-icons";
import { ComponentProps } from "react";
import { Pressable, Text } from "react-native";

type Props = {
  label: string;
  onPress?: () => void;
  icon?: ComponentProps<typeof Ionicons>["name"];
};

export function Button({ label, onPress, icon = "arrow-forward" }: Props) {
  return (
    <Pressable
      onPress={onPress}
      className="h-14 flex-row items-center justify-center gap-2 rounded-2xl bg-brand active:opacity-90"
    >
      <Text className="text-base font-semibold text-white">{label}</Text>
      <Ionicons name={icon} size={18} color="#fff" />
    </Pressable>
  );
}
