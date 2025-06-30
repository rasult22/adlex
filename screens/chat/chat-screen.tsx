import { default as AnimatedPressable, default as AppAnimatedPressable } from "@/components/button/animated-pressable";
import AddIcon from "@/icons/add";
import MenuIcon from "@/icons/menu";
import PlusIcon from "@/icons/plus";
import SendIcon from "@/icons/send";
import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
const _delay = 400
const _stiffness = 40
const _damping = 80

export default function ChatScreen() {
  return <Animated.View entering={FadeIn.duration(400).stiffness(_stiffness).damping(_damping).delay(_delay)} className="flex-1 bg-black">
      <Header />
      <View className="flex-1 items-center justify-center">
        <WelcomeMessage />
      </View>
      <ChatInput />
    </Animated.View>
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
  )
}

function WelcomeMessage () {
  return <Animated.View className="gap-[20px] px-4 py-6">
    <Animated.Text entering={FadeIn.duration(400).stiffness(_stiffness).damping(_damping).delay(_delay)} className="text-white text-[20px] leading-[120%] text-center font-inter-600">
      Wellcome, Alim!
    </Animated.Text>
    <Animated.Text entering={FadeIn.duration(400).stiffness(_stiffness).damping(_damping).delay(_delay * 2)} className="text-white text-[28px] leading-[120%] text-center font-inter-600">
      What can I help with?
    </Animated.Text>
    <Animated.Text entering={FadeIn.duration(400).stiffness(_stiffness).damping(_damping).delay(_delay * 3)} className="text-[#FFFFFFB8] text-[16px] max-w-[90%] mx-auto text-center leading-[24px] font-inter-500">
      AI assistant with exclusive data for your business
    </Animated.Text>
  </Animated.View>
}

function ChatInput() {
  const [message, setMessage] = useState('')
  return <View className="bg-[#1F1F1F] gap-[20px] rounded-t-[20px] p-4">
    <TextInput value={message} onChangeText={setMessage} placeholder="Start typing your question" placeholderTextColor="#FFFFFF7A" className="text-white text-[16px] leading-[24px] focus:outline-none" />
    <View className="flex-row justify-between">
      <AnimatedPressable onPress={() => {
        
      }}>
        <PlusIcon/>
      </AnimatedPressable>
      <AnimatedPressable disabled={message === ''} onPress={() => {

      }}>
        <SendIcon/>
      </AnimatedPressable>
    </View>
  </View>
}