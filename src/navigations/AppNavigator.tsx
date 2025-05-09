import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import UserHomeScreen from '../screens/UserHomeScreen';
import ProductDetails from '../screens/ProductDetails';
import DetailsScreen from '../screens/DetailsScreen';

export type RootStackParamList = {
  Login: undefined;

  UserHome:undefined;

  ProductScreen:undefined;
  ProductDetails:undefined;
  DetailsScreen:undefined;

};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }} 
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="UserHome" component={UserHomeScreen} />
      <Stack.Screen name='DetailsScreen' component={DetailsScreen}/>

    </Stack.Navigator>
  );
};

export default AppNavigation;
