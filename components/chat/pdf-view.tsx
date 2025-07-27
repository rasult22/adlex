import { getArtifactVersion } from "@/api/adk";
import CloseIcon from "@/icons/close";
import DownloadIcon from "@/icons/download";
import { Text, View } from "react-native";
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
  const onDownload = async () => {
    if (session_id) {
      const res = await getArtifactVersion(session_id, filename, version as string)
      if (res && res.inlineData) {
        const base64Data = formatBase64Data(res.inlineData.data, res.inlineData.mimeType)
        openBase64InNewTab(base64Data, res.inlineData.mimeType)
      }
    }
  }
  return (
    <View className="flex-row items-center w-full">
      <View className="justify-center bg-[#EA4335] p-3 rounded-[16px] w-[52px] h-[52px]">
        <Text className="text-white text-[14px] font-inter-500 leading-[18px]">
          PDF
        </Text>
      </View>
      <View className="ml-[10px] flex-1 mr-[10px]">
        <Text numberOfLines={1} ellipsizeMode="tail" className="text-[16px] text-white font-inter-400 leading-[24px]">
          {filename}
        </Text>
        <Text numberOfLines={1} ellipsizeMode="tail" className="text-[14px] text-[#A3A3A3] font-inter-400 leading-[24px]">
          Version: {version}
        </Text>
      </View>
      <View className="ml-auto shrink-0">
        {type === "upload" && (
          <AppAnimatedPressable onPress={() => {}} className="ml-auto">
            <CloseIcon size={24} />
          </AppAnimatedPressable>
        )}
        {type === "download" && (
          <AppAnimatedPressable onPress={onDownload} className="ml-auto">
            <DownloadIcon size={24} />
          </AppAnimatedPressable>
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