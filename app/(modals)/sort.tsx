import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useBlynk, SORT } from "../../context/BlynxContext";

export default function SortModal() {
  const router = useRouter();
  const { sortMethod, setSortMethod } = useBlynk();

  const handleSelect = (value: SORT) => {
    setSortMethod(value);
    router.back();
  };

  const options: { label: string; value: SORT }[] = [
    { label: "Latest First", value: SORT.LATEST },
    { label: "Oldest First", value: SORT.OLDEST },
  ];

  return (
    <View
      style={{
        flex: 1,
        paddingVertical: 24,
        paddingHorizontal: 16,
        justifyContent: "flex-end",
      }}
    >
      {options.map((option) => {
        const isSelected = sortMethod === option.value;

        return (
          <TouchableOpacity
            key={option.value}
            style={{
              paddingVertical: 16,
              backgroundColor: isSelected ? "#646464" : "#000",
              marginBottom: 16,
              borderRadius: 8,
            }}
            onPress={() => handleSelect(option.value)}
            disabled={isSelected}
          >
            <Text
              style={{
                fontSize: 16,
                textAlign: "center",
                color: "#fff",
              }}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
