import { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { SORT, useBlynk } from "../../context/BlynxContext";
import DATA from "../../data.json";
import FilterAndSort from "../../components/FilterAndSort/filterAndSortFab";
import { formatDistanceToNow } from "date-fns";

const getRelativeTime = (date: string) =>
  formatDistanceToNow(new Date(date), { addSuffix: true });

export default function Home() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { sortMethod, filters } = useBlynk();

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      let updatedData = [...DATA];

      // Apply filters
      if (filters.length > 0) {
        updatedData = updatedData.filter((item) =>
          filters.includes(item.genre),
        );
      }

      // Apply sorting
      updatedData.sort((a, b) => {
        const timeA = new Date(a.publishedAt as any).getTime();
        const timeB = new Date(b.publishedAt as any).getTime();

        return sortMethod === SORT.LATEST ? timeB - timeA : timeA - timeB;
      });

      setNews(updatedData);
      setLoading(false);
    }, 300);
  }, [sortMethod, filters]);

  const handlePress = (item: any) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.navigate({
      pathname: "/article",
      params: { data: JSON.stringify(item) },
    });
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={[styles.card, styles.cardelevate]}
      onPress={() => handlePress(item)}
    >
      <Image source={{ uri: item.urlToImage }} style={styles.image} />

      <Text style={styles.genre}>
        {item.genre} • {getRelativeTime(item.publishedAt)}
      </Text>

      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.desc}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <FlatList
        data={news}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 10 }}
      />
      <FilterAndSort />
    </View>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
  },
  card: {
    marginBottom: 16,
    paddingBottom: 12,
  },
  cardelevate: {
    backgroundColor: "#fff",
    borderRadius: 10,
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
  image: {
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  genre: {
    padding: 12,
    marginTop: 6,
    fontSize: 12,
    color: "gray",
  },
  title: {
    paddingLeft: 12,
    fontSize: 16,
    fontWeight: "600",
    marginTop: 4,
  },
  desc: {
    padding: 12,
    fontSize: 13,
    color: "#555",
    marginTop: 4,
  },
});
