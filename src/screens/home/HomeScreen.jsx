import React, { useState, useCallback, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Image,
  RefreshControl,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  Wrench,
  Megaphone,
  Calendar,
  CircleChevronRight,
  RefreshCcw,
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FontSizes } from '../../theme/theme';
import { useSelector, useDispatch } from 'react-redux';
import { checkStatus } from '../../redux/slices/authSlice';
import Slider from '../../components/Slider';

const { width, height } = Dimensions.get('window');
const BASE_WIDTH = 414; // reference device
const scale = size => (width / BASE_WIDTH) * size;

export default function HomeScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const sliderRef = useRef(null);

  // Get user from Redux
  const { name, status, image, token } = useSelector(state => state.auth);

  const menuItems = [
    { name: 'MES Complaint Manager', icon: Wrench, screen: 'MesComplaints' },
    { name: 'Announcements', icon: Megaphone, screen: 'AnnouncementsScreen' },
    { name: 'Events', icon: Calendar, screen: 'EventScreen' },
    { name: 'PVK Advisory', icon: CircleChevronRight, screen: 'RwaAdvisory' },
  ];

  const handlePress = screen => {
    if (status === '1') {
      navigation.navigate(screen);
    }
  };

  // slider refersh

  const onRefresh = useCallback(async () => {
    setRefreshing(true);

    // 🔥 Call slider refresh function inside Slider.jsx
    if (sliderRef.current && sliderRef.current.reloadSlider) {
      await sliderRef.current.reloadSlider();
    }

    setRefreshing(false);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#f5f5f5"
        translucent={false}
      />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#5D3FD3']}
          />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={
                image
                  ? { uri: image }
                  : require('../../../assets/images/logo.png') // fallback image
              }
              style={styles.homelogo}
            />
            <Text style={styles.headerTitle}>Welcome, {name}</Text>
          </View>

          <View>
            <TouchableOpacity onPress={() => dispatch(checkStatus({ token }))}>
              <RefreshCcw size={20} color="#fefefe" strokeWidth={2} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Verification Message */}
        {status === '0' && (
          <View style={styles.verifyMsgBox}>
            <Text style={styles.verifyMsg}>
              Your ID is Under Verification, Please check after 10-15 Minutes!
            </Text>
          </View>
        )}

        {/* Menu Sections */}
        <View style={styles.sectionsContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.section, status === '0' && styles.disabledSection]}
              onPress={() => handlePress(item.screen)}
              activeOpacity={status === '1' ? 0.7 : 1}
            >
              <View style={styles.leftSection}>
                <View style={styles.iconContainer}>
                  <item.icon size={24} color="#5D3FD3" />
                </View>

                <View style={styles.textContainer}>
                  <Text style={styles.sectionTitle}>{item.name}</Text>
                </View>
              </View>

              <View>
                <CircleChevronRight size={20} color="#999" strokeWidth={2} />
              </View>
            </TouchableOpacity>
          ))}
          <View style={{ marginHorizontal: 0 }}>
            <Slider ref={sliderRef} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },

  header: {
    backgroundColor: COLORS.darkPurple,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  homelogo: {
    width: scale(40),
    height: scale(40),
    borderRadius: 100,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: FontSizes.normal,
    color: COLORS.textPrimary,
    fontFamily: 'Quicksand-Bold',
  },

  verifyMsgBox: {
    backgroundColor: COLORS.error,
    padding: 12,
    marginHorizontal: 20,
    marginTop: 15,
    borderRadius: 8,
    borderLeftWidth: 5,
    borderLeftColor: '#ffb300',
  },
  verifyMsg: {
    color: '#FEFEFE',
    fontSize: FontSizes.normal,
    fontFamily: 'Quicksand-Bold',
  },

  sectionsContainer: {
    flex: 1,
    padding: 20,
  },
  section: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 1,
  },

  // Disabled state (non-clickable)
  disabledSection: {
    opacity: 0.4,
  },

  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: '#5D3FD330',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  sectionTitle: {
    fontSize: FontSizes.normal,
    color: '#333',
    fontFamily: 'Quicksand-Bold',
  },
});
