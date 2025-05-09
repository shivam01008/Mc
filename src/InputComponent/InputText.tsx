import {
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
  } from 'react-native';
  import React, {useState} from 'react';
  import {DimensionValue} from 'react-native';
  import {Colors} from '../Utils/Colors';
  import {Size} from '../Config/Size';
  import {Img} from '../Utils/Imagepath'
//   import {Img} from '../../utils/ImagePath';
//   import {Fonts} from '../../config/font.config';
//   import { FontStyle } from '../../config/style.config';
//   import { moderateVerticalScale } from 'react-native-size-matters';
//   import { s } from 'react-native-size-matters';
  interface PrimaryTextInputProps {
    martop?: number;
    placeholder?: string;
    placeholderTextColor?: string;
    width?: DimensionValue;
    backgroundColor?: string;
    height?: number;
    borderColor?: string;
    hide?: boolean;
    title?: string;
    titleStyle?: object;
    focusedTitleColor?: string;
    leftElements?: React.ReactNode;
    showmonth?: boolean;
    mrlg?: number;
    rightText?: string;
    rightTextStyle?: object;
    rightElement?: React.ReactNode;
    customTextStyle?:object;
    value: string;
    secureTextEntry?: boolean;

    onChangeText: (text: string) => void;

  }
  const InpuText: React.FC<PrimaryTextInputProps> = ({
    martop = 0,
    placeholder = ' Enter your email/Phone No.',
    
    placeholderTextColor = '#CBD5E1',
    width = '100%',
    backgroundColor = '',
    height = 60,
    hide = true,
    title = '',
    titleStyle = {},
    focusedTitleColor = Colors.primarytextcolor,
    leftElements,
    showmonth = false,
    mrlg = 8,
    rightElement,
    rightText,
    rightTextStyle = {},
    customTextStyle,
    value,
    onChangeText,
    secureTextEntry,



    
  }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [secureText, setSecureText] = useState(!hide);
    const [text, setText] = useState('');
    const displayText = hide
      ? text
      : text.length > 0
      ? text.split('').map((_, index) => (
          <Text key={index} style={styles.bullet}>
            {text}
          </Text>
        ))
      : '';
    return (
      <View style={{marginTop: martop, width, alignSelf: 'center'}}>
        {title ? (
          <Text
            style={[
              styles.titleText,
              titleStyle,
              {
                color: isFocused ? Colors.primarytextcolor : '#000000',
                marginBottom: 1, // Space between title and input field
              },
            ]}>
            {title}
          </Text>
        ) : null}
     
        <View
          style={[
            styles.maintxtcontainer,
            {
              borderColor: isFocused ? Colors.primarytextcolor : '#E2E8F0',
              width,
              backgroundColor,
              height,
              marginTop: title ? 8 : 0,
            },
          ]}>
          <TextInput
  placeholder={placeholder}
  placeholderTextColor={placeholderTextColor || '#CBD5E1'}
  style={[styles.txtinput, {flex: 1}, customTextStyle]}
  secureTextEntry={secureText} // Directly use secureText for visibility
  value={value}
  onChangeText={onChangeText}
  onFocus={() => setIsFocused(true)}
  onBlur={() => setIsFocused(false)}
/>
          {!hide && (
            <TouchableOpacity onPress={() => setSecureText(!secureText)}>
              <Image
                source={secureText ? Img.hidden : Img.unhidden}
                style={{width: 25, height: 25, marginRight: 15}}
              />
            </TouchableOpacity>
          )}
          {rightElement && (
            <View style={styles.rightElementContainer}>{rightElement}</View>
          )}
          {rightText && (
            <Text style={[styles.rightTextDefault, rightTextStyle]}>
              {rightText}
            </Text>
          )}
          {showmonth && (
            <Text style={{marginHorizontal: 20, color: '#000000', fontSize: 14}}>
              /Month
            </Text>
          )}
        </View>
      </View>
    );
  };
  export default InpuText;
  const styles = StyleSheet.create({
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 4,
    },
    leftElementsContainer: {
      flexDirection: 'row',
      marginRight: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    maintxtcontainer: {
      borderRadius: 30,
      borderWidth: 1,
      paddingVertical: Size.screenHeight * 0.012,
      backgroundColor: 'white',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingRight: 10,
    },
    txtinput: {
      fontSize:14,
     
      color: 'black',
      paddingVertical:0,

      paddingStart:15
    },
    titleText: {
      fontSize: 16, // Adjust font size for the title
      color: 'black',
     
      marginTop: 15,
    },
    bullet: {
      fontWeight: 'bold',
      letterSpacing: 5,
      color: 'red',
    },
    rightElementContainer: {
      marginLeft: 18,
      justifyContent: 'center',
      alignItems: 'center',
      paddingEnd: 10,
    },
    rightTextDefault: {
      color: '#3B82F6', // Blue
      fontSize: 14,
      marginRight: 15,
    },
  });
  