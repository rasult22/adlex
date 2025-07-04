import { Stack } from "expo-router";

export default function SettingsLayout() {
  return <Stack screenOptions={{
    contentStyle: {
      backgroundColor: '#000',
    },
    animation: 'fade',
    headerShadowVisible: false
  }}>
      <Stack.Screen name="index" options={{
        headerShown: false,
      }} />
    </Stack>
}
