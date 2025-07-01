import { Text } from "react-native";
import AppAnimatedPressable from "./animated-pressable";

function ChatButton({onPress, title}: {
  onPress: () => void,
  title: string
}) {
  return <AppAnimatedPressable className="bg-[#9165FF] rounded-[20px] px-[12px] py-[8px]" onPress={onPress}>
    <Text className="text-[#fff] text-[14px] font-inter-500 text-center">{title}</Text>
  </AppAnimatedPressable>
}

export default ChatButton