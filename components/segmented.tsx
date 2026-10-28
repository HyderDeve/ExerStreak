import { Pressable, Text, View } from "react-native";

type Props<T extends string> = { options: readonly T[]; value: T; onChange: (v: T) => void };

export function Segmented<T extends string>({ options, value, onChange }: Props<T>) {
  return (
    <View className="mt-2 flex-row rounded-xl bg-peach p-1">
      {options.map((o) => {
        const active = o === value;
        return (
          <Pressable
            key={o}
            onPress={() => onChange(o)}
            className={`h-7 flex-1 items-center justify-center rounded-lg ${active ? "bg-white" : ""}`}
          >
            <Text className={`text-xs ${active ? "font-semibold text-brand" : "text-body"}`}>{o}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}
