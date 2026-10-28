import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { useApp } from "@/components/app-provider";
import { Button } from "@/components/button";
import { Macro } from "@/components/macro";
import { Screen } from "@/components/screen";
import { SCAN_RESULT as R, SERVINGS } from "@/constants/data";
import { colors } from "@/constants/theme";

export default function FoodScan() {
  const { addToFoodLog } = useApp();
  const [idx, setIdx] = useState(1);
  const s = SERVINGS[idx];
  const f = s.factor;

  return (
    <Screen
      footer={
        <Button
          label="Add to food log"
          icon="add"
          onPress={() => {
            addToFoodLog();
            router.back();
          }}
        />
      }
    >
      <View className="flex-row items-center justify-between">
        <Pressable onPress={() => router.back()} className="flex-row items-center gap-1">
          <Ionicons name="chevron-back" size={18} color={colors.ink} />
          <Text className="text-sm text-ink">Today</Text>
        </Pressable>
        <Text className="text-base font-semibold text-ink">Food scan</Text>
        <Ionicons name="ellipsis-horizontal" size={20} color={colors.ink} />
      </View>

      <View className="mt-4 h-52 overflow-hidden rounded-3xl bg-peach">
        <Image source={{ uri: R.image }} className="h-full w-full" resizeMode="cover" />
        <View className="absolute inset-x-0 bottom-3 items-center">
          <View className="flex-row items-center gap-1.5 rounded-full bg-black/60 px-3 py-1">
            <Ionicons name="checkmark" size={12} color="#fff" />
            <Text className="text-[11px] text-white">Scan complete</Text>
          </View>
        </View>
      </View>

      <View className="mt-4 flex-row items-start justify-between">
        <View className="flex-1">
          <Text className="text-xl font-bold text-ink">{R.title}</Text>
          <Text className="mt-0.5 text-xs text-body">{R.subtitle}</Text>
        </View>
        <View className="h-9 w-9 items-center justify-center rounded-xl bg-peach">
          <Ionicons name="scan-outline" size={18} color={colors.brand} />
        </View>
      </View>

      <Pressable
        onPress={() => setIdx((i) => (i + 1) % SERVINGS.length)}
        className="mt-4 flex-row items-center justify-between rounded-xl border border-line bg-white px-3 py-2.5"
      >
        <View>
          <Text className="text-[11px] text-body">Serving amount</Text>
          <Text className="text-sm font-medium text-ink">{s.label}</Text>
        </View>
        <View className="flex-row items-center gap-1">
          <Text className="text-xs font-medium text-brand">Adjust</Text>
          <Ionicons name="chevron-down" size={14} color={colors.brand} />
        </View>
      </Pressable>

      <View className="mt-3 rounded-2xl bg-peach p-4">
        <View className="flex-row items-end justify-between">
          <View className="flex-row items-baseline gap-1.5">
            <Text className="text-4xl font-bold text-ink">{Math.round(R.kcal * f)}</Text>
            <Text className="text-sm text-body">kcal</Text>
          </View>
          <Text className="text-[11px] text-brand">Estimated from scan</Text>
        </View>
        <View className="mt-4 flex-row justify-between">
          <Macro value={Math.round(R.protein * f)} label="Protein" />
          <Macro value={Math.round(R.carbs * f)} label="Carbs" />
          <Macro value={Math.round(R.fat * f)} label="Fat" />
        </View>
      </View>

      <Text className="mt-5 text-sm font-medium text-ink">Additional nutrients</Text>
      <View className="mt-3 flex-row justify-between">
        {R.extras.map((e) => (
          <View key={e.label}>
            <Text className="text-[11px] text-body">{e.label}</Text>
            <Text className="mt-0.5 text-sm font-medium text-ink">
              {Math.round(e.value * f)} {e.unit}
            </Text>
          </View>
        ))}
      </View>
      <Text className="mt-4 text-[11px] leading-4 text-body">
        Scan estimates may vary with portions and ingredients. Review your meal before adding it.
      </Text>

      <Pressable className="mt-5 flex-row items-center justify-center gap-1.5">
        <Ionicons name="create-outline" size={14} color={colors.brand} />
        <Text className="text-xs font-medium text-brand">Review / edit nutrition</Text>
      </Pressable>
    </Screen>
  );
}
