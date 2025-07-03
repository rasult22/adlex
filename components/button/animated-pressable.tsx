import * as Haptics from 'expo-haptics';
import { ReactNode } from "react";
import { Pressable, StyleProp, ViewStyle } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

function AppAnimatedPressable({onPress, children, className, style, disabled = false}: {
  onPress: () => void,
  className?: string
  children: ReactNode,
  disabled?: boolean,
  style?: StyleProp<ViewStyle>
}) {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  const stylez = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: disabled ? 0.7 : opacity.value,
    }
  })
  return <AnimatedPressable disabled={disabled} className={className} style={[stylez, style]} onPress={() => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
    onPress()
  }} onPressIn={() => {
    scale.value = withSpring(0.95);
    opacity.value = withTiming(0.7, { duration: 150 });
  }} onPressOut={() => {
    setTimeout(() => {
      scale.value = withSpring(1);
      opacity.value = withTiming(1, { duration: 150 });
    }, 50)
  }}>
    {children}
  </AnimatedPressable>
}

export default AppAnimatedPressable;