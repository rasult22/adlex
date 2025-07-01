import { FlatList, Text } from 'react-native';
import Markdown from 'react-native-markdown-display';
import Animated, { FadeIn, LinearTransition } from 'react-native-reanimated';
const _delay = 400
const _stiffness = 40
const _damping = 80
const _layout = LinearTransition.damping(40)

export default function MessageList({ messages }: { messages: Message[] }) {
  return (
    <FlatList
      inverted
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
      renderItem={({ item }) => {
        return <>
          {item.role === 'assistant' && <MessageAssistant message={item} />}
          {item.role === 'user' && <MessageUser message={item} />}
        </>
      }}
    />
  )
}

function MessageUser({ message }: { message: Message }) {
  return (
    <Animated.View entering={FadeIn.duration(400).delay(_delay * 1).stiffness(_stiffness).damping(_damping)} className='bg-[#1F1F1F] self-end py-3 px-[14px] rounded-full'>
      <Text className='text-white text-[15px] font-inter-400 leading-[22px]'>{message.content}</Text>
    </Animated.View>
  )
}
function MessageAssistant({ message }: { message: Message }) {
  return (
    <Animated.View className='self-start py-3 w-full'>
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
        hr: {
          backgroundColor: '#ffffff40'
        },
        table: {
          borderColor: '#753EFF3D',
          fontSize: 12
        },
        thead: {
          padding: 2,
          fontFamily: 'Inter_600SemiBold'
        },
        th: {
          fontFamily: 'Inter_600SemiBold'
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
    </Animated.View>
  )
}

export type Message = {
  id: string
  content: string,
  role: 'user' | 'assistant' | string
} 