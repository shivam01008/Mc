// import React, { ReactNode } from 'react';
// import { View, StyleSheet, Platform, StatusBar } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import LinearGradient from 'react-native-linear-gradient';
// import { Colors } from '../Utils/Colors'; // Import Colors config

// interface WrapperProps {
//     children: ReactNode;
//     customStyle?: object;
// }

// const WrapperComponent: React.FC<WrapperProps> = ({ children, customStyle }) => {
//     const safeAreaValue = useSafeAreaInsets();
//     console.log("safeAreaValue", safeAreaValue);

//     return (
//         <View style={{...styles.gradient,backgroundColor:Colors.primary,paddingTop: Platform.OS === 'android' ? safeAreaValue.top : safeAreaValue.top }}>
//             <StatusBar barStyle={'dark-content'} />
//             <LinearGradient
//                 colors={[Colors.primary, 'white']}
//                 style={styles.gradient}
//             >
//                 {children}
//             </LinearGradient>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     gradient: {
//         flex: 1,
//     },
// });

// export default WrapperComponent;


import React, { ReactNode } from 'react';
import { View, StyleSheet, Platform, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
 import { Colors } from '../Utils/Colors'; // Import Colors config

interface WrapperProps {
  children: ReactNode;
  customStyle?: object;
  paddingBottomShow?:boolean
}

const WrapperComponent: React.FC<WrapperProps> = ({ children, customStyle,paddingBottomShow }) => {
  const safeAreaValue = useSafeAreaInsets();

  return (
    <View
      style={{
        ...styles.gradient,
        backgroundColor: Colors.primary,
        paddingTop: Platform.OS === 'android' ? safeAreaValue.top : safeAreaValue.top,
         // ✅ Added marginTop here

        ...(customStyle || {}),
        paddingBottom : paddingBottomShow ? safeAreaValue?.bottom : 0
      }}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <LinearGradient colors={[Colors.primary, 'white']} style={styles.gradient}>
        {children}
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
});

export default WrapperComponent;