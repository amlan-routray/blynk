import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FabAction } from "./filterAndSort.type";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";

export default function FilterAndSort() {
  const router = useRouter();

  const openModal = (action: FabAction) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (action === FabAction.FILTER) router.navigate("/filter");
    if (action === FabAction.SORT) router.navigate("/sort");
  };

  return (
    <View style={styles.fab}>
      <TouchableOpacity onPress={() => openModal(FabAction.FILTER)}>
        <Text style={styles.text}>Filter</Text>
      </TouchableOpacity>
      <Text style={{ color: "#fff" }}> | </Text>
      <TouchableOpacity onPress={() => openModal(FabAction.SORT)}>
        <Text style={styles.text}>Sort</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  fab: {
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 160,
    borderRadius: 30,
    height: 48,
    position: "absolute",
    bottom: 48,
    left: "40%",
    zIndex: 100,
    backgroundColor: "#000",
    transform: "translateX(-50%)",
  },
  text: {
    fontSize: 20,
    color: "#fff",
  },
});
