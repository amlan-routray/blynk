import { Stack } from "expo-router";
import { BlynkProvider } from "../context/BlynxContext";

export default function RootLayout() {
  return (
    <BlynkProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="article" />
        <Stack.Screen name="(modals)" options={{ presentation: "modal" }} />
      </Stack>
    </BlynkProvider>
  );
}
