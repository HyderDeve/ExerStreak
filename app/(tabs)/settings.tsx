import AppButton from "@/components/AppButton";
import { useProfile } from "@/lib/useProfile";
import { initialOf } from "@/lib/utils";
import { useRouter } from "expo-router";
import { styled } from "nativewind";
import { Alert, ScrollView, Text, View } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

const Row = ({ label, value }: { label: string; value: string }) => (
  <View className="info-row">
    <Text className="info-label">{label}</Text>
    <Text className="info-value" numberOfLines={1}>{value}</Text>
  </View>
);

const Settings = () => {
  const router = useRouter();
  const { profile, displayName, clearProfile } = useProfile();

  const handleReset = () => {
    Alert.alert(
      "Reset profile?",
      "This removes your saved details from this device and takes you back to setup.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Reset",
          style: "destructive",
          onPress: () => {
            clearProfile();
            router.replace("/onboarding");
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView className="screen">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="pb-30">
        <Text className="screen-title mb-6">Settings</Text>

        <View className="profile-card">
          <View className="flex-row items-center gap-4">
            <View className="profile-avatar">
              <Text className="home-avatar-text text-2xl">{initialOf(displayName)}</Text>
            </View>
            <View className="flex-1">
              <Text className="profile-name" numberOfLines={1}>{displayName}</Text>
              <Text className="profile-email">Saved on this device</Text>
            </View>
          </View>
        </View>

        {profile ? (
          <View className="profile-card">
            <Text className="field-label mb-2">Your details</Text>
            <Row label="Weight" value={`${profile.weight} ${profile.weightUnit}`} />
            <Row label="Height" value={`${profile.height}${profile.heightUnit === "cm" ? " cm" : ""}`} />
            <Row label="Age" value={`${profile.age} years`} />
            <Row label="Body type" value={profile.bodyType} />
            <View className="mt-3">
              <AppButton label="Edit profile" variant="secondary" onPress={() => router.push("/onboarding")} />
            </View>
          </View>
        ) : null}

        <AppButton label="Reset profile" icon="logout" variant="danger" onPress={handleReset} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;
