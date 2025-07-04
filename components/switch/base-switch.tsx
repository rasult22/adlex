import { useState } from 'react';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';

interface BaseSwitchProps {
  value?: boolean;
  onValueChange?: (value: boolean) => void;
  activeColor?: string;
  inactiveColor?: string;
  thumbColor?: string;
}

export default function BaseSwitch({
  value = false,
  onValueChange,
  activeColor = '#9165FF',
  inactiveColor = '#636363',
}: BaseSwitchProps) {
  const [isEnabled, setIsEnabled] = useState(value);

  const toggleSwitch = () => {
    const newValue = !isEnabled;
    setIsEnabled(newValue);
    onValueChange?.(newValue);
  };

  const thumbStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withSpring(isEnabled ? 24 : 0, {
            damping: 17,
            stiffness: 120
          })
        }
      ]
    };
  });

  const containerStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withSpring(isEnabled ? activeColor : inactiveColor, {
        damping: 15,
        stiffness: 120
      })
    };
  });

  return (
    <Animated.View 
      className={`h-[32px] w-[56px] rounded-full justify-center p-1`}
      style={[containerStyle]}
      onTouchEnd={toggleSwitch}
    >
      <Animated.View 
        className="h-[24px] w-[24px] rounded-full shadow-sm bg-[#FFFFFF]"
        style={[thumbStyle]}
      />
    </Animated.View>
  );
}