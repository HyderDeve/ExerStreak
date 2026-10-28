import { router } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";
import { useApp } from "@/components/app-provider";
import { Button } from "@/components/button";
import { Field } from "@/components/field";
import { Logo } from "@/components/logo";
import { RadioCard } from "@/components/radio-card";
import { Screen } from "@/components/screen";
import { Segmented } from "@/components/segmented";
import { BODY_TYPES, Profile } from "@/constants/data";

export default function Onboarding() {
  const { profile, setProfile } = useApp();
  const [form, setForm] = useState<Profile>(profile);
  const set = <K extends keyof Profile>(k: K, v: Profile[K]) => setForm((f) => ({ ...f, [k]: v }));

  const save = () => {
    setProfile(form);
    router.canGoBack() ? router.back() : router.replace("/");
  };

  return (
    <Screen
      footer={
        <>
          <Button label="Continue" onPress={save} />
          <Text className="mt-3 text-center text-xs text-body">Your pace, your starting point. Edit anytime.</Text>
        </>
      }
    >
      <View className="flex-row items-center justify-between">
        <Logo />
        <Text className="text-xs text-body">Your profile</Text>
      </View>

      <Text className="mt-8 text-4xl font-bold tracking-tight text-ink">Let’s start with you.</Text>
      <Text className="mt-2 text-sm text-body">
        A few details to make your daily movement and nutrition feel more personal.
      </Text>

      <View className="mt-6 gap-5">
        <Field label="Your name" value={form.name} onChangeText={(v) => set("name", v)} />

        <View className="flex-row gap-3">
          <View className="flex-1">
            <Field label="Current weight" value={form.weight} unit={form.weightUnit} keyboardType="numeric" onChangeText={(v) => set("weight", v)} />
            <Segmented options={["kg", "lb"] as const} value={form.weightUnit} onChange={(v) => set("weightUnit", v)} />
          </View>
          <View className="flex-1">
            <Field label="Height" value={form.height} unit={form.heightUnit === "cm" ? "cm" : ""} keyboardType="numeric" onChangeText={(v) => set("height", v)} />
            <Segmented options={["cm", "ft / in"] as const} value={form.heightUnit} onChange={(v) => set("heightUnit", v)} />
          </View>
        </View>

        <Field label="Age" value={form.age} unit="years" keyboardType="numeric" onChangeText={(v) => set("age", v)} />

        <View>
          <View className="mb-2 flex-row items-center justify-between">
            <Text className="text-sm font-medium text-ink">Body type</Text>
            <Text className="text-xs text-body">Optional</Text>
          </View>
          <View className="flex-row flex-wrap justify-between gap-y-2">
            {BODY_TYPES.map((b) => (
              <RadioCard key={b} label={b} selected={form.bodyType === b} onPress={() => set("bodyType", b)} />
            ))}
          </View>
        </View>
      </View>
    </Screen>
  );
}
