import { icons } from "@/constants/icons";
import { colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

const Logo = () => (
  <View className="logo-row">
    <Ionicons name={icons.pulse} size={22} color={colors.primary} />
    <Text className="logo-text">Exerstreak</Text>
  </View>
);

export default Logo;
