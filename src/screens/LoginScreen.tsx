import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Image
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {userLogin} from '../Service/Auth/userLogin';
import WrapperComponent from '../Utils/WrapperComponent';
import InpuText from '../InputComponent/InputText';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Size } from '../Config/Size';
import {Img} from '../Utils/Imagepath'

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [checkingToken, setCheckingToken] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        if (token) {
          navigation.reset({
            index: 0,
            routes: [{name: 'UserHome'}],
          });
        }
      } catch (error) {
        console.error('Error checking token:', error);
      } finally {
        setCheckingToken(false);
      }
    };

    checkToken();
  }, []);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please enter both username and password.');
      return;
    }

    setLoading(true);
    const loginBody = {username, password};

    try {
      const result = await userLogin(loginBody);

      if (result.status) {
        const token = result?.response; // Assuming response is the token string directly

        if (token) {
          await AsyncStorage.setItem('authToken', token);
          navigation.reset({
            index: 0,
            routes: [{name: 'UserHome'}],
          });
          console.log('Login successful, token stored');
        } else {
          Alert.alert('Login Failed', 'Token missing in response');
          console.error('Missing token in response:', result.response);
        }
      } else {
        Alert.alert('Login Failed', result.message || 'An error occurred');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Login Failed', 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  if (checkingToken) {
    return (
      <WrapperComponent>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      </WrapperComponent>
    );
  }

  return (
    <WrapperComponent>
      <View style={styles.container}>
      <View style={styles.containers}>
      <Image source={Img.mx} style={styles.imgstyle} />
      <Text style={styles.textStyle}>Maxlence</Text>
    </View>
      <Text
          allowFontScaling={false}

          style={[styles.maintxtstyle, {color:  'black'}]}>
          Login to your
        </Text>
        <Text
          allowFontScaling={false}

          style={[styles.accounttxtstyle, {color: 'black'}]}>
          account
        </Text>

        <View
          style={[
            styles.container,
            {
              backgroundColor:  'white',
              paddingHorizontal: 20,
              borderRadius: 20,
              flex: 1,
              paddingTop:15

            },
          ]}>
          <InpuText
            title="Username"
            placeholder="Enter your username"
            value={username}
            onChangeText={setUsername}
          />

          <InpuText
            title="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            hide={false}
          />

          <TouchableOpacity
            style={[styles.button, {opacity: loading ? 0.5 : 1}]}
            onPress={handleLogin}
            disabled={loading}>
            <Text style={styles.buttonText}>
              {loading ? 'Logging in...' : 'Log In'}
            </Text>
          </TouchableOpacity>


          
        </View>
      </View>
    </WrapperComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: '#0487DE',
    padding: 15,
    borderRadius: 100,
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imgstyle: {
    resizeMode: 'stretch',
    width: 30,
 height:30,
    marginStart: 20,
    

  },
  containers: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  textStyle: {
    fontWeight: 'bold',
    color: '#0487DE',
    fontSize: 28,
    marginStart:5
  },
  accounttxtstyle: {
    fontSize: 32,
    color: Colors.black,
    fontWeight: '700',
    marginStart: 20,
    marginBottom: 30,
    marginTop:-5
  },
  maintxtstyle: {
    fontSize: 32,
    color: Colors.black,
    fontWeight: '700',
marginTop:10,
  
    marginStart: 20,
  },
});

export default SignIn;
