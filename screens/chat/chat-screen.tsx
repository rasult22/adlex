import AppAnimatedPressable, {
  default as AnimatedPressable,
} from "@/components/button/animated-pressable";
import CloseIcon from "@/icons/close";
import DownloadIcon from "@/icons/download";
import PlusIcon from "@/icons/plus";
import SendIcon from "@/icons/send";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  View,
} from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MessageList, { Message } from "./message-list";
const md = `# Hello how can i help you?`;
const _delay = 400;
const _stiffness = 40;
const _damping = 80;

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: md,
    },
  ]);

  return (
    <Animated.View
      entering={FadeIn.duration(400).stiffness(_stiffness).damping(_damping)}
      className="flex-1 bg-black"
    >
      <View className="flex-1 items-center justify-center">
        {messages.length === 0 ? (
          <WelcomeMessage key={"welcome"} />
        ) : (
          <MessageList key={"messages"} messages={messages} />
        )}
      </View>
      <ChatInput />
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

function ChatInput() {
  const [message, setMessage] = useState("");
  const { bottom } = useSafeAreaInsets();
  return (
    <View
      className="bg-[#1F1F1F] gap-[20px] rounded-t-[20px] p-2"
      style={{
        paddingBottom: bottom,
      }}
    >
      <View className="gap-3 bg-[#000] rounded-[22px] p-3">
        <PDFView type="upload" date="12.05.2025" filename="Скан_паспорта.pdf" />
        <PDFView type="upload" date="12.05.2025" filename="Скан_паспорта_2.pdf" />
      </View>
      <View className="px-2 pb-2">
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
          <AnimatedPressable disabled={message === ""} onPress={() => {}}>
            <SendIcon />
          </AnimatedPressable>
        </View>
      </View>
    </View>
  );
}

function PDFView({
  type,
  filename,
  date,
}: {
  type: "upload" | "download";
  filename: string;
  date: string;
}) {
  return (
    <View className="flex-row items-center">
      <View className="justify-center bg-[#EA4335] p-3 rounded-[16px] w-[52px] h-[52px]">
        <Text className="text-white text-[14px] font-inter-500 leading-[18px]">
          PDF
        </Text>
      </View>
      <View className="ml-[10px]">
        <Text className="text-[16px] text-white font-inter-400 leading-[24px]">
          {filename}
        </Text>
        <Text className="text-[14px] text-[#A3A3A3] font-inter-400 leading-[24px]">
          {date}
        </Text>
      </View>
      {type === "upload" && (
        <AppAnimatedPressable onPress={() => {}} className="ml-auto">
          <CloseIcon size={24} />
        </AppAnimatedPressable>
      )}
      {type === "download" && (
        <AppAnimatedPressable onPress={() => {}} className="ml-auto">
          <DownloadIcon size={24} />
        </AppAnimatedPressable>
      )}
    </View>
  );
}
