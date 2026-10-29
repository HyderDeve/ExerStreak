import "@/global.css";
import ListHeading from "@/components/ListHeading";
import Logo from "@/components/Logo";
import ProgressBar from "@/components/ProgressBar";
import RoutineCard from "@/components/RoutineCard";
import StreakCard from "@/components/StreakCard";
import { DAILY_TAGLINE } from "@/constants/data";
import { useRoutineStore } from "@/lib/routineStore";
import { useProfile } from "@/lib/useProfile";
import { computeStreak, formatLongDate, initialOf, routineProgress } from "@/lib/utils";
import { useRouter } from "expo-router";
import { styled } from "nativewind";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

const Today = () => {
  const router = useRouter();
  const { displayName } = useProfile();
  const routines = useRoutineStore((s) => s.routines);
  const completedDates = useRoutineStore((s) => s.completedDates);

  const streak = computeStreak(completedDates);
  const doneCount = routines.filter((r) => routineProgress(r).complete).length;
  const todayDone = doneCount === routines.length;

  return (
    <SafeAreaView className="screen">
      <FlatList
        data={routines}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-30"
        ItemSeparatorComponent={() => <View className="h-3" />}
        renderItem={({ item }) => (
          <RoutineCard
            routine={item}
            onPress={() => router.push({ pathname: "/routines/[id]", params: { id: item.id } })}
          />
        )}
        ListHeaderComponent={
          <>
            <View className="home-header">
              <Logo />
              <View className="home-avatar">
                <Text className="home-avatar-text">{initialOf(displayName)}</Text>
              </View>
            </View>

            <Text className="home-date">{formatLongDate()}</Text>
            <Text className="home-title">{DAILY_TAGLINE}</Text>

            <StreakCard streak={streak} completedDates={completedDates} todayDone={todayDone} />

            <ListHeading title="Today’s routines" meta={`${doneCount} of ${routines.length} complete`} />
            <View className="mb-4">
              <ProgressBar value={routines.length ? doneCount / routines.length : 0} />
            </View>
          </>
        }
        ListFooterComponent={<Text className="footer-note mt-6">• Small steps. Stronger habits.</Text>}
      />
    </SafeAreaView>
  );
};

export default Today;
