import { useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  Image,
  Pressable,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import { Ionicons } from "@expo/vector-icons";

import DATA from "../../data.json";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);

  const router = useRouter();

  const handleSearch = (text: string) => {
    setQuery(text);

    if (text.length < 3) {
      setResults([]);
      return;
    }

    const regex = new RegExp(text, "i");

    const filtered = DATA.filter((item) => regex.test(item.title));

    setResults(filtered);
  };

  const handlePress = (item: any) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    router.replace({
      pathname: "/article",
      params: { data: JSON.stringify(item) },
    });
  };

  const renderItem = ({ item }: any) => (
    <Pressable
      style={[styles.card, styles.cardelevate]}
      onPress={() => handlePress(item)}
    >
      <Image source={{ uri: item.urlToImage }} style={styles.image} />
      <View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.genre}>{item.genre}</Text>
      </View>
      {/* <Text style={styles.desc}>{item.description}</Text> */}
    </Pressable>
  );

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        placeholder="Start typing to find.."
        value={query}
        onChangeText={handleSearch}
        style={[styles.input, styles.cardelevate]}
      />

      <FlatList
        data={results}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{
          padding: 10,
          flexGrow: 1,
          justifyContent: results.length === 0 ? "center" : "flex-start",
        }}
        ListEmptyComponent={
          <View style={{ alignItems: "center" }}>
            <Ionicons name="sparkles" size={48} color="#999" />
            <Text style={{ marginTop: 20, fontSize: 16, color: "#666" }}>
              Discover stories that matter to you
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    margin: 10,
    padding: 18,
    fontSize: 18,
  },
  cardelevate: {
    backgroundColor: "#fff",
    borderRadius: 10,
    flexDirection: "row",
    // --- iOS Shadow ---
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,

    // --- Android Shadow ---
    elevation: 4,
  },
  card: {
    marginBottom: 16,
  },
  image: {
    height: 96,
    width: 96,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    marginRight: 16,
  },
  genre: {
    marginTop: 6,
    fontSize: 12,
    color: "gray",
  },
  title: {
    width: 240,
    fontSize: 16,
    fontWeight: "600",
    marginTop: 4,
    flexWrap: "wrap",
  },
});
