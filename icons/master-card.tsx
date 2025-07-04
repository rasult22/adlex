import * as React from "react"
import Svg, { Path } from "react-native-svg"
const MasterCardIcon = () => (
  <Svg
    width={24}
    height={16}
    fill="none"
  >
    <Path fill="#FF5F00" d="M15.244 2.167h-6.49V13.83h6.49V2.167Z" />
    <Path
      fill="#EB001B"
      d="M9.167 8A7.404 7.404 0 0 1 12 2.169a7.417 7.417 0 1 0 0 11.662A7.404 7.404 0 0 1 9.167 8Z"
    />
    <Path
      fill="#F79E1B"
      d="M24 8a7.417 7.417 0 0 1-12 5.83A7.419 7.419 0 0 0 12 2.17a7.417 7.417 0 0 1 12 5.83ZM23.293 12.595v-.238h.097v-.049h-.245v.049h.096v.239h.052Zm.477 0v-.287h-.076l-.086.198-.087-.198h-.075v.287h.053v-.217l.081.188h.055l.081-.188v.217h.053Z"
    />
  </Svg>
)
export default MasterCardIcon
