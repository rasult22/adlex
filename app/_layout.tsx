import { Inter_400Regular, Inter_400Regular_Italic, Inter_500Medium, Inter_600SemiBold, Inter_600SemiBold_Italic, Inter_700Bold, Inter_700Bold_Italic, Inter_800ExtraBold, Inter_800ExtraBold_Italic, Inter_900Black, Inter_900Black_Italic, useFonts } from '@expo-google-fonts/inter';
import { Stack } from "expo-router";
import '../global.css';

export default function RootLayout() {
  useFonts({
    Inter_400Regular,
    Inter_400Regular_Italic,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_600SemiBold_Italic,
    Inter_700Bold,
    Inter_700Bold_Italic,
    Inter_800ExtraBold,
    Inter_800ExtraBold_Italic,
    Inter_900Black,
    Inter_900Black_Italic,
  })
  return (
    <Stack screenOptions={{
      contentStyle: {
        backgroundColor: '#000'
      }
    }}>
      <Stack.Screen name="index" options={{
        headerShown: false
      }} />
      <Stack.Screen name="chat" options={{
        headerShown: false,
      }} />
    </Stack>
  );
}
