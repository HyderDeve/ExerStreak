import { Text, View } from "react-native";
import MacroStat from "./MacroStat";

type Props = { kcal: number; protein: number; carbs: number; fat: number; note?: string };

const MacroSummary = ({ kcal, protein, carbs, fat, note }: Props) => (
  <View className="macro-card">
    <View className="macro-kcal-row">
      <View className="flex-row items-baseline">
        <Text className="macro-kcal">{Math.round(kcal)}</Text>
        <Text className="macro-kcal-unit">kcal</Text>
      </View>
      {note ? <Text className="macro-note">{note}</Text> : null}
    </View>
    <View className="macro-row">
      <MacroStat value={protein} label="Protein" />
      <MacroStat value={carbs} label="Carbs" />
      <MacroStat value={fat} label="Fat" />
    </View>
  </View>
);

export default MacroSummary;
