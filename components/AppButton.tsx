import { icons } from "@/constants/icons";
import type { IconKey } from "@/constants/icons";
import { Ionicons } from "@expo/vector-icons";
import clsx from "clsx";
import { Pressable, Text } from "react-native";

type Props = {
  label: string;
  onPress?: () => void;
  disabled?: boolean;
  icon?: IconKey | null;
  variant?: "primary" | "secondary" | "danger";
};

const AppButton = ({ label, onPress, disabled, icon = "arrow", variant = "primary" }: Props) => {
  if (variant === "secondary") {
    return (
      <Pressable className="button-secondary" onPress={onPress} disabled={disabled}>
        <Text className="button-secondary-text">{label}</Text>
      </Pressable>
    );
  }
  return (
    <Pressable
      className={clsx("button", variant === "danger" && "button-danger", disabled && "button-disabled")}
      onPress={onPress}
      disabled={disabled}
    >
      <Text className="button-text">{label}</Text>
      {icon ? <Ionicons name={icons[icon]} size={18} color="#fff" /> : null}
    </Pressable>
  );
};

export default AppButton;
