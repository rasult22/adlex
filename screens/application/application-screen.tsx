import AppAnimatedPressable from "@/components/button/animated-pressable";
import ApplicationStatusCard from "@/components/cards/application-status-card";
import LeftIcon from "@/icons/left";
import { useNavigation } from "@react-navigation/native";
import { SectionList, Text, View } from "react-native";
import { getUniqueID } from "react-native-markdown-display";
import Animated, { FadeIn } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const _stiffness = 40;
const _damping = 80;

export default function ApplicationScreen() {
  const { top } = useSafeAreaInsets()
  const data = [
    {
      title: 'May 2025',
      data: [
        {
          id: getUniqueID(),
          title: 'IFZA application',
          date: '18.05.2025',
          status: 'in-progress'
        },
        {
          id: getUniqueID(),
          title: 'IFZA application',
          date: '18.05.2025',
          status: 'success'
        },
        {
          id: getUniqueID(),
          title: 'IFZA application',
          date: '18.05.2025',
          status: 'rejected'
        },
      ]
    },
    {
      title: 'Feburary 2025',
      data: [
        {
          id: getUniqueID(),
          title: 'IFZA application',
          date: '18.05.2025',
          status: 'in-progress'
        },
        {
          id: getUniqueID(),
          title: 'IFZA application',
          date: '18.05.2025',
          status: 'success'
        },
        {
          id: getUniqueID(),
          title: 'IFZA application',
          date: '18.05.2025',
          status: 'rejected'
        },
      ]
    },
    {
      title: 'March 2025',
      data: [
        {
          id: getUniqueID(),
          title: 'IFZA application',
          date: '18.05.2025',
          status: 'in-progress'
        },
        {
          id: getUniqueID(),
          title: 'IFZA application',
          date: '18.05.2025',
          status: 'success'
        },
        {
          id: getUniqueID(),
          title: 'IFZA application',
          date: '18.05.2025',
          status: 'rejected'
        },
      ]
    },

  ]
  return (
    <Animated.View className="flex-1" entering={FadeIn.duration(400).stiffness(_stiffness).damping(_damping)} style={{paddingTop: top}}>
      <Header />
      <View className="p-4 flex-1 gap-3">
        
        <SectionList
          ListHeaderComponent={
            <ApplicationStatusCard />
          }
          sections={data}
          contentContainerStyle={{
            gap: 8,
          }}
          renderItem={({item}) => <ApplicationItem item={item} />}
          keyExtractor={(item) => item.id}
          renderSectionHeader={({ section }) => (
            <Text className="text-[#A3A3A3] text-[14px] font-inter-500 leading-[22px] px-3 pt-[12px] pb-[10px]">
              {section.title}
            </Text>
          )}
          />
      </View>
    </Animated.View>
  );
}

function Header() {
  return (
    <Animated.View className="flex-row items-center justify-between p-4">
      <BackButton />
      <Animated.Text className="text-white text-[16px] leading-[20px] font-inter-500 text-center">
        Applications
      </Animated.Text>
      <Animated.View className="opacity-0 w-[24px] h-[24px]" />
    </Animated.View>
  );
}

function BackButton() {
  const navigation = useNavigation();

  return (
    <AppAnimatedPressable
      onPress={() => {
        navigation.goBack();
      }}
    >
      <LeftIcon />
    </AppAnimatedPressable>
  );
}

function ApplicationItem({item}: {
  item: {
    id: string | number,
    title: string,
    date: string,
    status: 'rejected' | 'in-progress' | 'success' | string
  }
}) {
  return <Animated.View className="px-3 py-2 flex-row items-center justify-between bg-[#3D3D3D] rounded-[12px]">
    <View className="gap-1">
      <Text className="text-white text-[15px] font-inter-500 leading-[18px]">
        {item.title}
      </Text>
      <Text className="text-[#FFFFFFA3] text-[14px] font-inter-400">
        {item.date}
      </Text>
    </View>
    <StatusChip  status={item.status}/>
  </Animated.View>
}

function StatusChip({status}: {status: 'rejected' | 'in-progress' | 'success' | string}) {
  if (status === 'rejected') {
    return <Animated.View className="self-start px-3 py-2 bg-[#EA433533] rounded-full">
      <Text className="text-[#EA4335] text-[14px] font-inter-400">
        Rejected
      </Text>
    </Animated.View>
  }
  if (status === 'success') {
    return <Animated.View className="self-start px-3 py-2 bg-[#19BD441F] rounded-full">
      <Text className="text-[#19BD44] text-[14px] font-inter-400">
        Success
      </Text>
    </Animated.View>
  }
  
  return <Animated.View className="self-start px-3 py-2 bg-[#FFFFFF1F] rounded-full">
    <Text className="text-white text-[14px] font-inter-400">
      In progress
    </Text>
  </Animated.View>
  
}