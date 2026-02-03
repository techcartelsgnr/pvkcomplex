import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import RegisterScreen from './src/screens/auth/RegisterScreen';
import LoginScreen from './src/screens/auth/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './src/navigation/AuthStack';
import TabRoutes from './src/navigation/TabRoutes';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MainStack from './src/navigation/MainStack';

import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from './src/redux/store';

import { requestNotificationPermission } from './src/utils/requestPermissions';
import { registerNotificationListeners } from './src/utils/notificationService';

import { chkLogin } from './src/redux/slices/authSlice';

import SplashScreen from './src/screens/auth/SplashScreen';

// -------------------------
// App Navigation Controller
// -------------------------
function AppNavigator() {
  const dispatch = useDispatch();
  // const token = useSelector((state) => state.auth.token);
  const { token, isLoading } = useSelector(state => state.auth);
  // Restore login session
  useEffect(() => {
    dispatch(chkLogin());
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }
  return (
    <NavigationContainer>
      {token ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default function App() {
  useEffect(() => {
    requestNotificationPermission();
  }, []);

  useEffect(() => {
    registerNotificationListeners();
  }, []);

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({});
