import { ActivityIndicator, Dimensions, Platform, StatusBar, Text, View } from "react-native";
import { useState,useEffect } from "react";



const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const uiDesignMinCompatibleDeviceWidth = 375; // iPhone SE (2nd Generation)
const uiDesignMinCompatibleDeviceHeight = 667; // iPhone SE (2nd Generation)
const TopSpace = (Platform.OS == 'ios') ? (deviceWidth > uiDesignMinCompatibleDeviceWidth) ? (deviceWidth * 0.04) : (deviceWidth * 0.02) : StatusBar.currentHeight
export const Spacing = {
    topSpace: TopSpace,
    bottomSpace: (deviceWidth > uiDesignMinCompatibleDeviceWidth) ? 20 : 4
}
export { deviceHeight, deviceWidth, TopSpace }


export interface ServiceResponse<T, P> {
    status: number,
    message: string | undefined,
    response: T,
    // resultRating?: P`
}


export const formatPhoneNumber =  (phone: string): string=> {
    if (!phone || phone.length < 10) return phone;
  
    const firstPart = phone.slice(0, 4);  
    const lastPart = phone.slice(6);  
    return `${firstPart}XXXX${lastPart}`;
  };
  





export const useCountdownTimer = (initialTime: number, onFinish: () => void) => {
  const [timeLeft, setTimeLeft] = useState<number>(initialTime);

  useEffect(() => {
    if (timeLeft === 0) {
      onFinish();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer); 
  }, [timeLeft, onFinish]);

  return timeLeft;
};


