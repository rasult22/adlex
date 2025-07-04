import * as React from "react"
import Svg, { Path, Rect } from "react-native-svg"
const CreditCardIcon = () => (
  <Svg
    width={28}
    height={28}
    fill="none"
  >
    <Rect width={28} height={28} fill="#2A9B19" rx={8} />
    <Path
      fill="#fff"
      fillRule="evenodd"
      d="M9 9c-.92 0-1.666.746-1.666 1.667v.833h13.333v-.833C20.667 9.747 19.921 9 19 9H9Zm13.334 1.667A3.333 3.333 0 0 0 19 7.334H9a3.333 3.333 0 0 0-3.333 3.333v6.667A3.333 3.333 0 0 0 9 20.666h10a3.333 3.333 0 0 0 3.334-3.334v-6.666Zm-1.667 2.5H7.334v4.167C7.334 18.254 8.08 19 9 19h10c.92 0 1.667-.746 1.667-1.666v-4.167ZM9 16.5c0-.46.373-.833.834-.833h.008a.833.833 0 0 1 0 1.667h-.008A.833.833 0 0 1 9 16.5Zm3.334 0c0-.46.373-.833.833-.833h1.667a.833.833 0 0 1 0 1.667h-1.667a.833.833 0 0 1-.833-.834Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default CreditCardIcon
