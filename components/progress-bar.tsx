import { View } from "react-native";

export function ProgressBar({ value, track = "bg-peach-deep" }: { value: number; track?: string }) {
  return (
    <View className={`h-1.5 overflow-hidden rounded-full ${track}`}>
      <View
        className="h-full rounded-full bg-brand"
        style={{ width: `${Math.round(Math.min(Math.max(value, 0), 1) * 100)}%` }}
      />
    </View>
  );
}
