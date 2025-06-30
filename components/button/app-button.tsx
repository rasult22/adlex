import { Text } from "react-native";
import AppAnimatedPressable from "./animated-pressable";

function AppButton({onPress, title}: {
  onPress: () => void,
  title: string
}) {
  return <AppAnimatedPressable className="bg-[#FFF] rounded-[20px] px-[20px] py-[16px] w-[100%]" onPress={onPress}>
    <Text className="text-[#1F1F1F] text-[16px] font-inter-400 text-center">{title}</Text>
  </AppAnimatedPressable>
}

export default AppButton