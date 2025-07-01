import {
  default as AnimatedPressable,
  default as AppAnimatedPressable,
} from "@/components/button/animated-pressable";
import AddIcon from "@/icons/add";
import MenuIcon from "@/icons/menu";
import PlusIcon from "@/icons/plus";
import SendIcon from "@/icons/send";
import { useEffect, useState } from "react";
import { Text, TextInput, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import MessageList, { Message } from "./message-list";
const md = `# H1 Heading
## H2 Heading

### H3 Heading

#### H4 Heading

##### H5 Heading

###### H6 Heading
`;
const _delay = 400;
const _stiffness = 40;
const _damping = 80;

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
      setMessages((m) => [
        ...m,
        {
          id: "1342234234",
          role: "user",
          content: "Hello, world!",
        },
      ].reverse());
  }, []);
  useEffect(() => {
    // Create an initial message
    const messageId = "md-message";
    setMessages((m) => [
      ...m,
      {
        id: messageId,
        role: 'assistant',
        content: ""
      }
    ].reverse());
    
    // Update the same message by appending one character at a time
    Array.from({length: md.length}).forEach((_, index) => {
      setTimeout(() => {
        setMessages((m) => {
          return m.map(msg => {
            if (msg.id === messageId) {
              return {
                ...msg,
                content: md.substring(0, index + 1)
              };
            }
            return msg;
          });
        });
      }, index * 50); // Add a delay between updates for a typing effect
    });
  }, []);

  return (
    <Animated.View
      entering={FadeIn.duration(400)
        .stiffness(_stiffness)
        .damping(_damping)
        .delay(_delay)}
      className="flex-1 bg-black"
    >
      <Header />
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

function Header() {
  return (
    <View className="flex-row items-center justify-between p-4 bg-black">
      <AppAnimatedPressable onPress={() => {}}>
        <MenuIcon />
      </AppAnimatedPressable>
      <Text className="text-white text-lg font-bold" />
      <AppAnimatedPressable onPress={() => {}}>
        <AddIcon />
      </AppAnimatedPressable>
    </View>
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
  return (
    <View className="bg-[#1F1F1F] gap-[20px] rounded-t-[20px] p-4">
      <TextInput
        value={message}
        onChangeText={setMessage}
        placeholder="Start typing your question"
        placeholderTextColor="#FFFFFF7A"
        className="text-white text-[16px] leading-[24px] focus:outline-none"
      />
      <View className="flex-row justify-between">
        <AnimatedPressable onPress={() => {}}>
          <PlusIcon />
        </AnimatedPressable>
        <AnimatedPressable disabled={message === ""} onPress={() => {}}>
          <SendIcon />
        </AnimatedPressable>
      </View>
    </View>
  );
}
