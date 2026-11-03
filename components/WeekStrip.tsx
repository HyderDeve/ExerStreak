import { icons } from "@/constants/icons";
import { dateKey } from "@/lib/utils";
import { Ionicons } from "@expo/vector-icons";
import clsx from "clsx";
import dayjs from "dayjs";
import { Text, View } from "react-native";

const LETTERS = ["M", "T", "W", "T", "F", "S", "S"];

const WeekStrip = ({ completedDates, todayDone }: WeekStripProps) => {
  const today = dayjs();
  const monday = today.subtract((today.day() + 6) % 7, "day");
  const days = Array.from({ length: 7 }, (_, i) => monday.add(i, "day"));

  return (
    <View className="week-card">
      <View className="week-head">
        <Text className="week-title">This week</Text>
        <Text className="week-range">
          {days[0].format("MMM D")} – {days[6].format("MMM D")}
        </Text>
      </View>

      <View className="week-days">
        {days.map((day, i) => {
          const isToday = day.isSame(today, "day");
          const done = completedDates.includes(dateKey(day));
          const inProgress = isToday && !done;

          return (
            <View key={day.format("YYYY-MM-DD")} className="week-day">
              <Text className={clsx("week-letter", isToday && "week-letter-today")}>{LETTERS[i]}</Text>
              <View className={clsx("week-dot", done && "week-dot-done", inProgress && "week-dot-today")}>
                {done ? (
                  <Ionicons name={icons.check} size={18} color="#fff" />
                ) : (
                  <View className={clsx("week-pip", inProgress && "week-pip-today")} />
                )}
              </View>
            </View>
          );
        })}
      </View>

      <Text className="week-caption">{todayDone ? "Today is complete" : "Today is still in progress"}</Text>
    </View>
  );
};

export default WeekStrip;
