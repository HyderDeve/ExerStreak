import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { useApp } from "@/components/app-provider";
import { Button } from "@/components/button";
import ExerciseRow  from "@/components/ExerciseRow";
import  ProgressBar from "@/components/ProgressBar";
import { Screen } from "@/components/screen";
import { colors } from "@/constants/theme";

export default function Planks() {
  const { planks, togglePlank, completeNextPlank, streak } = useApp();
  const done = planks.filter((p) => p.done).length;
  const finished = done === planks.length;

  return (
    <Screen
      footer={
        <>
          <Button
            label={finished ? "Back to today" : "Continue routine"}
            onPress={finished ? () => router.back() : completeNextPlank}
          />
          <Text className="mt-3 text-center text-xs text-body">
            {finished ? "Routine complete. Nice work." : `Complete all ${planks.length} to finish today’s last routine.`}
          </Text>
        </>
      }
    >
      <View className="flex-row items-center justify-between">
        <Pressable onPress={() => router.back()} className="flex-row items-center gap-1">
          <Ionicons name="chevron-back" size={18} color={colors.ink} />
          <Text className="text-sm text-ink">Today</Text>
        </Pressable>
        <View className="flex-row items-center gap-1 rounded-full bg-peach px-3 py-1.5">
          <Ionicons name="flame-outline" size={14} color={colors.brand} />
          <Text className="text-xs font-medium text-brand">{streak} days</Text>
        </View>
      </View>

      <Text className="mt-6 text-xs text-body">YOUR DAILY CORE ROUTINE</Text>
      <Text className="mt-1 text-4xl font-bold tracking-tight text-ink">Planks</Text>
      <Text className="mt-2 text-sm text-body">Build a stronger core, one hold at a time.</Text>
      <View className="mt-2 flex-row items-center gap-1.5">
        <Ionicons name="timer-outline" size={13} color={colors.body} />
        <Text className="text-xs text-body">5 min with rests · {planks.length} exercises</Text>
      </View>

      <View className="mt-5 rounded-2xl bg-peach p-4">
        <View className="mb-3 flex-row items-center justify-between">
          <Text className="text-sm font-semibold text-brand">{done} of {planks.length} complete</Text>
          <Text className="text-xs text-brand">{planks.length - done} to go</Text>
        </View>
        <ProgressBar value={done / planks.length} track="bg-peach-deep" />
      </View>

      <View className="mt-6 flex-row items-center justify-between">
        <Text className="text-lg font-bold text-ink">Your exercises</Text>
        <Text className="text-xs text-body">Check off as you go</Text>
      </View>
      <View>
        {planks.map((p) => (
          <ExerciseRow key={p.id} item={p} onPress={() => togglePlank(p.id)} />
        ))}
      </View>
    </Screen>
  );
}
