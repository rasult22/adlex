import { Text, View } from "react-native";

export default function Chat() {
  return (
    <View className="flex-1 bg-black">
      <Header />
      <Text className="text-white">Chat</Text>
    </View>
  );
}

function Header() {
  return (
    <View className="flex-row items-center justify-between px-4 py-2 bg-black">
      <Text className="text-white text-lg font-bold">Chat</Text>
    </View>
  )
}