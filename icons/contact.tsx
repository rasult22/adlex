import * as React from "react"
import Svg, { Path, Rect } from "react-native-svg"
const ContactIcon = () => (
  <Svg
    width={28}
    height={28}
    fill="none"
  >
    <Rect width={28} height={28} fill="#526ED3" rx={8} />
    <Path
      fill="#fff"
      fillRule="evenodd"
      d="M10.811 6.3A8.333 8.333 0 1 1 17.19 21.7 8.333 8.333 0 0 1 10.811 6.3Zm8.285 11.998a6.67 6.67 0 0 0-.382-9.012 6.667 6.667 0 0 0-9.81 9.012 4.167 4.167 0 0 1 3.43-1.798m-2.182 2.944a2.502 2.502 0 0 1 2.181-1.277h3.334a2.5 2.5 0 0 1 2.182 1.277 6.663 6.663 0 0 1-7.697 0Zm8.944-1.146a4.167 4.167 0 0 0-3.429-1.798h-3.333m-.69-6.524a3.333 3.333 0 1 1 4.713 4.714 3.333 3.333 0 0 1-4.714-4.714Zm2.356.69A1.667 1.667 0 1 0 14 14a1.667 1.667 0 0 0 0-3.334Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default ContactIcon
