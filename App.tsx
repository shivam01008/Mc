import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from '../RentApp/src/navigations/AppNavigator';
import { StatusBar } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();

const App = () => {
  return (

    <NavigationContainer>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <AppNavigation />
    </NavigationContainer>

  );
};

export default App;
