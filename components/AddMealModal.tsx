import { icons } from "@/constants/icons";
import { colors } from "@/constants/theme";
import { useFoodStore } from "@/lib/foodStore";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, Text, View } from "react-native";
import AppButton from "./AppButton";
import FormField from "./FormField";

type Props = { visible: boolean; onClose: () => void };

const num = (v: string) => {
  const n = parseFloat(v);
  return Number.isNaN(n) || n < 0 ? 0 : n;
};

const AddMealModal = ({ visible, onClose }: Props) => {
  const addEntry = useFoodStore((s) => s.addEntry);
  const [name, setName] = useState("");
  const [kcal, setKcal] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fat, setFat] = useState("");

  const valid = name.trim().length > 0 && num(kcal) > 0;

  const reset = () => {
    setName("");
    setKcal("");
    setProtein("");
    setCarbs("");
    setFat("");
  };

  const close = () => {
    reset();
    onClose();
  };

  const submit = () => {
    if (!valid) return;
    addEntry({ name: name.trim(), kcal: num(kcal), protein: num(protein), carbs: num(carbs), fat: num(fat) });
    close();
  };

  return (
    <Modal visible={visible} transparent animationType="slide" statusBarTranslucent onRequestClose={close}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} className="flex-1">
        <Pressable className="modal-overlay" onPress={close}>
          <Pressable className="modal-container" onPress={() => {}}>
            <View className="modal-header">
              <Text className="modal-title">Add a meal</Text>
              <Pressable className="modal-close" onPress={close}>
                <Ionicons name={icons.close} size={18} color={colors.foreground} />
              </Pressable>
            </View>
            <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} contentContainerClassName="modal-body">
              <FormField label="Meal" placeholder="e.g. Greek yogurt bowl" value={name} onChangeText={setName} autoCapitalize="sentences" />
              <FormField label="Calories" placeholder="0" unit="kcal" value={kcal} onChangeText={setKcal} keyboardType="decimal-pad" />
              <View className="row-gap">
                <FormField label="Protein" placeholder="0" unit="g" value={protein} onChangeText={setProtein} keyboardType="decimal-pad" />
                <FormField label="Carbs" placeholder="0" unit="g" value={carbs} onChangeText={setCarbs} keyboardType="decimal-pad" />
                <FormField label="Fat" placeholder="0" unit="g" value={fat} onChangeText={setFat} keyboardType="decimal-pad" />
              </View>
              <AppButton label="Add to food log" icon="add" onPress={submit} disabled={!valid} />
            </ScrollView>
          </Pressable>
        </Pressable>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default AddMealModal;
