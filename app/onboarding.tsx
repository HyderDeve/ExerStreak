import AppButton from "@/components/AppButton";
import FormField from "@/components/FormField";
import Logo from "@/components/Logo";
import RadioCard from "@/components/RadioCard";
import SegmentedControl from "@/components/SegmentedControl";
import { BODY_TYPES } from "@/constants/data";
import { useProfile } from "@/lib/useProfile";
import { useRouter } from "expo-router";
import { styled } from "nativewind";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

const Onboarding = () => {
  const router = useRouter();
  const { profile, onboarded, saveProfile } = useProfile();

  const [form, setForm] = useState<UserProfile>(
    profile ?? {
      name: "",
      weight: "",
      weightUnit: "kg",
      height: "",
      heightUnit: "cm",
      age: "",
      bodyType: "Prefer not to say",
    },
  );

  const set = <K extends keyof UserProfile>(key: K, value: UserProfile[K]) =>
    setForm((current) => ({ ...current, [key]: value }));

  const ageNum = parseInt(form.age, 10);
  const valid =
    form.name.trim().length > 0 &&
    parseFloat(form.weight) > 0 &&
    form.height.trim().length > 0 &&
    ageNum >= 10 &&
    ageNum <= 120;

  const handleContinue = () => {
    if (!valid) return;
    saveProfile({ ...form, name: form.name.trim() });
    if (onboarded && router.canGoBack()) router.back();
    else router.replace("/(tabs)");
  };

  return (
    <SafeAreaView className="screen">
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} className="flex-1">
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" contentContainerClassName="pb-6">
          <View className="home-header">
            <Logo />
            <Text className="list-meta">Your profile</Text>
          </View>

          <Text className="detail-title mt-6">Let’s start with you.</Text>
          <Text className="detail-copy">A few details to make your daily movement and nutrition feel more personal.</Text>

          <View className="mt-6 gap-5">
            <FormField label="Your name" value={form.name} onChangeText={(v) => set("name", v)} placeholder="Alex Morgan" autoCapitalize="words" />

            <View className="row-gap">
              <View className="flex-1">
                <FormField label="Current weight" value={form.weight} unit={form.weightUnit} keyboardType="decimal-pad" onChangeText={(v) => set("weight", v)} placeholder="68" />
                <SegmentedControl options={["kg", "lb"] as const} value={form.weightUnit} onChange={(v) => set("weightUnit", v)} />
              </View>
              <View className="flex-1">
                <FormField
                  label="Height"
                  value={form.height}
                  unit={form.heightUnit === "cm" ? "cm" : undefined}
                  keyboardType={form.heightUnit === "cm" ? "decimal-pad" : "default"}
                  onChangeText={(v) => set("height", v)}
                  placeholder={form.heightUnit === "cm" ? "172" : "5'8\""}
                />
                <SegmentedControl options={["cm", "ft / in"] as const} value={form.heightUnit} onChange={(v) => set("heightUnit", v)} />
              </View>
            </View>

            <FormField label="Age" value={form.age} unit="years" keyboardType="number-pad" maxLength={3} onChangeText={(v) => set("age", v.replace(/[^0-9]/g, ""))} placeholder="28" />

            <View className="field">
              <View className="flex-row items-center justify-between">
                <Text className="field-label">Body type</Text>
                <Text className="list-meta">Optional</Text>
              </View>
              <View className="radio-grid">
                {BODY_TYPES.map((type) => (
                  <RadioCard key={type} label={type} selected={form.bodyType === type} onPress={() => set("bodyType", type)} />
                ))}
              </View>
            </View>
          </View>
        </ScrollView>

        <View className="pb-2 pt-2">
          <AppButton label="Continue" onPress={handleContinue} disabled={!valid} />
          <Text className="footer-note">Your pace, your starting point. Edit anytime.</Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Onboarding;
