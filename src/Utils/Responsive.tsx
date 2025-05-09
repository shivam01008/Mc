import {Dimensions, PixelRatio, Platform} from 'react-native';
import { moderateVerticalScale } from 'react-native-size-matters';

const uiDesignDeviceWidth = 414;
const uiDesignDeviceHeight = 736;

const uiDesignMinCompatibleDeviceWidth = 375; // iPhone SE (2nd Generation)
const uiDesignMinCompatibleDeviceHeight = 667; // iPhone SE (2nd Generation)

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const deviceTooSmallForDesignBaseValues =
  deviceHeight < uiDesignMinCompatibleDeviceHeight;

const scaleToDeviceWidth = (designBaseValue: number): number => {
  let scaledValue = designBaseValue;
  if (deviceTooSmallForDesignBaseValues && designBaseValue !== 0) {
    scaledValue = (deviceWidth * designBaseValue) / uiDesignDeviceWidth;
  }
  return PixelRatio.roundToNearestPixel(scaledValue);
};

const scaleToDeviceHeight = (designBaseValue: number): number => {
  let scaledValue = designBaseValue;
  if (deviceTooSmallForDesignBaseValues && designBaseValue !== 0) {
    scaledValue = (deviceHeight * designBaseValue) / uiDesignDeviceHeight;
  }
  return PixelRatio.roundToNearestPixel(scaledValue);
};



const DOT_UNICODE = `  \u25CF  `;
const SMAILL_DOT_UNICODE = `\u2022`;
const ANDROID_BOTTOM_MARGIN = scaleToDeviceHeight(15);
const BOTTOM_BUTTON_SPACE = Platform.OS ==  "ios" ? moderateVerticalScale(30) : moderateVerticalScale(20)
export {scaleToDeviceWidth, scaleToDeviceHeight, deviceWidth, deviceHeight,ANDROID_BOTTOM_MARGIN,BOTTOM_BUTTON_SPACE,DOT_UNICODE,SMAILL_DOT_UNICODE};
