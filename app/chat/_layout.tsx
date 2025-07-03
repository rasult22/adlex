import AppAnimatedPressable from "@/components/button/animated-pressable";
import AddIcon from "@/icons/add";
import Logo from "@/icons/logo";
import MenuIcon from "@/icons/menu";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { Drawer } from "expo-router/drawer";
import { Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function ChatLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => <DrawerContent {...props} />}
        screenOptions={{
          drawerContentStyle: {
            backgroundColor: '#1F1F1F'
          },
          drawerContentContainerStyle: {
            backgroundColor: '#1F1F1F'
          },
          drawerStyle: {
            borderRightWidth: 1,
            borderRightColor: '#333',
            backgroundColor: '#1F1F1F',
            width: '70%',
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
          },
          headerStyle: {
            backgroundColor: "black",
            padding: 16,
            borderBottomWidth: 0,
          },
          headerLeft: () => <HeaderLeft />,
          headerRight: () => <HeaderRight />,
        }}
      >
        <Drawer.Screen
          name="index"
          options={{
            headerTitle: "",
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}

function HeaderLeft() {
  const navigation = useNavigation();
  return (
    <View className="pl-[16px]">
      <AppAnimatedPressable
        onPress={() => {
          navigation.dispatch(DrawerActions.toggleDrawer());
        }}
      >
        <MenuIcon />
      </AppAnimatedPressable>
    </View>
  );
}

function HeaderRight() {
  return (
    <View className="pr-[16px]">
      <AppAnimatedPressable onPress={() => {}}>
        <AddIcon />
      </AppAnimatedPressable>
    </View>
  );
}

import ApplicationIcon from "@/icons/application";
import BooksIcon from "@/icons/books";
import CloseIcon from "@/icons/close";
import FolderIcon from "@/icons/folder";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { LinearGradient } from 'expo-linear-gradient';

function DrawerContent (props: DrawerContentComponentProps) {
  return (
    <View className="py-3">
      <View className="flex-row items-center px-4 py-1">
        <Logo />
        <Text className="text-[20px] ml-2 text-white font-inter-600">AdlexAI</Text>
        <LinearGradient colors={['#9165FF', '#A579FF']} className="py-1 px-2 rounded-[20px] ml-3">
          <Text className="text-white text-[16px] font-inter-700-i">Plus</Text>
        </LinearGradient>
        <AppAnimatedPressable className="ml-auto" onPress={() => {
          props.navigation.dispatch(DrawerActions.closeDrawer());
        }}>
          <CloseIcon />
        </AppAnimatedPressable>
      </View>
      <View className="px-[6px] mt-3">
        <MenuItem icon={<AddIcon />} text="New chat" onPress={() => {
          props.navigation.navigate("/");
        }} />
        <HorizontalSeparator />
        <MenuItem icon={<ApplicationIcon />} text="Applications" onPress={() => {
          props.navigation.navigate("/");
        }} />
        <MenuItem icon={<BooksIcon />} text="Requests history" onPress={() => {
          props.navigation.navigate("/");
        }} />
        <MenuItem icon={<FolderIcon />} text="Documents" onPress={() => {
          props.navigation.navigate("/");
        }} />
        <HorizontalSeparator />
      </View>
    </View>
  );
}

function MenuItem({onPress, icon, text = 'Text' }: {
  onPress: () => void;
  icon?: React.ReactNode,
  text: string
}) {
  return (
    <AppAnimatedPressable
      className="p-3 flex-row gap-[10px] items-center hover:bg-[#333] rounded-[12px]"
      onPress={onPress}
    >
      {icon}
      <Text className="text-white text-[14px] font-inter-400">{text}</Text>
    </AppAnimatedPressable>)
}

function HorizontalSeparator() {
  return <View className="w-full h-[1px] bg-[#474747] my-2" />
}