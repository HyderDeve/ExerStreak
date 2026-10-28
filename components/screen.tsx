import { ReactNode } from "react";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = { children: ReactNode; footer?: ReactNode; tabbed?: boolean };

/** Page wrapper: safe-area aware scroll area with an optional pinned footer. */
export function Screen({ children, footer, tabbed }: Props) {
  const insets = useSafeAreaInsets();
  return (
    <View className="flex-1 bg-cream">
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingTop: insets.top + 16,
          paddingHorizontal: 20,
          paddingBottom: 24,
        }}
      >
        {children}
      </ScrollView>
      {footer ? (
        <View
          className="px-5 pt-2"
          style={{ paddingBottom: tabbed ? 12 : Math.max(insets.bottom, 12) }}
        >
          {footer}
        </View>
      ) : null}
    </View>
  );
}
