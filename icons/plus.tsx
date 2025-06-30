import * as React from "react"
import Svg, { Path } from "react-native-svg"
const PlusIcon = () => (
  <Svg
    width={40}
    height={40}
    fill="none"
  >
    <Path
      fill="#fff"
      fillRule="evenodd"
      d="M20 12a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2h-6v6a1 1 0 1 1-2 0v-6h-6a1 1 0 1 1 0-2h6v-6a1 1 0 0 1 1-1Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default PlusIcon
