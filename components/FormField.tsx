import { colors } from "@/constants/theme";
import clsx from "clsx";
import { Text, TextInput, type TextInputProps, View } from "react-native";

type Props = TextInputProps & {
  label: string;
  unit?: string;
  error?: string | false | null;
};

const FormField = ({ label, unit, error, ...input }: Props) => (
  <View className="field flex-1">
    <Text className="field-label">{label}</Text>
    <View className={clsx("field-box", !!error && "field-box-error")}>
      <TextInput
        className="field-input"
        placeholderTextColor={colors.faint}
        selectionColor={colors.primary}
        {...input}
      />
      {unit ? <Text className="field-unit">{unit}</Text> : null}
    </View>
    {error ? <Text className="field-error">{error}</Text> : null}
  </View>
);

export default FormField;
