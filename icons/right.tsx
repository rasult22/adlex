import * as React from "react"
import Svg, { Path } from "react-native-svg"
const RightIcon = ({fill = "#fff", size = 20}: {fill?: string, size?: number}) => (
  <Svg
    viewBox="0 0 20 20"
    width={size}
    height={size}
    fill="none"
  >
    <Path
      fill={fill}
      fillRule="evenodd"
      d="M6.91 4.41a.833.833 0 0 1 1.179 0l5 5a.833.833 0 0 1 0 1.18l-5 5a.833.833 0 1 1-1.178-1.18L11.32 10l-4.41-4.41a.833.833 0 0 1 0-1.18Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default RightIcon
