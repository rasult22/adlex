import RightIcon from "@/icons/right";
import { Text, View } from "react-native";

function ApplicationStatusCard() {
  return <View className="bg-[#3D3D3D] rounded-[12px] p-3 gap-2">
    <View className="flex-row items-center justify-between">
      <Text className="text-[14px] font-inter-500 text-white">
        Сurrent application
      </Text>
      <RightIcon />
    </View>
    <Text className="text-[14px] font-inter-500 text-white">
      KYC verification 
    </Text>
    <View className="flex-row gap-1">
      <View className="h-[4px] flex-1 rounded-full bg-[#9165FF]" />
      <View className="h-[4px] flex-1 rounded-full bg-[#9165FF]" />
      <View className="h-[4px] flex-1 rounded-full bg-[#9165FF]" />
      <View className="h-[4px] flex-1 rounded-full bg-[#D9D9D9]" />
      <View className="h-[4px] flex-1 rounded-full bg-[#D9D9D9]" />
    </View>
  </View>
}

export default ApplicationStatusCard