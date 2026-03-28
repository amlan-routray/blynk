import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function ArticleLayout() {
  const router = useRouter();
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "News Feed",
          headerLeft: () => (
            <TouchableOpacity hitSlop={20} onPress={()=>router.navigate('/')}>
              <View
                style={{
                  flexDirection: "row",
                  paddingLeft: 8,
                  paddingRight: 8,
                  alignItems: 'center'
                }}
              >
                <Ionicons name="chevron-back" size={24} />
                <Text style={{fontSize:16}}>Back</Text>
              </View>
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
}
