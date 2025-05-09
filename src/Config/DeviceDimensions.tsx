import { Dimensions, ScaledSize } from 'react-native';

const { width, height }: ScaledSize = Dimensions.get('window');

const DeviceDimensions = {
  deviceWidth: width,
  deviceHeight: height,
};

Dimensions.addEventListener('change', ({ window }: { window: ScaledSize }) => {
  DeviceDimensions.deviceWidth = window.width;
  DeviceDimensions.deviceHeight = window.height;
});

export default DeviceDimensions;
