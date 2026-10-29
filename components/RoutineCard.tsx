import { icons } from "@/constants/icons";
import { colors } from "@/constants/theme";
import { routineProgress } from "@/lib/utils";
import { Feather, Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

const RoutineCard = ({ routine, onPress }: RoutineCardProps) => {
  const { done, total, complete } = routineProgress(routine);
  const partial = done > 0 && !complete;
  const meta = partial
    ? `${done} of ${total} complete · ${routine.minutes} min`
    : `${total} exercises · ${routine.minutes} min`;

  return (
    <Pressable onPress={onPress} className="routine-card">
      <View className="routine-icon">
        <Ionicons name={complete ? icons.check : routine.icon} size={20} color={colors.primary} />
      </View>
      <View className="routine-copy">
        <Text className="routine-title" numberOfLines={1}>{routine.title}</Text>
        <Text className="routine-meta" numberOfLines={1}>{meta}</Text>
      </View>
      {complete ? (
        <Text className="routine-status">Done</Text>
      ) : (
        <Feather name="arrow-up-right" size={18} color={colors.primary} />
      )}
    </Pressable>
  );
};

export default RoutineCard;
