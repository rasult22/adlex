import * as React from "react"
import Svg, { Path, Rect } from "react-native-svg"
const SendIcon = () => (
  <Svg
    width={40}
    height={40}
    fill="none"
  >
    <Rect width={40} height={40} fill="#fff" fillOpacity={1} rx={20} />
    <Path
      fill="#000"
      fillRule="evenodd"
      d="M19.293 12.293a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.415 1.414L21 15.414V27a1 1 0 1 1-2 0V15.414l-2.292 2.293a1 1 0 1 1-1.414-1.414l4-4Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default SendIcon
