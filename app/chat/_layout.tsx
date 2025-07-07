import AppAnimatedPressable from "@/components/button/animated-pressable";
import AddIcon from "@/icons/add";
import Logo from "@/icons/logo";
import MenuIcon from "@/icons/menu";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { Drawer } from "expo-router/drawer";
import { Platform, SectionList, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function ChatLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => <DrawerContent {...props} />}
        screenOptions={{
          sceneStyle: {
            backgroundColor: "transparent",
          },
          drawerContentStyle: {
            backgroundColor: "#1F1F1F",
          },
          drawerContentContainerStyle: {
            backgroundColor: "#1F1F1F",
          },
          drawerStyle: {
            borderRightWidth: 1,
            borderRightColor: "#333",
            backgroundColor: "#1F1F1F",
            width: "70%",
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
          },
          headerStyle: {
            backgroundColor: "black",
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
        <Drawer.Screen
          name="settings"
          options={{
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name="application"
          options={{
            headerShown: false,
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
  const router = useRouter()
  return (
    <View className="pr-[16px]">
      <AppAnimatedPressable onPress={() => {
        router.replace('/chat');
      }}>
        <AddIcon />
      </AppAnimatedPressable>
    </View>
  );
}

import ApplicationStatusCard from "@/components/cards/application-status-card";
import ApplicationIcon from "@/icons/application";
import BooksIcon from "@/icons/books";
import CloseIcon from "@/icons/close";
import FolderIcon from "@/icons/folder";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { getUniqueID } from "react-native-markdown-display";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function DrawerContent(props: DrawerContentComponentProps) {
  const { top, bottom } = useSafeAreaInsets();
  return (
    <View
      className="flex-1"
      style={{
        paddingTop: Platform.OS === "web" ? 12 : top,
        paddingBottom: bottom,
      }}
    >
      <View className="flex-row items-center px-4 py-1">
        <Logo />
        <Text className="text-[20px] ml-2 text-white font-inter-600">
          AdlexAI
        </Text>
        <LinearGradient
          colors={["#9165FF", "#A579FF"]}
          className="py-1 px-2 rounded-[20px] ml-3"
        >
          <Text className="text-white text-[16px] font-inter-700-i">Plus</Text>
        </LinearGradient>
        <AppAnimatedPressable
          className="ml-auto"
          onPress={() => {
            props.navigation.dispatch(DrawerActions.closeDrawer());
          }}
        >
          <CloseIcon />
        </AppAnimatedPressable>
      </View>
      <View className="px-[6px] flex-1 mt-3">
        <MenuItem
          icon={<AddIcon />}
          text="New chat"
          onPress={() => {
            props.navigation.navigate("/");
          }}
        />
        <HorizontalSeparator />
        <View className="pt-1 pb-3">
          <AppAnimatedPressable onPress={() => {
            props.navigation.navigate("application");
          }}>
            <ApplicationStatusCard />
          </AppAnimatedPressable>
        </View>
        <MenuItem
          icon={<ApplicationIcon />}
          text="Applications"
          onPress={() => {
            props.navigation.navigate("application");
          }}
        />
        <MenuItem
          icon={<BooksIcon />}
          text="Requests history"
          onPress={() => {
            props.navigation.navigate("/");
          }}
        />
        <MenuItem
          icon={<FolderIcon />}
          text="Documents"
          onPress={() => {
            props.navigation.navigate("/");
          }}
        />
        <HorizontalSeparator />
        <ConversationHistory />
        <HorizontalSeparator />
        <AppAnimatedPressable
          onPress={() => {
            props.navigation.navigate("settings");
          }}
        >
          <ProfileSection name="Alim Kenzhebekov" position="CEO" />
        </AppAnimatedPressable>
      </View>
    </View>
  );
}

function MenuItem({
  onPress,
  icon,
  text = "Text",
}: {
  onPress: () => void;
  icon?: React.ReactNode;
  text: string;
}) {
  return (
    <AppAnimatedPressable
      className="p-3 flex-row gap-[10px] items-center hover:bg-[#333] rounded-[12px]"
      onPress={onPress}
    >
      {icon}
      <Text className="text-white text-[14px] font-inter-400">{text}</Text>
    </AppAnimatedPressable>
  );
}

function HorizontalSeparator() {
  return <View className="w-full h-[1px] bg-[#474747] my-2" />;
}

function ConversationHistory() {
  const history = [
    {
      title: "Июнь 2025",
      data: [
        {
          id: getUniqueID(),
          title: "Company Types",
        },
        {
          id: getUniqueID(),
          title: "Choosing a Location",
        },
        {
          id: getUniqueID(),
          title: "Application Requirements",
        },
      ],
    },
    {
      title: "Май 2025",
      data: [
        {
          id: getUniqueID(),
          title: "Process and Timeline",
        },
        {
          id: getUniqueID(),
          title: "Ownership",
        },
        {
          id: getUniqueID(),
          title: "Documents",
        },
      ],
    },
    {
      title: "Апрель 2025",
      data: [
        {
          id: getUniqueID(),
          title: "Process and Timeline",
        },
        {
          id: getUniqueID(),
          title: "Ownership",
        },
        {
          id: getUniqueID(),
          title: "Documents",
        },
      ],
    },
  ];
  return (
    <SectionList
      keyExtractor={(item) => item.id}
      sections={history}
      renderItem={({ item }) => (
        <MenuItem text={item.title} onPress={() => {}} />
      )}
      contentContainerStyle={{
        gap: 4,
        flex: 1,
      }}
      renderSectionHeader={({ section }) => (
        <Text className="text-[#A3A3A3] text-[14px] font-inter-500 leading-[22px] px-3 pt-[12px] pb-[10px]">
          {section.title}
        </Text>
      )}
    />
  );
}

function ProfileSection({
  name,
  position,
}: {
  name: string;
  position?: string;
}) {
  return (
    <View className="py-2 px-3 flex-row gap-[10px] items-center">
      <View className="bg-[#526ED3] py-[5px] px-[6px] rounded-full">
        <Text className="text-white text-[14px] uppercase font-inter-600 leading-[22px]">
          {name[0]}
          {name.split(" ")[1] && name.split(" ")[1][0]}
        </Text>
      </View>
      <View>
        <Text className="text-[14px] font-inter-400 text-white leading-[22px]">
          {name}
        </Text>
        <Text className="text-[12px] font-inter-400 text-[#A3A3A3] leading-[22px]">
          {position}
        </Text>
      </View>
    </View>
  );
}
