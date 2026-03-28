import { Stack } from "expo-router";

export default function ModalLayout() {
  return (
    <Stack
      screenOptions={{
        animation: "slide_from_bottom",
        headerTitleAlign: "center",
        headerShown: true,
      }}
    >
      <Stack.Screen
        name="filter"
        options={{
          title: "Filters",
        }}
      />

      <Stack.Screen
        name="sort"
        options={{
          title: "Sort",
        }}
      />
    </Stack>
  );
}
