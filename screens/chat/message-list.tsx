import { AppMessageEvent } from "@/api/adk";
import ChatButton from "@/components/button/chat-button";
import PDFView from "@/components/chat/pdf-view";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { FlatList, Text } from "react-native";
import Markdown from "react-native-markdown-display";
import Animated, { FadeIn, LinearTransition } from "react-native-reanimated";
const _delay = 400;
const _stiffness = 40;
const _damping = 80;
const _layout = LinearTransition.springify().damping(40);

export default function MessageList({
  messages,
  session_id,
}: {
  messages: AppMessageEvent[];
  session_id: string;
}) {
  const ref = useRef<FlatList<AppMessageEvent>>(null);

  useEffect(() => {
    if (ref.current)
      setTimeout(() => {
        if (ref.current) ref.current.scrollToEnd({ animated: true });
      }, 500);
  }, [messages]);
  return (
    <FlatList
      ref={ref}
      data={messages}
      keyExtractor={(item, index) => {
        return item.id + item.invocationId + item.timestamp
      }}
      contentContainerStyle={{
        width: "100%",
        paddingHorizontal: 16,
        paddingTop: 24,
      }}
      style={{
        width: "100%",
      }}
      renderItem={({ item }) => {
        return (
          <>
            {item.author !== "user" && (
              <MessageAssistant session_id={session_id} message={item} />
            )}

            {item.author === "user" && item.content.role !== "maybe_user" && (
              <MessageUser
                message={
                  item.content.parts[0].text ||
                  item.content.parts[0].functionCall?.name ||
                  ""
                }
              />
            )}
          </>
        );
      }}
    />
  );
}

function MessageUser({ message }: { message: string }) {
  return (
    <Animated.View className="self-end pb-3">
      <Animated.View
        layout={_layout}
        entering={FadeIn.duration(400)
          .delay(_delay * 1)
          .stiffness(_stiffness)
          .damping(_damping)}
        className="bg-[#1F1F1F] self-end py-3 px-[14px] rounded-[20px]"
      >
        <Text className="text-white text-[15px] font-inter-400 leading-[22px]">
          {message}
        </Text>
      </Animated.View>
    </Animated.View>
  );
}
function MessageAssistant({
  message,
  session_id,
}: {
  message: AppMessageEvent;
  session_id: string;
}) {
  let messageInner = "";
  let agentAction = false;
  let fileDownload = false
  let functionName = message.content.parts[0].functionCall?.name;
  let functionResponse = message.content.parts[0].functionResponse?.name;
  let functionResponseData = message.content.parts[0].functionResponse?.response;
  let agentName = message.content.parts[0].functionCall?.args.agent_name;
  let text = message.content.parts[0].text;
  if (functionName) {
    agentAction = true;
    let agentNameFormatted =
      agentName === "apply_agent"
        ? "Apply Process Agent"
        : agentName === "root_agent"
          ? "Basic Assistant"
          : agentName;
    if (functionName === "transfer_to_agent") {
      messageInner = "Transfering to an agent:" + " -> " + agentNameFormatted;
    } else if (functionName === "rag_search_tool") {
      messageInner = "Retrieving information...";
    } else {
      messageInner = functionName;
    }
  } else if (text) {
    messageInner = text;
  }
  if (functionResponse && functionResponse === 'provide_all_licenses' && functionResponseData) {
    fileDownload = true
  }
  else if (functionResponse) {
    agentAction = true;
    messageInner = "Done!";
  }
  return (
    <Animated.View layout={_layout} className="self-start py-3 w-full">
      {
        fileDownload && functionResponse && functionResponseData && functionResponseData.files.length > 0 && 
        <Animated.View className="gap-4">
          {functionResponseData.files.map(file => {
            return <PDFView session_id={session_id} type="download" filename={file.filename} version={file.version}/>
          })}
        </Animated.View>
      }
      {!agentAction && !fileDownload && message.author === "root_agent" && (
        <Text className="text-[#9165FF] text-[12px] font-inter-800">
          Basic Assistant
        </Text>
      )}
      {!agentAction && !fileDownload && message.author === "apply_agent" && (
        <Text className="text-[#9165FF] text-[12px] font-inter-800">
          Apply Agent
        </Text>
      )}
      {!agentAction && !fileDownload && (
        <FormattedMarkdown session_id={session_id} message={messageInner} />
      )}
      {agentAction && (
        <Animated.View>
          <Text className="underline text-white font-inter-400-i opacity-75">
            {messageInner}
          </Text>
        </Animated.View>
      )}
    </Animated.View>
  );
}

export type Message = {
  id: string;
  content: string;
  role: "user" | "assistant" | string;
};

function FormattedMarkdown({
  message,
  session_id,
}: {
  message: string;
  session_id: string;
}) {
  const router = useRouter();
  return (
    <Markdown
      rules={{
        link: (node) => {
          const link = node.attributes.href;
          const text = node.children[0].content;
          return (
            <ChatButton
              title={text}
              onPress={() => {
                if (link === "pay-now") {
                  router.push(`/payment?session_id=${session_id}` as any);
                  // payment logic
                }
                if (link === "kyc-link") {
                  router.push(`/kyc?session_id=${session_id}` as any);
                }
              }}
            />
          );
        },
      }}
      style={{
        body: {
          padding: 0,
          color: "white",
          backgroundColor: "transparent",
          fontFamily: "Inter_400Regular",
          gap: 16,
        },
        heading1: {
          fontFamily: "Inter_900Black",
        },
        heading2: {
          fontFamily: "Inter_800ExtraBold",
        },
        heading3: {
          fontFamily: "Inter_700Bold",
        },
        heading4: {
          fontFamily: "Inter_600SemiBold",
        },
        heading5: {
          fontFamily: "Inter_500Medium",
        },
        heading6: {
          fontFamily: "Inter_500Medium",
        },
        blockquote: {
          backgroundColor: "transparent",
        },
        code_inline: {
          backgroundColor: "transparent",
          fontFamily: "monospace",
        },
        code_block: {
          backgroundColor: "transparent",
          fontFamily: "monospace",
        },
        fence: {
          backgroundColor: "transparent",
        },
        link: {
          color: "white",
          textDecorationLine: "none",
          paddingHorizontal: 12,
          paddingVertical: 8,
          borderRadius: 12,
          backgroundColor: "#9165FF",
        },
        image: {
          position: "static",
        },
        hr: {
          backgroundColor: "#ffffff40",
        },
        table: {
          borderColor: "#753EFF3D",
          fontSize: 12,
        },
        thead: {
          padding: 2,
          fontFamily: "Inter_600SemiBold",
        },
        th: {
          fontFamily: "Inter_600SemiBold",
        },
        tr: {
          padding: 2,
          borderTopWidth: 0,
          borderBottomWidth: 1,
          borderColor: "#753EFF3D",
        },
      }}
    >
      {message}
    </Markdown>
  );
}
