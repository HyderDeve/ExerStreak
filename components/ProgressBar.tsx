import { View } from "react-native";

const ProgressBar = ({ value }: { value: number }) => (
  <View className="progress-track">
    <View className="progress-fill" style={{ width: `${Math.round(Math.min(Math.max(value, 0), 1) * 100)}%` }} />
  </View>
);

export default ProgressBar;
