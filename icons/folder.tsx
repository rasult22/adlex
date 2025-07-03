import * as React from "react";
import Svg, { Path } from "react-native-svg";
const FolderIcon = () => (
  <Svg
    width={20}
    height={20}
    fill="none"
  >
    <Path
      fill="#fff"
      fillRule="evenodd"
      d="M4.167 4.167A.833.833 0 0 0 3.333 5v9.167a.833.833 0 0 0 .833.833h11.667a.833.833 0 0 0 .833-.833V7.5a.833.833 0 0 0-.833-.833H10a.833.833 0 0 1-.59-.244L7.156 4.167H4.166Zm-1.768-.935A2.5 2.5 0 0 1 4.167 2.5H7.5c.22 0 .433.088.59.244L10.344 5h5.488a2.5 2.5 0 0 1 2.5 2.5v6.667a2.5 2.5 0 0 1-2.5 2.5H4.167a2.5 2.5 0 0 1-2.5-2.5V5a2.5 2.5 0 0 1 .732-1.768Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default FolderIcon;
