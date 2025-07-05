import CloseIcon from "@/icons/close";
import DownloadIcon from "@/icons/download";
import { Text, View } from "react-native";
import AppAnimatedPressable from "../button/animated-pressable";

export default function PDFView({
  type,
  filename,
  date,
}: {
  type: "upload" | "download";
  filename: string;
  date: string;
}) {
  return (
    <View className="flex-row items-center">
      <View className="justify-center bg-[#EA4335] p-3 rounded-[16px] w-[52px] h-[52px]">
        <Text className="text-white text-[14px] font-inter-500 leading-[18px]">
          PDF
        </Text>
      </View>
      <View className="ml-[10px]">
        <Text className="text-[16px] text-white font-inter-400 leading-[24px]">
          {filename}
        </Text>
        <Text className="text-[14px] text-[#A3A3A3] font-inter-400 leading-[24px]">
          {date}
        </Text>
      </View>
      {type === "upload" && (
        <AppAnimatedPressable onPress={() => {}} className="ml-auto">
          <CloseIcon size={24} />
        </AppAnimatedPressable>
      )}
      {type === "download" && (
        <AppAnimatedPressable onPress={() => {}} className="ml-auto">
          <DownloadIcon size={24} />
        </AppAnimatedPressable>
      )}
    </View>
  );
}