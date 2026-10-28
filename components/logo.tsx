import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { colors } from "@/constants/theme";

export function Logo() {
  return (
    <View className="flex-row items-center gap-2">
      <Ionicons name="pulse" size={22} color={colors.brand} />
      <Text className="text-xl font-medium tracking-tight text-ink">exerstreak</Text>
    </View>
  );
}
