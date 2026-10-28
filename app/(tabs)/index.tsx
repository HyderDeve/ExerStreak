import { router } from "expo-router";
import { Text, View } from "react-native";
import { useApp } from "@/components/app-provider";
import { Logo } from "@/components/logo";
import { ProgressBar } from "@/components/progress-bar";
import { RoutineCard } from "@/components/routine-card";
import { Screen } from "@/components/screen";
import { StreakCard } from "@/components/streak-card";

export default function Today() {
  const { profile, streak, planks, routinesDone, routinesTotal, allDone, mobilityDone } = useApp();
  const planksDone = planks.filter((p) => p.done).length;
  const date = new Date()
    .toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })
    .toUpperCase();

  return (
    <Screen tabbed>
      <View className="flex-row items-center justify-between">
        <Logo />
        <View className="h-8 w-8 items-center justify-center rounded-full bg-peach">
          <Text className="text-xs font-semibold text-brand">{profile.name.charAt(0).toUpperCase()}</Text>
        </View>
      </View>

      <Text className="mt-6 text-xs text-body">{date}</Text>
      <Text className="mt-1 text-3xl font-bold tracking-tight text-ink">A little stronger, daily.</Text>

      <View className="mt-5">
        <StreakCard streak={streak} todayDone={allDone} />
      </View>

      <View className="mt-7 flex-row items-center justify-between">
        <Text className="text-lg font-bold text-ink">Today’s routines</Text>
        <Text className="text-xs text-body">
          {routinesDone} of {routinesTotal} complete
        </Text>
      </View>
      <View className="mt-3">
        <ProgressBar value={routinesDone / routinesTotal} />
      </View>

      <View className="mt-4 gap-3">
        <RoutineCard title="Morning mobility" meta="6 exercises · 8 min" icon="checkmark" done={mobilityDone} />
        <RoutineCard
          title="Planks"
          meta={`${planksDone} of ${planks.length} complete · 5 min`}
          icon="timer-outline"
          done={allDone}
          onPress={() => router.push("/planks")}
        />
      </View>

      <Text className="mt-6 text-center text-xs text-body">• Small steps. Stronger habits.</Text>
    </Screen>
  );
}
