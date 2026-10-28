import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { colors } from "@/constants/theme";

const LETTERS = ["S", "M", "T", "W", "T", "F", "S"];

/** Last 7 days ending today. Past days are filled; today is filled only once finished. */
function lastSevenDays() {
  const today = new Date();
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - (6 - i));
    return { letter: LETTERS[d.getDay()], date: d.getDate(), isToday: i === 6 };
  });
}

export function StreakCard({ streak, todayDone }: { streak: number; todayDone: boolean }) {
  const days = lastSevenDays();
  return (
    <View className="rounded-3xl bg-peach p-5">
      <View className="flex-row items-start justify-between">
        <View>
          <Text className="text-xs font-medium text-brand">CURRENT STREAK</Text>
          <View className="mt-1 flex-row items-baseline gap-2">
            <Text className="text-5xl font-bold text-ink">{streak}</Text>
            <Text className="text-xl text-body">days</Text>
          </View>
        </View>
        <View className="h-14 w-14 items-center justify-center rounded-full bg-cream">
          <Ionicons name="flame-outline" size={26} color={colors.brand} />
        </View>
      </View>

      <View className="mt-5 flex-row justify-between">
        {days.map((d, i) => {
          const filled = !d.isToday || todayDone;
          return (
            <View key={i} className="items-center gap-2">
              <Text className="text-[11px] text-body">{d.letter}</Text>
              <View
                className={`h-8 w-8 items-center justify-center rounded-full ${
                  filled ? "bg-brand" : "border border-brand bg-cream"
                }`}
              >
                {filled ? (
                  <Ionicons name="checkmark" size={16} color="#fff" />
                ) : (
                  <Text className="text-[11px] font-medium text-brand">{d.date}</Text>
                )}
              </View>
            </View>
          );
        })}
      </View>

      <Text className="mt-4 text-xs text-brand">
        {todayDone ? "Streak extended. See you tomorrow." : `Finish today’s routines to make it ${streak + 1}.`}
      </Text>
    </View>
  );
}
