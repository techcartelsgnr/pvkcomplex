import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabRoutes from '../navigation/TabRoutes';
import {
  AnnouncementsDetail,
  AnnouncementsScreen,
  EditProfileScreen,
  EventDetailScreen,
  EventScreen,
  MesComplaints,
  NewComplaints,
  NotificationScreen,
  RwaAdvisory,
  RwaAdvisoryDetail,
  TrackComplaints,
} from '../screens/index';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TabRoutes" component={TabRoutes} />
      <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
      <Stack.Screen
        name="AnnouncementsScreen"
        component={AnnouncementsScreen}
      />
      <Stack.Screen name="MesComplaints" component={MesComplaints} />
      <Stack.Screen name="NewComplaints" component={NewComplaints} />
      <Stack.Screen name="TrackComplaints" component={TrackComplaints} />
      <Stack.Screen name="EventScreen" component={EventScreen} />
      <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
      <Stack.Screen name="RwaAdvisory" component={RwaAdvisory} />
      <Stack.Screen name="RwaAdvisoryDetail" component={RwaAdvisoryDetail} />
      <Stack.Screen
        name="AnnouncementsDetail"
        component={AnnouncementsDetail}
      />
      <Stack.Screen name="EventDetailScreen" component={EventDetailScreen} />
    </Stack.Navigator>
  );
};

export default MainStack;
