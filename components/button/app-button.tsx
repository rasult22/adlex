import { Pressable, Text, } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

function AppButton({onPress, title}: {
  onPress: () => void,
  title: string
}) {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  const stylez = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    }
  })
  return <AnimatedPressable className="bg-[#FFF] rounded-[20px] px-[20px] py-[16px] w-[100%]" style={[stylez]} onPress={onPress} onPressIn={() => {
    scale.value = withSpring(0.95);
    opacity.value = withTiming(0.7, { duration: 150 });
  }} onPressOut={() => {
    setTimeout(() => {
      scale.value = withSpring(1);
      opacity.value = withTiming(1, { duration: 150 });
    }, 50)
  }}>
    <Text className="text-[#1F1F1F] text-[16px] font-normal text-center">{title}</Text>
  </AnimatedPressable>
}

export default AppButton