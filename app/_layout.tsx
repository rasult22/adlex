import { Roboto_400Regular, Roboto_400Regular_Italic, Roboto_500Medium, Roboto_600SemiBold, Roboto_600SemiBold_Italic, Roboto_700Bold, Roboto_700Bold_Italic, Roboto_800ExtraBold, Roboto_800ExtraBold_Italic, Roboto_900Black, Roboto_900Black_Italic, useFonts } from '@expo-google-fonts/roboto';
import { Stack } from "expo-router";
import '../global.css';

export default function RootLayout() {
  useFonts({
    Roboto_400Regular,
    Roboto_400Regular_Italic,
    Roboto_500Medium,
    Roboto_600SemiBold,
    Roboto_600SemiBold_Italic,
    Roboto_700Bold,
    Roboto_700Bold_Italic,
    Roboto_800ExtraBold,
    Roboto_800ExtraBold_Italic,
    Roboto_900Black,
    Roboto_900Black_Italic,
  })
  return (
    <Stack>
      <Stack.Screen name="index" options={{
        headerShown: false
      }} />
      <Stack.Screen name="chat" options={{
        headerShown: false,
      }} />
    </Stack>
  );
}
