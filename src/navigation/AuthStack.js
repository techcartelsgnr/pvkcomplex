import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  LoginScreen,
  RegisterScreen,
} from '../screens/index/index';

const AuthStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
