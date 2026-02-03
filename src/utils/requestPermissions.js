// import { getApp } from '@react-native-firebase/app';
// import {
//   getMessaging,
//   requestPermission,
//   getToken,
//   AuthorizationStatus,
// } from '@react-native-firebase/messaging';
// import { PermissionsAndroid, Platform } from 'react-native';
// export const requestNotificationPermission = async () => {
//   const app = getApp(); // ✅ Use modular API
//   const messaging = getMessaging(app);

//   if (Platform.OS === 'android' && Platform.Version >= 33) {
//     const result = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
//     );
//     if (result !== PermissionsAndroid.RESULTS.GRANTED) {
//       console.log('Notification permission not granted');
//       return;
//     }
//   }

//   try {
//     const authStatus = await requestPermission(messaging);
//     const enabled =
//       authStatus === AuthorizationStatus.AUTHORIZED ||
//       authStatus === AuthorizationStatus.PROVISIONAL;

//     if (enabled) {
//       console.log('🔐 Notification permission granted');
//       await fetchFCMToken();
//       await messaging().subscribeToTopic('all');
//       console.log('🔒 Message All Here Line No 33');
//     } else {
//       console.log('🔒 Notification permission denied');
//     }
//   } catch (err) {
//     console.error('❌ Error requesting FCM permission:', err);
//   }
// };

// export const fetchFCMToken = async () => {
//   try {
//     const app = getApp(); // ✅ Use modular API
//     const messaging = getMessaging(app);
//     const token = await getToken(messaging);
//     console.log('✅ FCM Token Genrated Successfully:', token);
//     return token;
//     // Optionally send token to your backend
//   } catch (error) {
//     console.error('❌ Failed to get FCM Token:', error);
//   }
// };

import { getApp } from '@react-native-firebase/app';
import {
  getMessaging,
  requestPermission,
  getToken,
  AuthorizationStatus,
} from '@react-native-firebase/messaging';
import messaging from '@react-native-firebase/messaging';
import { PermissionsAndroid, Platform } from 'react-native';

// ⬇️ CALL THIS ON APP START (App.js)
export const requestNotificationPermission = async () => {
  const app = getApp();
  const messagingInstance = getMessaging(app);

  // Android 13+ needs POST_NOTIFICATIONS permission
  if (Platform.OS === 'android' && Platform.Version >= 33) {
    const result = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );

    if (result !== PermissionsAndroid.RESULTS.GRANTED) {
      console.log('🚫 Notification permission not granted');
      return;
    }
  }

  try {
    // Request OS permission
    const authStatus = await requestPermission(messagingInstance);
    const enabled =
      authStatus === AuthorizationStatus.AUTHORIZED ||
      authStatus === AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('🔐 Notification permission granted');

      // Get FCM Token
      const token = await fetchFCMToken();

      // 🔥 Subscribe to global topic
      await messaging().subscribeToTopic('all');
      console.log('📌 Subscribed to topic: all');

      // OPTIONAL: Send token to backend
      // await sendTokenToBackend(token);
    } else {
      console.log('🔒 Notification permission denied');
    }
  } catch (err) {
    console.error('❌ Error requesting FCM permission:', err);
  }
};

// ⬇️ GET DEVICE FCM TOKEN
export const fetchFCMToken = async () => {
  try {
    const app = getApp();
    const messagingInstance = getMessaging(app);

    const token = await getToken(messagingInstance);
    console.log('✅ FCM Token Generated:', token);

    return token;
  } catch (error) {
    console.error('❌ Failed to get FCM Token:', error);
  }
};
