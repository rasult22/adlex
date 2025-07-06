import { getSessionData, runSSE, SessionData } from "@/api/adk";
import {
  default as AnimatedPressable,
} from "@/components/button/animated-pressable";
import PDFView from "@/components/chat/pdf-view";
import PlusIcon from "@/icons/plus";
import SendIcon from "@/icons/send";
import queryClient from "@/queries/client";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  View
} from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MessageList from "./message-list";
const md = `# Hello how can i help you?
`;
const _delay = 400;
const _stiffness = 40;
const _damping = 80;

export default function ChatScreen({session_id}: {session_id: string}) {
  const {isLoading, data, refetch} = useQuery({
    queryKey: ['chat', session_id],
    'queryFn': () => {
      return getSessionData(session_id)
    }
  })
  
  if (!data) {
    return <Text>...</Text>
  }

  return (
    <Animated.View
      entering={FadeIn.duration(400).stiffness(_stiffness).damping(_damping)}
      className="flex-1 bg-black"
    >
      <View className="flex-1 items-center justify-center">
        {data?.events.length === 0 ? (
          <WelcomeMessage key={"welcome"} />
        ) : (
          <MessageList key={"messages"} messages={data.events} />
        )}
      </View>
      <ChatInput onSend={async (message) => {
        const messageItem = {
          role: 'user',
          parts: [{text: message}]
        }
        queryClient.setQueryData<SessionData>(['chat', session_id], (oldData) => {
          if (!oldData) return oldData
          return {
            ...oldData,
            events: [...oldData.events, {
              author: 'user',
              invocationId: 'self-user' + message,
              content: {
                parts: [{text: message}]
              }
            }]
          }
        })
        await runSSE(session_id, messageItem)
        await refetch()
      }} />
    </Animated.View>
  );
}

function WelcomeMessage() {
  return (
    <Animated.View className="gap-[20px] px-4 py-6">
      <Animated.Text
        entering={FadeIn.duration(400)
          .stiffness(_stiffness)
          .damping(_damping)
          .delay(_delay)}
        className="text-white text-[20px] leading-[120%] text-center font-inter-600"
      >
        Wellcome, Alim!
      </Animated.Text>
      <Animated.Text
        entering={FadeIn.duration(400)
          .stiffness(_stiffness)
          .damping(_damping)
          .delay(_delay * 2)}
        className="text-white text-[28px] leading-[120%] text-center font-inter-600"
      >
        What can I help with?
      </Animated.Text>
      <Animated.Text
        entering={FadeIn.duration(400)
          .stiffness(_stiffness)
          .damping(_damping)
          .delay(_delay * 3)}
        className="text-[#FFFFFFB8] text-[16px] max-w-[90%] mx-auto text-center leading-[24px] font-inter-500"
      >
        AI assistant with exclusive data for your business
      </Animated.Text>
    </Animated.View>
  );
}

function ChatInput({onSend}: {onSend: (message: string) => void}) {
  const [message, setMessage] = useState("");
  const { bottom } = useSafeAreaInsets();
  return (
    <View
      className="bg-[#1F1F1F] gap-[20px] rounded-t-[20px] p-2"
      style={{
        paddingBottom: bottom,
      }}
    >
      <View className="hidden gap-3 bg-[#000] rounded-[22px] p-3">
        <PDFView type="upload" date="12.05.2025" filename="Скан_паспорта.pdf" />
        <PDFView type="upload" date="12.05.2025" filename="Скан_паспорта_2.pdf" />
      </View>
      <View className="px-2 pb-2 pt-2">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <TextInput
            multiline
            value={message}
            onChangeText={setMessage}
            placeholder="Start typing your question"
            placeholderTextColor="#FFFFFF7A"
            className="text-white text-[16px] font-inter-400 leading-[24px] focus:outline-none"
          />
        </KeyboardAvoidingView>
        <View className="flex-row justify-between mt-6 pb-2">
          <AnimatedPressable onPress={() => {}}>
            <PlusIcon />
          </AnimatedPressable>
          <AnimatedPressable disabled={message === ""} onPress={() => {
            onSend(message);
            setMessage('')
          }}>
            <SendIcon />
          </AnimatedPressable>
        </View>
      </View>
    </View>
  );
}


