import {
  fullBlack,
  fullWhite,
  grey100,
  grey300,
  grey400,
  grey500,
  lightBlue500,
  lightBlue700,
  pinkA200,
  white
} from 'material-ui/styles/colors'

import {fade} from 'material-ui/utils/colorManipulator'
import spacing from 'material-ui/styles/spacing'

export default {
  spacing: spacing,
  fontFamily: '',
  palette: {
    primary1Color: lightBlue500,
    primary2Color: lightBlue700,
    primary3Color: grey400,
    accent1Color: pinkA200,
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: fullWhite,
    secondaryTextColor: fullWhite,
    alternateTextColor: fullWhite,
    canvasColor: white,
    borderColor: grey300,
    disabledColor: fade(fullWhite, 0.3),
    pickerHeaderColor: fade(fullWhite, 0.12),
    clockCircleColor: fade(fullWhite, 0.12),
    shadowColor: fullBlack
  }
}
