import { useEffect } from 'react';
import { Text } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useSystem } from '../../store/system';
const duration = 2000;
export const Toast = () => {
  const toast = useSystem(x => x.toast)
  const setToast = useSystem(x => x.setToast)

  useEffect(() => {
    const timer = setTimeout(() => {
      setToast({
        ...toast,
        open: false,
      });
    }, duration);

    return () => clearTimeout(timer);
  }, [toast, setToast]);

  return (
    toast.open && (
      <Animated.View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          zIndex: 2001,
        }}
        className="flex items-center justify-center w-full h-full"
        entering={FadeIn.duration(300)}
        exiting={FadeOut.duration(300)}
      >
        <Animated.View style={{
           alignSelf: 'center',
           paddingHorizontal: 24,
           paddingVertical: 12,
           borderRadius: 100,
        }} className="bg-[rgba(31,31,31,0.98)] shadow-z-3d-inner">
          <Text className='text-white text-[16px] font-jost-400'>
            {toast.message}
          </Text>
        </Animated.View>
      </Animated.View>
    )
  );
};