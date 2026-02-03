import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  RefreshControl,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FontSizes } from '../../theme/theme';
import CustomHeader from '../../components/CustomHeader';
import { Pencil } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import ButtonWithLoader from '../../components/ButtonWithLoader';
import { logout, fetchProfile } from '../../redux/slices/authSlice';
import { useSelector, useDispatch } from 'react-redux';

const { width, height } = Dimensions.get('window');
const BASE_WIDTH = 414; // reference device
const scale = size => (width / BASE_WIDTH) * size;

export default function ProfileScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // GET LATEST USER DATA FROM REDUX (after updateProfile)
  const { token, name, army_no, unit, rank, mobile, block, qtr_no, image } =
    useSelector(state => state.auth);

  // 🔄 REFRESH FUNCTION
  const handleRefresh = async () => {
    setRefreshing(true);
    await dispatch(fetchProfile({ token })); // call API and update Redux
    setRefreshing(false);
  };

  // LOGOUT
  const handleLogout = () => {
    setModalVisible(false);
    dispatch(logout({ token }));
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <CustomHeader headername="Profile" />

        <ScrollView
          contentContainerStyle={styles.contentContainer}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={[COLORS.primary]}
            />
          }
        >
          {/* Profile Image */}
          <View style={styles.profileSection}>
            <Image
              source={
                image
                  ? { uri: image }
                  : require('../../../assets/images/logo.png')
              }
              style={styles.profileImage}
            />

            <Text style={styles.userName}>{name}</Text>
            <Text style={styles.userRank}>{rank}</Text>
          </View>

          {/* Info Card */}
          <View style={styles.card}>
            <InfoRow label="Army No" value={army_no} />
            <InfoRow label="Name" value={name} />
            <InfoRow label="Rank" value={rank} />
            <InfoRow label="Unit" value={unit} />
            <InfoRow label="Mobile" value={mobile} />
            <InfoRow label="Block" value={block} />
            <InfoRow label="Quarter No" value={qtr_no} />
          </View>

          {/* Edit Button */}
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate('EditProfileScreen')}
          >
            <Pencil size={20} color="#fefefe" />
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>

          {/* Logout Button */}
          <ButtonWithLoader
            text="LOGOUT"
            bgColor={COLORS.primaryGradientStart}
            onPress={() => setModalVisible(true)}
          />
        </ScrollView>
      </SafeAreaView>

      {/* Logout Confirmation Modal */}
      <Modal
        transparent
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Logout</Text>

            <Text style={styles.modalMessage}>
              Are you sure you want to logout?
            </Text>

            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: COLORS.grayBG }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: '#ff4e76' }]}
                onPress={handleLogout}
              >
                <Text style={[styles.modalButtonText, { color: '#fff' }]}>
                  Logout
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

// REUSABLE ROW COMPONENT
function InfoRow({ label, value }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3f4f6', paddingBottom: 55 },
  contentContainer: { padding: 20 },

  profileSection: { alignItems: 'center', marginBottom: 10, marginTop: 0 },
  profileImage: {
    width: scale(100),
    height: scale(100),
    borderRadius: scale(110) / 2,
    borderWidth: scale(3),
    borderColor: COLORS.background,
  },
  userName: {
    fontSize: FontSizes.xlarge,
    fontFamily: 'Quicksand-Bold',
    color: COLORS.black,
    marginTop: 10,
  },
  userRank: {
    fontSize: FontSizes.normal,
    color: COLORS.background,
    fontFamily: 'Quicksand-Medium',
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 2,
    marginTop: 10,
    marginBottom: 20,
  },
  row: {
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowLabel: {
    fontSize: FontSizes.small,
    color: '#6b7280',
    fontFamily: 'Quicksand-Medium',
  },
  rowValue: {
    fontSize: FontSizes.normal,
    color: COLORS.background,
    fontFamily: 'Quicksand-Bold',
  },

  editButton: {
    flexDirection: 'row',
    backgroundColor: COLORS.darkPurple,
    padding: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontSize: FontSizes.normal,
    fontFamily: 'Quicksand-Bold',
    marginLeft: 8,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 14,
    elevation: 8,
  },
  modalTitle: {
    fontSize: FontSizes.large,
    fontFamily: 'Quicksand-Bold',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: FontSizes.normal,
    fontFamily: 'InterTight-Medium',
    marginBottom: 20,
  },

  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    marginHorizontal: 5,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: FontSizes.normal,
    fontFamily: 'Quicksand-Bold',
  },
});
