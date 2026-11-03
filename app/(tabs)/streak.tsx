import AppButton from "@/components/AppButton";
import FlameIllustration from "@/components/FlameIllustration";
import Logo from "@/components/logo";
import WeekStrip from "@/components/WeekStrip";
import { useRoutineStore } from "@/lib/routineStore";
import { useProfile } from "@/lib/useProfile";
import { computeStreak, initialOf, routineProgress } from "@/lib/utils";
import { useRouter } from "expo-router";
import { styled } from "nativewind";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

const Streak = () => {
  const router = useRouter();
  const { displayName } = useProfile();
  const routines = useRoutineStore((s) => s.routines);
  const completedDates = useRoutineStore((s) => s.completedDates);

  const streak = computeStreak(completedDates);
  const doneCount = routines.filter((r) => routineProgress(r).complete).length;
  const todayDone = doneCount === routines.length;

  return (
    <SafeAreaView className="screen">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="pb-30 screen-body">
        <View className="home-header">
          <Logo />
          <View className="home-avatar">
            <Text className="home-avatar-text">{initialOf(displayName)}</Text>
          </View>
        </View>

        <Text className="detail-title mt-4">Your streak</Text>

        <View className="streak-hero">
          <FlameIllustration size={210} />
          <View className="streak-count-row">
            <Text className="streak-count">{streak}</Text>
            <Text className="streak-unit">day streak</Text>
          </View>
          <Text className="streak-headline">{todayDone ? "Spark extended." : "Keep your spark going."}</Text>
          <Text className="streak-sub">
            {todayDone ? "Nice work. See you tomorrow." : "Finish today’s routines to keep it alive."}
          </Text>
        </View>

        <WeekStrip completedDates={completedDates} todayDone={todayDone} />

        <Text className="footer-note mb-4 mt-5">
          {doneCount} of {routines.length} routines complete today
        </Text>
        <AppButton label="Back to today’s routines" onPress={() => router.navigate("/(tabs)")} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Streak;
