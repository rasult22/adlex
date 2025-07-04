import * as React from "react"
import Svg, { Path, Rect } from "react-native-svg"
const EmailIcon = () => (
  <Svg
    width={28}
    height={28}
    fill="none"
  >
    <Rect width={28} height={28} fill="#3565EA" rx={8} />
    <Path
      fill="#fff"
      fillRule="evenodd"
      d="M7.427 9.45 14 13.832l6.574-4.382a.833.833 0 0 0-.74-.45H8.167a.833.833 0 0 0-.74.45Zm13.24 1.94-6.204 4.137a.833.833 0 0 1-.925 0L7.334 11.39v6.776c0 .46.373.833.833.833h11.667c.46 0 .833-.373.833-.833V11.39Zm-15-1.556a2.5 2.5 0 0 1 2.5-2.5h11.667a2.5 2.5 0 0 1 2.5 2.5v8.333a2.5 2.5 0 0 1-2.5 2.5H8.167a2.5 2.5 0 0 1-2.5-2.5V9.833Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default EmailIcon
