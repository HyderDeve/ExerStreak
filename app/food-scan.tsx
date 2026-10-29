import AppButton from "@/components/AppButton";
import MacroSummary from "@/components/MacroSummary";
import { SCAN_RESULT as R, SERVINGS } from "@/constants/data";
import { icons } from "@/constants/icons";
import images from "@/constants/images";
import { colors } from "@/constants/theme";
import { useFoodStore } from "@/lib/foodStore";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { styled } from "nativewind";
import { useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

const FoodScan = () => {
  const router = useRouter();
  const addEntry = useFoodStore((s) => s.addEntry);
  const [servingIndex, setServingIndex] = useState(1);
  const serving = SERVINGS[servingIndex];
  const f = serving.factor;

  const handleAdd = () => {
    addEntry({
      name: R.title,
      kcal: R.kcal * f,
      protein: R.protein * f,
      carbs: R.carbs * f,
      fat: R.fat * f,
    });
    router.back();
  };

  return (
    <SafeAreaView className="screen">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="pb-6">
        <View className="flex-row items-center justify-between">
          <Pressable onPress={() => router.back()} className="back-row">
            <Ionicons name={icons.back} size={18} color={colors.foreground} />
            <Text className="back-text">Back</Text>
          </Pressable>
          <Text className="routine-title">Food scan</Text>
          <Ionicons name={icons.more} size={20} color={colors.foreground} />
        </View>

        <View className="scan-hero">
          <Image source={images.sampleMeal} style={{ width: "100%", height: "100%" }} resizeMode="cover" />
          <View className="absolute inset-x-0 bottom-3 items-center">
            <View className="scan-badge">
              <Ionicons name={icons.check} size={12} color="#fff" />
              <Text className="scan-badge-text">Scan complete</Text>
            </View>
          </View>
        </View>

        <View className="mt-4 flex-row items-start justify-between">
          <View className="flex-1">
            <Text className="list-title">{R.title}</Text>
            <Text className="routine-meta">{R.subtitle}</Text>
          </View>
          <View className="routine-icon size-9">
            <Ionicons name={icons.scan} size={18} color={colors.primary} />
          </View>
        </View>

        <Pressable className="serving-box" onPress={() => setServingIndex((i) => (i + 1) % SERVINGS.length)}>
          <View>
            <Text className="list-meta">Serving amount</Text>
            <Text className="info-value">{serving.label}</Text>
          </View>
          <View className="flex-row items-center gap-1">
            <Text className="routine-status">Adjust</Text>
            <Ionicons name={icons.down} size={14} color={colors.primary} />
          </View>
        </Pressable>

        <View className="mt-3">
          <MacroSummary
            kcal={R.kcal * f}
            protein={R.protein * f}
            carbs={R.carbs * f}
            fat={R.fat * f}
            note="Estimated from scan"
          />
        </View>

        <Text className="field-label mt-5">Additional nutrients</Text>
        <View className="nutrient-grid">
          {R.extras.map((e) => (
            <View key={e.label}>
              <Text className="list-meta">{e.label}</Text>
              <Text className="info-value">{Math.round(e.value * f)} {e.unit}</Text>
            </View>
          ))}
        </View>
        <Text className="list-meta mt-4 leading-4">
          Scan estimates may vary with portions and ingredients. Review your meal before adding it.
        </Text>
      </ScrollView>

      <View className="pb-2 pt-2">
        <AppButton label="Add to food log" icon="add" onPress={handleAdd} />
      </View>
    </SafeAreaView>
  );
};

export default FoodScan;
