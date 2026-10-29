import AppButton from "@/components/AppButton";
import ExerciseRow from "@/components/ExerciseRow";
import ListHeading from "@/components/ListHeading";
import ProgressBar from "@/components/ProgressBar";
import { icons } from "@/constants/icons";
import { colors } from "@/constants/theme";
import { useRoutineStore } from "@/lib/routineStore";
import { computeStreak, routineProgress } from "@/lib/utils";
import { Ionicons } from "@expo/vector-icons";
import { Redirect, useLocalSearchParams, useRouter } from "expo-router";
import { styled } from "nativewind";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

const RoutineDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const routine = useRoutineStore((s) => s.routines.find((r) => r.id === id));
  const completedDates = useRoutineStore((s) => s.completedDates);
  const toggleExercise = useRoutineStore((s) => s.toggleExercise);
  const completeNext = useRoutineStore((s) => s.completeNext);

  if (!routine) return <Redirect href="/(tabs)" />;

  const { done, total, ratio, complete } = routineProgress(routine);
  const streak = computeStreak(completedDates);

  return (
    <SafeAreaView className="screen">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="pb-6">
        <View className="flex-row items-center justify-between">
          <Pressable onPress={() => router.back()} className="back-row">
            <Ionicons name={icons.back} size={18} color={colors.foreground} />
            <Text className="back-text">Today</Text>
          </Pressable>
          <View className="pill">
            <Ionicons name={icons.flame} size={14} color={colors.primary} />
            <Text className="pill-text">{streak} {streak === 1 ? "day" : "days"}</Text>
          </View>
        </View>

        <Text className="eyebrow mt-6">{routine.tagline}</Text>
        <Text className="detail-title">{routine.title}</Text>
        <Text className="detail-copy">{routine.description}</Text>
        <View className="detail-meta">
          <Ionicons name={icons.timer} size={13} color={colors.mutedForeground} />
          <Text className="detail-meta-text">{routine.minutes} min with rests · {total} exercises</Text>
        </View>

        <View className="progress-card">
          <View className="progress-card-row">
            <Text className="progress-card-title">{done} of {total} complete</Text>
            <Text className="list-meta text-primary">{total - done} to go</Text>
          </View>
          <ProgressBar value={ratio} />
        </View>

        <View className="mt-6">
          <ListHeading title="Your exercises" meta="Check off as you go" />
        </View>
        {routine.exercises.map((exercise) => (
          <ExerciseRow
            key={exercise.id}
            exercise={exercise}
            onPress={() => toggleExercise(routine.id, exercise.id)}
          />
        ))}
      </ScrollView>

      <View className="pb-2 pt-2">
        <AppButton
          label={complete ? "Back to today" : "Continue routine"}
          onPress={() => {
            if (complete) {
              router.back();
              return;
            }
            completeNext(routine.id);
          }}
        />
        <Text className="footer-note">
          {complete ? "Routine complete. Nice work." : `Complete all ${total} to finish today’s last routine.`}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default RoutineDetails;
