import { Text, View } from "react-native";

const ListHeading = ({ title, meta }: ListHeadingProps) => (
  <View className="list-head">
    <Text className="list-title">{title}</Text>
    {meta ? <Text className="list-meta">{meta}</Text> : null}
  </View>
);

export default ListHeading;
