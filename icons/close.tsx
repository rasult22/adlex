import * as React from "react"
import Svg, { Path } from "react-native-svg"
const CloseIcon = () => (
  <Svg
    width={20}
    height={20}
    fill="none"
  >
    <Path
      fill="#A3A3A3"
      fillRule="evenodd"
      d="M4.41 4.41a.833.833 0 0 1 1.18 0L10 8.822l4.41-4.41a.833.833 0 1 1 1.18 1.178L11.177 10l4.411 4.412a.833.833 0 0 1-1.178 1.178L10 11.18l-4.41 4.41a.833.833 0 0 1-1.18-1.178L8.822 10l-4.41-4.41a.833.833 0 0 1 0-1.18Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default CloseIcon
