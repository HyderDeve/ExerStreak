import clsx from "clsx";
import { Pressable, Text, View } from "react-native";

type Props<T extends string> = { options: readonly T[]; value: T; onChange: (value: T) => void };

const SegmentedControl = <T extends string,>({ options, value, onChange }: Props<T>) => {
  return (
    <View className="seg-track">
      {options.map((option) => {
        const active = option === value;
        return (
          <Pressable key={option} onPress={() => onChange(option)} className={clsx("seg-option", active && "seg-option-active")}>
            <Text className={clsx("seg-text", active && "seg-text-active")}>{option}</Text>
          </Pressable>
        );
      })}
    </View>
  );
};

export default SegmentedControl;
