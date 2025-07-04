import * as React from "react"
import Svg, { Path, Rect } from "react-native-svg"
const RoleIcon = () => (
  <Svg
    width={28}
    height={28}
    fill="none"
  >
    <Rect width={28} height={28} fill="#9165FF" rx={8} />
    <Path
      fill="#fff"
      fillRule="evenodd"
      d="M11.5 7.333a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Zm-4.166 2.5a4.167 4.167 0 1 1 8.333 0 4.167 4.167 0 0 1-8.333 0Zm15.589 1.078a.833.833 0 0 1 0 1.178l-3.333 3.333a.833.833 0 0 1-1.179 0l-1.667-1.666a.834.834 0 0 1 1.179-1.179L19 13.655l2.744-2.744a.833.833 0 0 1 1.179 0Zm-13.09 6.422a2.5 2.5 0 0 0-2.5 2.5V21.5a.833.833 0 1 1-1.666 0v-1.667a4.167 4.167 0 0 1 4.167-4.166h3.333a4.167 4.167 0 0 1 4.167 4.166V21.5a.833.833 0 1 1-1.667 0v-1.667a2.5 2.5 0 0 0-2.5-2.5H9.834Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default RoleIcon
