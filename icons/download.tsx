import * as React from "react"
import Svg, { Path } from "react-native-svg"
const DownloadIcon = ({size = 24, fill = '#A3A3A3'}: {size?: number, fill?:string}) => (
  <Svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
  >
    <Path
      fill={fill}
      fillRule="evenodd"
      d="M12 3a1 1 0 0 1 1 1v9.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-5 5a1 1 0 0 1-1.414 0l-5-5a1 1 0 1 1 1.414-1.414L11 13.586V4a1 1 0 0 1 1-1ZM4 16a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2a1 1 0 1 1 2 0v2a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-2a1 1 0 0 1 1-1Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default DownloadIcon
