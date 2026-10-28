import { Text, TextInput, View } from "react-native";

type Props = {
  label: string;
  value: string;
  onChangeText: (v: string) => void;
  unit?: string;
  keyboardType?: "default" | "numeric";
};

export function Field({ label, value, onChangeText, unit, keyboardType = "default" }: Props) {
  return (
    <View className="flex-1">
      <Text className="mb-2 text-sm font-medium text-ink">{label}</Text>
      <View className="h-14 flex-row items-center rounded-2xl border border-line bg-white px-4">
        <TextInput
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          className="flex-1 text-base text-ink"
          placeholderTextColor="#c48466"
        />
        {unit ? <Text className="text-sm text-body">{unit}</Text> : null}
      </View>
    </View>
  );
}
