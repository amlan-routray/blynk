import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { getFromStorage, saveToStorage } from "../../utils/storageUtility";
import { registerForPushNotificationsAsync } from "../../utils/registerForPushNotificationsAsync";
import * as Notifications from "expo-notifications";

const STORAGE_KEY = "BOOKMARK_NEWS";

export default function Bookmarks() {
  const [bookamarkedArticles, setBookmarkedArticles] = useState<any[]>([]);
  const router = useRouter();
  useEffect(() => {
    const getAllArticles = async () => {
      const articles = (await getFromStorage(STORAGE_KEY)) || [];
      setBookmarkedArticles(articles);
    };
    getAllArticles();
  });

  const removeBookmark = (id: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const onConfirmDeletBookmark = async () => {
      const updated = bookamarkedArticles.filter((item) => item.id !== id);
      setBookmarkedArticles(updated);
      await saveToStorage(STORAGE_KEY, updated);
    };
    Alert.alert(
      "Are you sure?",
      "You want to remove the bookmark from the list",
      [
        {
          text: "Delete",
          style: "destructive",
          onPress: onConfirmDeletBookmark,
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
    );
  };

  const scheduleReminder = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const result = await registerForPushNotificationsAsync();
    if (result === "granted") {
      Notifications.scheduleNotificationAsync({
        content: {
          title: "Latest News Update 🔥",
          body: "Open Blynk to stay updated!",
        },
        trigger: {
          seconds: 100,
          type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        },
      });
    }
  };
  const handlePress = (item: any) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    router.replace({
      pathname: "/article",
      params: { data: JSON.stringify(item) },
    });
  };

  const renderItem = ({ item }: any) => (
    <View style={[styles.tile, styles.cardelevate]}>
      <TouchableOpacity onPress={() => handlePress(item)}>
        <Image source={{ uri: item.urlToImage }} style={styles.image} />
        <Text numberOfLines={2} style={styles.title}>
          {item.title}
        </Text>
      </TouchableOpacity>
      <Pressable onPress={() => removeBookmark(item.id)}>
        <Text style={styles.cta}>Remove Bookmark</Text>
      </Pressable>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity onPress={scheduleReminder}>
        <Text style={styles.reminderText}>Set Reminder</Text>
      </TouchableOpacity>
      <FlatList
        data={bookamarkedArticles}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent:
            bookamarkedArticles.length === 0 ? "center" : "flex-start",
          padding: 10,
        }}
        ListEmptyComponent={
          <View style={{ alignItems: "center" }}>
            <Ionicons name="bookmark" size={48} color="#999" />
            <Text style={{ marginTop: 20, fontSize: 16, color: "#666" }}>
              Save your favorite feed
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  tile: {
    width: "48%",
    marginBottom: 16,
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
    width: "100%",
    height: 120,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  title: {
    margin: 6,
    fontSize: 14,
    fontWeight: "600",
  },
  cta: {
    marginTop: 6,
    padding: 12,
    color: "#fff",
    fontSize: 12,
    textAlign: "center",
    backgroundColor: "#000",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },

  reminderText: {
    padding: 16,
    backgroundColor: "#000",
    color: "#fff",
    textAlign: "center",
    margin: 16,
  },
});
