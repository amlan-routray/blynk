import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useBlynk } from "../../context/BlynxContext";

const GENRES = [
  "Sports",
  "Movies",
  "Tech",
  "Business",
  "Lifestyle",
  "Politics",
];

export default function FilterModal() {
  const router = useRouter();
  const { filters, setFilters } = useBlynk();

  const [selected, setSelected] = useState<Set<string>>(new Set(filters));

  const toggleGenre = (genre: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(genre) ? next.delete(genre) : next.add(genre);
      return next;
    });
  };

  const handleApply = () => {
    const selectedGenres = Array.from(selected);
    setFilters(selectedGenres);
    router.back();
  };

  const handleClear = () => {
    setSelected(new Set());
    setFilters([]);
    router.back();
  };

  const renderItem = (item: string, index: number) => {
    const isSelected = selected.has(item);

    return (
      <TouchableOpacity
        onPress={() => toggleGenre(item)}
        style={{
          width: "48%",
          marginBottom: 16,
        }}
        key={index}
      >
        <Text
          style={{
            fontSize: 20,
            paddingVertical: 20,
            backgroundColor: isSelected ? "#000" : "#fff",
            color: isSelected ? "#fff" : "#000",
            textAlign: "center",
            borderRadius: 8,
          }}
        >
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.rootContainer}>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {GENRES.map((item, index) => renderItem(item, index))}
      </View>

      <View style={{ marginBottom: 24 }}>
        <TouchableOpacity onPress={handleClear}>
          <Text style={[styles.cta, { color: "#000" }]}>Clear Filter(s)</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleApply}>
          <Text
            style={[styles.cta, { color: "#fff", backgroundColor: "#000" }]}
          >
            Apply Filter(s)
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cta: {
    paddingVertical: 16,
    borderRadius: 8,
    fontSize: 16,
    textAlign: "center",
  },
  rootContainer: {
    flex: 1,
    padding: 16,
    justifyContent: "space-between",
  },
});
