import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

export function Checkbox({ checked }: { checked: boolean }) {
  return (
    <View
      className={`h-6 w-6 items-center justify-center rounded-md border-2 ${
        checked ? "border-brand bg-brand" : "border-brand-soft bg-transparent"
      }`}
    >
      {checked ? <Ionicons name="checkmark" size={16} color="#fff" /> : null}
    </View>
  );
}
