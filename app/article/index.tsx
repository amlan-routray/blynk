import { useLocalSearchParams } from "expo-router";
import {
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  View,
} from "react-native";
import { getFromStorage, saveToStorage } from "../../utils/storageUtility";
import * as Haptics from "expo-haptics";
import { format } from "date-fns";

const getFullDate = (date: string) => format(new Date(date), "dd MMM yyyy");

const STORAGE_KEY = "BOOKMARK_NEWS";
const GENERIC_NEWS_TEXT =
  "This development marks a significant moment and has quickly gained widespread attention.\n\n Experts believe its impact could be far-reaching, influencing both current situations and future decisions. Authorities are closely monitoring the developments while urging the public to stay informed through reliable sources.\n\n Reactions have been mixed, with analysts highlighting potential risks as well as opportunities. As the situation continues to evolve, more details are expected to emerge in the coming days, providing greater clarity and insight.";

export default function Article() {
  const { data } = useLocalSearchParams();
  const article = JSON.parse(data as string);

  const saveArticle = async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    const existing = (await getFromStorage(STORAGE_KEY)) || [];
    const exists = existing.some((item: any) => item.id === article.id);
    if (exists)
      Alert.alert(
        "Bookmark Exists!",
        "The feed you are trying to bookmark already exists in the list",
        [
          {
            text: "Got It",
            style: "destructive",
          },
        ],
      );
    else {
      await saveToStorage(STORAGE_KEY, [...existing, article]);
      Alert.alert(
        "Bookmark Added!",
        "The feed has been added succesfully to the bookmark list",
        [
          {
            text: "Done",
            style: "destructive",
          },
        ],
      );
    }
  };

  return (
    <ScrollView style={{ padding: 10 }}>
      <Image
        source={{ uri: article.urlToImage }}
        style={[{ height: 250 }, styles.image]}
      />
      <Text style={styles.header}>{article.title}</Text>
      <View style={styles.metaContainer}>
        <Text style={styles.genre}>{article.genre}</Text>
        <Text style={styles.genre}>{getFullDate(article.publishedAt)}</Text>
      </View>
      <Text
        style={styles.description}
      >{`${article.description} ${GENERIC_NEWS_TEXT}`}</Text>
      <TouchableOpacity onPress={saveArticle}>
        <Text style={styles.button}>Bookmark for me</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    borderRadius: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 16,
    paddingLeft: 8,
    paddingRight: 8,
  },
  description: {
    fontSize: 18,
    textAlign: "justify",
    paddingLeft: 8,
    paddingRight: 8,
    marginBottom: 20,
  },
  genre: {
    fontSize: 16,
    marginBottom: 20,
    paddingLeft: 8,
    paddingRight: 8,
    marginRight: 16,
    fontWeight: "500",
    textDecorationLine: "underline",
  },
  metaContainer: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
  },
  button: {
    fontSize: 20,
    padding: 16,
    backgroundColor: "#000",
    flex: 1,
    marginBottom: 20,
    color: "#fff",
    textAlign: "center",
  },
});
