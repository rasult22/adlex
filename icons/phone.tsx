import * as React from "react"
import Svg, { Path, Rect } from "react-native-svg"
const PhoneIcon = () => (
  <Svg
    width={28}
    height={28}
    fill="none"
  >
    <Rect width={28} height={28} fill="#34A853" rx={8} />
    <Path
      fill="#fff"
      fillRule="evenodd"
      d="M8.167 8.167a.833.833 0 0 0-.833.812 12.5 12.5 0 0 0 11.688 11.687.834.834 0 0 0 .812-.833v-2.769l-2.984-1.193-.885 1.474a.833.833 0 0 1-1.083.32 10 10 0 0 1-4.546-4.546.833.833 0 0 1 .319-1.084l1.475-.884-1.194-2.984H8.167Zm-1.768-.935A2.5 2.5 0 0 1 8.167 6.5H11.5c.341 0 .648.207.774.524l1.667 4.167a.833.833 0 0 1-.345 1.024l-1.395.837a8.335 8.335 0 0 0 2.748 2.748l.837-1.395a.833.833 0 0 1 1.024-.345l4.167 1.666a.833.833 0 0 1 .523.774v3.333a2.5 2.5 0 0 1-2.55 2.499A14.167 14.167 0 0 1 5.667 9a2.5 2.5 0 0 1 .732-1.768Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default PhoneIcon
