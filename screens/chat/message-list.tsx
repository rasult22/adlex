import { FlatList, Text, View } from 'react-native';
import Markdown from 'react-native-markdown-display';

export default function MessageList({ messages }: { messages: Message[] }) {
  return (
    <FlatList
      data={messages}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{
        gap: 20,
        width: '100%',
        paddingHorizontal: 16,
        paddingVertical: 24
      }}
      style={{
        width: '100%'
      }}
      renderItem={({ item }) => item.role === 'user' ? <MessageUser key={'user-message-' + item.id} message={item} /> : <MessageAssistant key={'assistant-message-' + item.id} message={item} />}
    />
  )
}

function MessageUser({ message }: { message: Message }) {
  return (
    <View className='bg-[#1F1F1F] self-end py-3 px-[14px] rounded-full'>
      <Text className='text-white text-[15px] font-inter-400 leading-[22px]'>{message.content}</Text>
    </View>
  )
}
function MessageAssistant({ message }: { message: Message }) {
  return (
    <View className='self-start py-3'>
      <Markdown style={{
        body: {
          padding: 0,
          color: 'white',
          backgroundColor: 'transparent',
          fontFamily: 'Inter_400Regular',
          gap: 16
        },
        heading1: {
          fontFamily: 'Inter_900Black'
        },
        heading2: {
          fontFamily: 'Inter_800ExtraBold'
        },
        heading3: {
          fontFamily: 'Inter_700Bold'
        },
        heading4: {
          fontFamily: 'Inter_600SemiBold'
        },
        heading5: {
          fontFamily: 'Inter_500Medium'
        },
        heading6: {
          fontFamily: 'Inter_500Medium'
        },
        blockquote: {
          backgroundColor: 'transparent',
        },
        code_inline: {
          backgroundColor: 'transparent',
          fontFamily: 'monospace'
        },
        code_block: {
          backgroundColor: 'transparent',
          fontFamily: 'monospace'
        },
        fence: {
          backgroundColor: 'transparent',
        },
        link: {
          color: '#9165FF'
        },
        image: {
          position: 'static'
        },
        table: {
          borderColor: '#753EFF3D',
          fontSize: 12
        },
        thead: {
          padding: 2,
        },
        tr: {
          padding: 2,
          borderTopWidth: 0,
          borderBottomWidth: 1,
          borderColor: '#753EFF3D',
        }
      }}>
        {message.content}
      </Markdown>
    </View>
  )
}

export type Message = {
  id: string
  content: string,
  role: 'user' | 'assistant' | string
} 