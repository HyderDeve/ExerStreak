import { Pressable, Text, View } from "react-native";
import Checkbox from "@/components/Checkbox";

const ExerciseRow = ({ exercise, onPress }: ExerciseRowProps) => (
  <Pressable onPress={onPress} className="exercise-row" accessibilityRole="checkbox" accessibilityState={{ checked: exercise.done }}>
    <Checkbox checked={exercise.done} />
    <View className="exercise-copy">
      <Text className="exercise-name">{exercise.name}</Text>
      <Text className="exercise-hint">{exercise.hint}</Text>
    </View>
    <Text className="exercise-time">{exercise.duration}</Text>
  </Pressable>
);

export default ExerciseRow;
