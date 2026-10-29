import { icons } from "@/constants/icons";
import { colors } from "@/constants/theme";
import { useRoutineStore } from "@/lib/routineStore";
import { computeStreak, longestStreak } from "@/lib/utils";
import { Ionicons } from "@expo/vector-icons";
import dayjs from "dayjs";
import { styled } from "nativewind";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

const Stat = ({ value, label }: { value: number; label: string }) => (
  <View className="flex-1 rounded-2xl bg-muted p-4">
    <Text className="macro-value">{value}</Text>
    <Text className="macro-label">{label}</Text>
  </View>
);

const History = () => {
  const completedDates = useRoutineStore((s) => s.completedDates);
  const sorted = [...new Set(completedDates)].sort().reverse();

  return (
    <SafeAreaView className="screen">
      <FlatList
        data={sorted}
        keyExtractor={(item) => item}
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-30"
        ListHeaderComponent={
          <View className="mb-4">
            <Text className="screen-title">History</Text>
            <Text className="screen-subtitle">Every day you showed up.</Text>
            <View className="row-gap mt-5">
              <Stat value={computeStreak(completedDates)} label="Current streak" />
              <Stat value={longestStreak(completedDates)} label="Longest streak" />
              <Stat value={sorted.length} label="Total days" />
            </View>
          </View>
        }
        ItemSeparatorComponent={() => <View className="h-2" />}
        ListEmptyComponent={<Text className="empty-state">No completed days yet.</Text>}
        renderItem={({ item }) => (
          <View className="meal-card">
            <View className="size-7 items-center justify-center rounded-full bg-primary">
              <Ionicons name={icons.check} size={15} color="#fff" />
            </View>
            <Text className="routine-title flex-1">{dayjs(item).format("dddd, MMM D")}</Text>
            <Ionicons name={icons.flame} size={16} color={colors.primary} />
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default History;
