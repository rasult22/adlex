import AppAnimatedPressable from "@/components/button/animated-pressable";
import BaseSwitch from "@/components/switch/base-switch";
import AIStarIcon from "@/icons/ai-star";
import ContactIcon from "@/icons/contact";
import CreditCardIcon from "@/icons/credit-card";
import DoubleCheckIcon from "@/icons/double-check";
import DownIcon from "@/icons/down";
import EmailIcon from "@/icons/email";
import LanguageIcon from "@/icons/language";
import LeftIcon from "@/icons/left";
import MasterCardIcon from "@/icons/master-card";
import PhoneIcon from "@/icons/phone";
import PlusSubIcon from "@/icons/plus-sub";
import RightIcon from "@/icons/right";
import RoleIcon from "@/icons/role";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView, Text, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

const _delay = 400;
const _stiffness = 40;
const _damping = 80;

export default function SettingsScreen() {
  return (
    <Animated.View
      entering={FadeIn.duration(400).stiffness(_stiffness).damping(_damping)}
      className="flex-1 bg-black"
    >
      <Header />
      <ScrollView>
        <View className="p-4 gap-[24px]">
          <ProfileCard />
          <Personalization />
          <Payment />
          <Settings />
          <Account />
          <AppAnimatedPressable className="self-start" onPress={() => {}}>
            <Text className="text-[#EA4335] p-3">
              Log Out
            </Text>
          </AppAnimatedPressable>
        </View>
      </ScrollView>
    </Animated.View>
  );
}

function Header() {
  return (
    <Animated.View className="flex-row items-center justify-between p-4">
      <BackButton />
      <Animated.Text className="text-white text-[16px] leading-[20px] font-inter-500 text-center">
        Settings
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

function ProfileCard() {
  const name = "Alim Kenzhebekov";
  return (
    <View className="items-center">
      <View className="bg-[#526ED3] py-[12px] px-[14px] rounded-full">
        <Text className="text-white text-[32px] uppercase font-inter-600 leading-[50px]">
          {name[0]}
          {name.split(" ")[1] && name.split(" ")[1][0]}
        </Text>
      </View>
      <View className="flex-row items-center mt-3">
        <Text className="text-white text-[16px] font-inter-400">Alim Kenzhebekov</Text>
        <LinearGradient
          colors={["#9165FF", "#A579FF"]}
          className="py-1 px-2 rounded-[20px] ml-2"
        >
          <Text className="text-white text-[14px] font-inter-700-i">Plus</Text>
        </LinearGradient>
      </View>
      <Text className="text-[#A3A3A3] text-[14px] font-inter-400 leading-[22px]">CEO</Text>
    </View>
  );
}


function Personalization() {
  return <View>
    <View className="flex-row items-center gap-2">
      <Text className="text-white text-[14px] font-inter-400">Personalization</Text>
      <AIStarIcon size={16}/>
    </View>
    <View className="bg-[#1F1F1F] rounded-[12px] mt-3">
      <View className="py-2 px-3 flex-row items-center">
        <ContactIcon />
        <Text className="ml-3 text-white text-[15px] font-inter-400 leading-[18px]">Name</Text>
        <Text className="text-[15px] font-inter-400 leading-[18px] text-white opacity-[0.48] ml-auto">Alim</Text>
      </View>
      <View className="py-2 px-3 flex-row items-center">
        <RoleIcon />
        <Text className="ml-3 text-white text-[15px] font-inter-400 leading-[18px]">Role in company</Text>
        <View className="ml-auto flex-row items-center gap-2">
          <Text className="text-[15px] font-inter-400 leading-[18px] text-white">CEO</Text>
          <DownIcon />
        </View>
      </View>
      <View className="py-2 px-3 flex-row items-center">
        <LanguageIcon />
        <Text className="ml-3 text-white text-[15px] font-inter-400 leading-[18px]">Language</Text>
        <View className="ml-auto flex-row items-center gap-2">
          <Text className="text-[15px] font-inter-400 leading-[18px] text-white">English</Text>
          <DownIcon />
        </View>
      </View>
    </View>
    <Text className="text-[#8B8B8B] text-[12px] leading-[18px] mt-2 ml-2 font-inter-400">Customise the assistant to suit your needs</Text>
  </View>
}


function Payment() {
  return <View>
    <View className="flex-row items-center justify-between">
      <Text className="text-white text-[14px] font-inter-400">Payment</Text>
      <AppAnimatedPressable onPress={() => {}} className="flex-row items-center gap-1">
        <Text className="text-[#9165FF] text-[14px] font-inter-400">Payment history</Text>
        <RightIcon fill="#9165FF" />
      </AppAnimatedPressable>
    </View>
    <View className="bg-[#1F1F1F] rounded-[12px] mt-3">
      <View className="py-2 px-3 flex-row items-center">
        <PlusSubIcon />
        <Text className="ml-3 text-white text-[15px] font-inter-400 leading-[18px]">Plus Sub</Text>
        <View className="ml-auto flex-row items-center gap-2">
          <DoubleCheckIcon />
          <Text className="text-[15px] font-inter-400 leading-[18px] text-[#9165FF]">Active</Text>
        </View>
      </View>
      <View className="py-2 px-3 flex-row items-center">
        <CreditCardIcon />
        <Text className="ml-3 text-white text-[15px] font-inter-400 leading-[18px]">Payment method</Text>
        <View className="ml-auto flex-row items-center gap-2">
          <MasterCardIcon />
          <Text className="text-[15px] font-inter-400 leading-[18px] text-white">0758</Text>
        </View>
      </View>
    </View>
    <View className="mt-2 ml-2 flex-row items-center gap-2">
      <Text className="text-[#8B8B8B] text-[12px] leading-[18px] font-inter-400">Next payment is May 13</Text>
      <AppAnimatedPressable onPress={() => {}} className="flex-row items-center gap-1">
        <Text className="text-[12px] font-inter-400 leading-[18px] text-[#9165FF]">Edit</Text>
        <RightIcon fill="#9165FF" size={18}/>
      </AppAnimatedPressable>
    </View>
  </View>
}

function Settings () {
  return <View>
      <Text className="text-white text-[14px] font-inter-400">Settings</Text>
       <View className="bg-[#1F1F1F] rounded-[12px] mt-3">
      <View className="py-2 px-3 flex-row items-center">
        <PlusSubIcon />
        <Text className="ml-3 text-white text-[15px] font-inter-400 leading-[18px]">Dark appearance</Text>
        <View className="ml-auto flex-row items-center gap-2">
          <BaseSwitch value={true} />
        </View>
      </View>
      <View className="py-2 px-3 flex-row items-center">
        <CreditCardIcon />
        <Text className="ml-3 text-white text-[15px] font-inter-400 leading-[18px]">Notifications</Text>
        <View className="ml-auto flex-row items-center gap-2">
          <BaseSwitch value={false} />
        </View>
      </View>
    </View>
  </View> 
}
function Account () {
  return <View>
    <View className="flex-row items-center justify-between">
      <Text className="text-white text-[14px] font-inter-400">Account</Text>
      <AppAnimatedPressable onPress={() => {}} className="flex-row items-center gap-1">
        <Text className="text-[#9165FF] text-[14px] leading-[18px] font-inter-400">Edit</Text>
        <RightIcon size={18} fill="#9165FF" />
      </AppAnimatedPressable>
    </View>
    <View className="bg-[#1F1F1F] rounded-[12px] mt-3">
      <View className="py-2 px-3 flex-row items-center">
        <EmailIcon />
        <Text className="ml-3 text-white text-[15px] font-inter-400 leading-[18px]">E-mail</Text>
        <Text className="text-[15px] font-inter-400 leading-[18px] text-white opacity-[0.48] ml-auto">maxholding007@gmail.com</Text>
      </View>
      <View className="py-2 px-3 flex-row items-center">
        <PhoneIcon />
        <Text className="ml-3 text-white text-[15px] font-inter-400 leading-[18px]">Phone</Text>
        <Text className="text-[15px] font-inter-400 leading-[18px] text-white opacity-[0.48] ml-auto">+7 (999) 999-99-99</Text>
      </View>
    </View>
  </View>
}