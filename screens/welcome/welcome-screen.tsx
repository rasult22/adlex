import AppButton from "@/components/button/app-button";
import AIStarIcon from "@/icons/ai-star";
import Logo from "@/icons/logo";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, { Easing, FadeInDown, FadeInLeft, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';

export default function WelcomeScreen() {
  const [showIntro, setShowIntro] = useState(false)

  return <View className="flex-1 items-center justify-center bg-black">
    <Welcome onNext={() => setShowIntro(true)} />
    {showIntro &&
      <Intro />
    }
  </View>
}

const _delay = 400
const _stiffness = 40
const _damping = 80

function Welcome({onNext}: {onNext: () => void}) {
  return <Animated.View className="flex-1 items-center justify-center bg-black" style={StyleSheet.absoluteFillObject}>
    <Animated.View entering={FadeInDown.duration(400).delay(_delay).stiffness(_stiffness).damping(_damping)} className="flex-row items-center gap-[10px]">
      <Logo />
      <Text className="text-white text-[24px] font-inter-600 text-center">AdlexAI</Text>
    </Animated.View>
    <Animated.View entering={FadeInDown.duration(400).delay(_delay * 2).stiffness(_stiffness).damping(_damping)} className="flex-row items-center gap-[10px] mt-[20px]">
      <Text className="text-white text-[24px] font-inter-600 text-center">Welcome to Adlex AI</Text>
    </Animated.View>
    <Animated.View entering={FadeInDown.duration(400).delay(_delay * 3).stiffness(_stiffness).damping(_damping)} className="flex-row items-center gap-[10px] mt-[20px] px-[20%]">
      <Text className="text-white text-[16px] font-inter-600 text-center leading-[22px]">AI-powered. Hassle-free. Always by your side.</Text>
    </Animated.View>
    <Animated.View entering={FadeInDown.duration(400).delay(_delay * 4).stiffness(_stiffness).damping(_damping)} className="flex-row items-center gap-[10px] mt-[20px] px-[10%]">
      <Text className="text-[#FFFFFFB8] text-[16px] font-inter-400 text-center leading-[24px]">Your personal AI guide assisting on every step of the process</Text>
    </Animated.View>
    <Animated.View entering={FadeInDown.duration(400).delay(_delay * 5).stiffness(_stiffness).damping(_damping)} className="flex-row w-full items-center gap-[10px] mt-[20px] px-[10%]">
      <AppButton title="Next" onPress={onNext} />
    </Animated.View>
  </Animated.View>
}


const getRandomOpacity = () => {
  const min = 0.5
  const max = 1
  return Math.random() * (max - min) + min
}
function Intro() {
  const router = useRouter()
  const opacity = useSharedValue(1);
  const opacity2 = useSharedValue(1);

  useEffect(() => {
     opacity.value = withRepeat(
      withTiming(getRandomOpacity(), { duration: 1500, easing: Easing.linear }),
      -1, // infinite repeats
      true // reverse (goes back and forth)
    );
     opacity2.value = withRepeat(
      withTiming(getRandomOpacity(), { duration: 1400, easing: Easing.linear }),
      -1, // infinite repeats
      true // reverse (goes back and forth)
    );
  }, [])
  const stylez = useAnimatedStyle(() => {
    return {
      opacity: opacity.value
    }
  })
  const stylez2 = useAnimatedStyle(() => {
    return {
      opacity: opacity2.value
    }
  })
  return <Animated.View entering={FadeInLeft.duration(400)} className="flex-1 items-center w-full justify-center bg-black overflow-hidden">
    <Animated.View style={[stylez]} className="absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] w-[526px] h-[526px] rounded-full bg-black shadow-intro-circle">
    </Animated.View>
    <Animated.View style={[stylez2]} className="absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] w-[434px] h-[434px] rounded-full bg-black shadow-intro-circle">
    </Animated.View>
    <Animated.View entering={FadeInDown.duration(400).delay(_delay).stiffness(_stiffness).damping(_damping)} className="flex-row items-center gap-[10px]">
      <Logo />
      <Text className="text-white text-[24px] font-inter-600 text-center">AdlexAI</Text>
    </Animated.View>
    <Animated.View entering={FadeInDown.duration(400).delay(_delay * 2).stiffness(_stiffness).damping(_damping)} className="flex-row items-center mt-[20px] gap-[10px]">
      <AIStarIcon />
      <Text className="text-white text-[24px] font-inter-600 text-center">AI-personalization</Text>
    </Animated.View>
    <Animated.View entering={FadeInDown.duration(400).delay(_delay * 3).stiffness(_stiffness).damping(_damping)} className="flex-row items-center gap-[10px] mt-[20px] px-[10%]">
      <Text className="text-[#FFFFFFB8] text-[16px] font-inter-400 text-center leading-[24px]">Personalized guidance begins now — we’ll handle the rest</Text>
    </Animated.View>
    <Animated.View entering={FadeInDown.duration(400).delay(_delay * 4).stiffness(_stiffness).damping(_damping)} className="flex-row w-full items-center gap-[10px] mt-[20px] px-[10%]">
      <AppButton title="Start" onPress={() => {
        router.navigate('/chat')
      }} />
    </Animated.View>
  </Animated.View>
}

