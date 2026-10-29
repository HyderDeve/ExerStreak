import { icons } from "@/constants/icons";
import { colors } from "@/constants/theme";
import { dateKey, lastDays } from "@/lib/utils";
import { Ionicons } from "@expo/vector-icons";
import clsx from "clsx";
import dayjs from "dayjs";
import { Text, View } from "react-native";

const LETTERS = ["S", "M", "T", "W", "T", "F", "S"];

const StreakCard = ({ streak, completedDates, todayDone }: StreakCardProps) => (
  <View className="streak-card">
    <View className="streak-top">
      <View>
        <Text className="streak-label">Current streak</Text>
        <View className="streak-count-row">
          <Text className="streak-count">{streak}</Text>
          <Text className="streak-unit">{streak === 1 ? "day" : "days"}</Text>
        </View>
      </View>
      <View className="streak-flame">
        <Ionicons name={icons.flame} size={26} color={colors.primary} />
      </View>
    </View>

    <View className="streak-days">
      {lastDays(7).map((day) => {
        const done = completedDates.includes(dateKey(day));
        const today = day.isSame(dayjs(), "day");
        return (
          <View key={day.format("YYYY-MM-DD")} className="streak-day">
            <Text className="streak-day-letter">{LETTERS[day.day()]}</Text>
            <View className={clsx("streak-dot", done && "streak-dot-done", !done && today && "streak-dot-today")}>
              {done ? (
                <Ionicons name={icons.check} size={16} color="#fff" />
              ) : (
                <Text className="streak-dot-text">{day.date()}</Text>
              )}
            </View>
          </View>
        );
      })}
    </View>

    <Text className="streak-hint">
      {todayDone ? "Streak extended. See you tomorrow." : `Finish today’s routines to make it ${streak + 1}.`}
    </Text>
  </View>
);

export default StreakCard;
