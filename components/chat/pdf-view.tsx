import { getArtifactVersion } from "@/api/adk";
import CloseIcon from "@/icons/close";
import DownloadIcon from "@/icons/download";
import { useState } from "react";
import { Text, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming
} from 'react-native-reanimated';
import AppAnimatedPressable from "../button/animated-pressable";

export default function PDFView({
  type,
  filename,
  version,
  session_id
}: {
  type: "upload" | "download";
  filename: string;
  date?: string;
  session_id?: string
  version?: number | string
}) {
  const [isDownloading, setIsDownloading] = useState(false);
  
  // Animation values
  const progressValue = useSharedValue(0);
  const pulseScale = useSharedValue(1);

  const onDownload = async () => {
    if (session_id && !isDownloading) {
      setIsDownloading(true);
      progressValue.value = withTiming(1, { duration: 2000 });
      
      pulseScale.value = withRepeat(
        withSequence(
          withTiming(1.1, { duration: 600 }),
          withTiming(1, { duration: 600 })
        ),
        -1,
        true
      );

      try {
        const res = await getArtifactVersion(session_id, filename, version as string);
        if (res && res.inlineData) {
          const base64Data = formatBase64Data(res.inlineData.data, res.inlineData.mimeType);
          openBase64InNewTab(base64Data, res.inlineData.mimeType);
        }
      } finally {
        // Stop animations
        progressValue.value = withTiming(0, { duration: 300 });
        pulseScale.value = withTiming(1, { duration: 300 });
        setIsDownloading(false);
      }
    }
  };


  const progressStyle = useAnimatedStyle(() => ({
    transform: [{ 
      scale: interpolate(progressValue.value, [0, 1], [0, 1]) 
    }],
    opacity: progressValue.value
  }));

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }]
  }));

  const downloadButtonStyle = useAnimatedStyle(() => ({
    opacity: isDownloading ? 0.7 : 1
  }));

  return (
    <View className="flex-row items-center w-full">
      {/* PDF Icon with Progress Ring */}
      <View className="relative justify-center items-center">
        <Animated.View 
          style={pulseStyle}
          className="justify-center bg-[#EA4335] p-3 rounded-[16px] w-[52px] h-[52px]"
        >
          <Text className="text-white text-[14px] font-inter-500 leading-[18px] text-center">
            PDF
          </Text>
        </Animated.View>
        
        {/* Progress Ring */}
        {isDownloading && (
          <Animated.View 
            style={progressStyle}
            className="absolute inset-0 border-2 border-blue-400 rounded-[16px] w-[52px] h-[52px]"
          />
        )}
      </View>

      <View className="ml-[10px] flex-1 mr-[10px]">
        <Text numberOfLines={1} ellipsizeMode="tail" className="text-[16px] text-white font-inter-400 leading-[24px]">
          {filename}
        </Text>
        <View className="flex-row items-center">
          <Text numberOfLines={1} ellipsizeMode="tail" className="text-[14px] text-[#A3A3A3] font-inter-400 leading-[24px]">
            Version: {version}
          </Text>
          {isDownloading && (
            <Text className="text-[14px] text-blue-400 font-inter-400 leading-[24px] ml-2">
              • Downloading...
            </Text>
          )}
        </View>
      </View>

      <View className="ml-auto shrink-0">
        {type === "upload" && (
          <AppAnimatedPressable onPress={() => {}} className="ml-auto">
            <CloseIcon size={24} />
          </AppAnimatedPressable>
        )}
        {type === "download" && (
          <Animated.View style={downloadButtonStyle}>
            <AppAnimatedPressable 
              onPress={onDownload} 
              className="ml-auto"
              disabled={isDownloading}
            >
              <DownloadIcon size={24} />
            </AppAnimatedPressable>
          </Animated.View>
        )}
      </View>
    </View>
  );
}

export function openBase64InNewTab(dataUrl: string, mimeType: string) {
  try {
    if (!dataUrl) {
      return;
    }

    let base64DataString = dataUrl;

    if (dataUrl.startsWith('data:') && dataUrl.includes(';base64,')) {
      base64DataString = base64DataString.substring(
          base64DataString.indexOf(';base64,') + ';base64,'.length);
    }

    if (!mimeType || !base64DataString) {
      return;
    }

    const byteCharacters = atob(base64DataString);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);

    const blob = new Blob([byteArray], {type: mimeType});

    const blobUrl = URL.createObjectURL(blob);

    const newWindow = window.open(blobUrl, '_blank');
    if (newWindow) {
      newWindow.focus();
    } else {
      alert(
          'Pop-up blocked! Please allow pop-ups for this site to open the data in a new tab.');
    }
  } catch (e) {
    console.log(e)
    alert(
        'Could not open the data. It might be invalid or too large. Check the browser console for errors.');
  }
}

function formatBase64Data(data: string, mimeType: string) {
  const fixedBase64Data = fixBase64String(data);
  return `data:${mimeType};base64,${fixedBase64Data}`;
}

function fixBase64String(base64: string): string {
  // Replace URL-safe characters if they exist
  base64 = base64.replace(/-/g, '+').replace(/_/g, '/');

  // Fix base64 padding
  while (base64.length % 4 !== 0) {
    base64 += '=';
  }

  return base64;
}