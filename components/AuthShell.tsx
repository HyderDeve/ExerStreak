import { icons } from "@/constants/icons";
import { Ionicons } from "@expo/vector-icons";
import { styled } from "nativewind";
import type { ReactNode } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

type Props = { title: string; subtitle: string; children: ReactNode; footer?: ReactNode };

const AuthShell = ({ title, subtitle, children, footer }: Props) => (
  <SafeAreaView className="auth-safe-area">
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="auth-screen">
      <ScrollView className="auth-scroll" keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <View className="auth-content">
          <View className="auth-brand-block">
            <View className="auth-logo-wrap">
              <View className="auth-logo-mark">
                <Ionicons name={icons.pulse} size={28} color="#fff" />
              </View>
              <View>
                <Text className="auth-wordmark">exerstreak</Text>
                <Text className="auth-wordmark-sub">Daily movement</Text>
              </View>
            </View>
            <Text className="auth-title">{title}</Text>
            <Text className="auth-subtitle">{subtitle}</Text>
          </View>

          <View className="auth-card">
            <View className="auth-form">{children}</View>
          </View>

          {footer}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  </SafeAreaView>
);

export default AuthShell;
