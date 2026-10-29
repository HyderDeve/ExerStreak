import clsx from "clsx";
import { Pressable, Text, View } from "react-native";

const RadioCard = ({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) => (
  <Pressable onPress={onPress} className={clsx("radio-card", selected && "radio-card-active")}>
    <View className={clsx("radio-dot", selected && "radio-dot-active")}>
      {selected ? <View className="radio-dot-inner" /> : null}
    </View>
    <Text className="radio-text">{label}</Text>
  </Pressable>
);

export default RadioCard;
