import { icons } from "@/constants/icons";
import { Ionicons } from "@expo/vector-icons";
import clsx from "clsx";
import { View } from "react-native";

const Checkbox = ({ checked }: { checked: boolean }) => (
  <View className={clsx("checkbox", checked && "checkbox-checked")}>
    {checked ? <Ionicons name={icons.check} size={16} color="#fff" /> : null}
  </View>
);

export default Checkbox;
