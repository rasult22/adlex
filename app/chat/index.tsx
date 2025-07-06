import { createSession } from "@/api/adk";
import ChatScreen from "@/screens/chat/chat-screen";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";

export default function Chat() {
  const {id} = useLocalSearchParams<{id?: string}>()
  const router = useRouter();

  useEffect(() => {
    const fn = async() => {
      const session = await createSession()
      router.replace(`/chat?id=${session.id}`)
    }
    if (!id) {
      fn()
    }
  }, [])

  if (!id) {
    return <View><Text className="text-white">Loading...</Text></View>
  }

  return (
    <ChatScreen session_id={id}/>
  );
}
