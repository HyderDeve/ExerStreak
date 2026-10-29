import AddMealModal from "@/components/AddMealModal";
import AppButton from "@/components/AppButton";
import ListHeading from "@/components/ListHeading";
import MacroSummary from "@/components/MacroSummary";
import { useFoodStore } from "@/lib/foodStore";
import dayjs from "dayjs";
import { useRouter } from "expo-router";
import { styled } from "nativewind";
import { useState } from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

const Nutrition = () => {
  const router = useRouter();
  const entries = useFoodStore((s) => s.entries);
  const [modalVisible, setModalVisible] = useState(false);

  const today = entries.filter((e) => dayjs(e.loggedAt).isSame(dayjs(), "day"));
  const sum = (key: "kcal" | "protein" | "carbs" | "fat") => today.reduce((acc, e) => acc + e[key], 0);

  return (
    <SafeAreaView className="screen">
      <FlatList
        data={today}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-30"
        ItemSeparatorComponent={() => <View className="h-3" />}
        ListHeaderComponent={
          <View>
            <Text className="screen-title">Nutrition</Text>
            <Text className="screen-subtitle">Fuel the habit.</Text>

            <View className="mt-5">
              <MacroSummary kcal={sum("kcal")} protein={sum("protein")} carbs={sum("carbs")} fat={sum("fat")} note="Today’s total" />
            </View>

            <View className="mt-4 gap-3">
              <AppButton label="Scan a meal" icon="scan" onPress={() => router.push("/food-scan")} />
              <AppButton label="Add manually" variant="secondary" onPress={() => setModalVisible(true)} />
            </View>

            <View className="mt-4">
              <ListHeading title="Food log" meta={`${today.length} ${today.length === 1 ? "meal" : "meals"}`} />
            </View>
          </View>
        }
        ListEmptyComponent={<Text className="empty-state">Nothing logged yet today.</Text>}
        renderItem={({ item }) => (
          <View className="meal-card">
            <View className="routine-copy">
              <Text className="routine-title" numberOfLines={1}>{item.name}</Text>
              <Text className="routine-meta">
                {dayjs(item.loggedAt).format("h:mm A")} · P {Math.round(item.protein)}g · C {Math.round(item.carbs)}g · F {Math.round(item.fat)}g
              </Text>
            </View>
            <Text className="routine-status">{Math.round(item.kcal)} kcal</Text>
          </View>
        )}
      />
      <AddMealModal visible={modalVisible} onClose={() => setModalVisible(false)} />
    </SafeAreaView>
  );
};

export default Nutrition;
