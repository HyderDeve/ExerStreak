import { Text, View } from "react-native";

const MacroStat = ({ value, label }: { value: number; label: string }) => (
  <View>
    <Text className="macro-value">{Math.round(value)} g</Text>
    <Text className="macro-label">{label}</Text>
  </View>
);

export default MacroStat;
