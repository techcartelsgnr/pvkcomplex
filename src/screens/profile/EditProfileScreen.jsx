import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
  Dimensions,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '../../components/CustomHeader';
import ImagePicker from 'react-native-image-crop-picker';
import InputField from '../../components/InputField';
import ButtonWithLoader from '../../components/ButtonWithLoader';
import { COLORS, FontSizes } from '../../theme/theme';
import { useNavigation } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';
import { X, Camera, Image as ImageIcon } from 'lucide-react-native';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile } from '../../redux/slices/authSlice';

const { width } = Dimensions.get('window');
const BASE_WIDTH = 414;
const scale = size => (width / BASE_WIDTH) * size;

export default function EditProfileScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { token, name, unit, rank, mobile, army_no, block, qtr_no, image } =
    useSelector(state => state.auth);

  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const rankOptions = [
    { label: 'Brigadier', value: 'Brigadier' },
    { label: 'Colonel', value: 'Colonel' },
    { label: 'Lieutenant Colonel', value: 'Lieutenant Colonel' },
    { label: 'Major', value: 'Major' },
    { label: 'Captain', value: 'Captain' },
    { label: 'Lieutenant', value: 'Lieutenant' },
  ];

  const [userData, setUserData] = useState({
    armyNo: army_no,
    rank,
    name,
    unit,
    mobile,
    block,
    qtrNo: qtr_no,
    password: '',
    profilePic: null,
    oldImage: image,
  });

  /* ================= PERMISSION ================= */
  const requestPermission = async (type = 'gallery') => {
    if (Platform.OS !== 'android') return true;

    try {
      let permissions = [];

      if (type === 'camera') {
        permissions.push(PermissionsAndroid.PERMISSIONS.CAMERA);
      }

      if (Platform.Version >= 33) {
        permissions.push(PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES);
      } else {
        permissions.push(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
      }

      const granted = await PermissionsAndroid.requestMultiple(permissions);

      return Object.values(granted).every(
        result => result === PermissionsAndroid.RESULTS.GRANTED,
      );
    } catch {
      return false;
    }
  };

  /* ================= IMAGE PICK (CROP PICKER) ================= */
  const openGallery = async () => {
    const ok = await requestPermission('gallery');
    if (!ok || isLoading) {
      ToastAndroid.show('Gallery permission denied', ToastAndroid.SHORT);
      return;
    }

    try {
      const image = await ImagePicker.openPicker({
        width: 500,
        height: 500,
        cropping: true,
        compressImageQuality: 0.8,
      });

      setUserData({ ...userData, profilePic: image.path });
    } catch (e) {}
  };

  const openCamera = async () => {
    const ok = await requestPermission('camera');
    if (!ok || isLoading) {
      ToastAndroid.show('Camera permission denied', ToastAndroid.SHORT);
      return;
    }

    try {
      const image = await ImagePicker.openCamera({
        width: 500,
        height: 500,
        cropping: true,
        compressImageQuality: 0.8,
      });

      setUserData({ ...userData, profilePic: image.path });
    } catch (e) {}
  };

  const removeImage = () => {
    if (isLoading) return;
    setUserData({ ...userData, profilePic: null });
  };

  /* ================= VALIDATION ================= */
  const hasEmptyFields = () =>
    !userData.armyNo.trim() ||
    !userData.rank.trim() ||
    !userData.name.trim() ||
    !userData.unit.trim() ||
    !userData.block.trim() ||
    !userData.qtrNo.trim();

  const isDataChanged = () =>
    userData.password.trim() !== '' ||
    userData.profilePic !== null ||
    userData.armyNo !== army_no ||
    userData.rank !== rank ||
    userData.name !== name ||
    userData.unit !== unit ||
    userData.block !== block ||
    userData.qtrNo !== qtr_no;

  /* ================= SAVE ================= */
  const handleSave = async () => {
    if (hasEmptyFields()) {
      ToastAndroid.show('Please fill all details', ToastAndroid.SHORT);
      return;
    }

    if (!isDataChanged()) {
      ToastAndroid.show('Data badla nhi gya', ToastAndroid.SHORT);
      return;
    }

    setIsLoading(true);
    setUploadProgress(0);

    try {
      const formData = new FormData();

      formData.append('army_no', userData.armyNo);
      formData.append('name', userData.name);
      formData.append('unit', userData.unit);
      formData.append('rank', userData.rank);
      formData.append('mobile', userData.mobile);
      formData.append('block', userData.block);
      formData.append('qtr_no', userData.qtrNo);
      formData.append('password', userData.password);

      if (userData.profilePic) {
        formData.append('image', {
          uri: userData.profilePic,
          name: 'profile.jpg',
          type: 'image/jpeg',
        });
      }

      await dispatch(
        updateProfile({
          token,
          formData,
          onUploadProgress: e => {
            if (!e.total) return;
            const percent = Math.round((e.loaded * 100) / e.total);
            setUploadProgress(percent);
          },
        }),
      ).unwrap();

      ToastAndroid.show('Profile Updated Successfully', ToastAndroid.SHORT);
      navigation.goBack();
    } catch {
      ToastAndroid.show('Failed to update profile', ToastAndroid.SHORT);
    }

    setIsLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader headername="Edit Profile" />

      <ScrollView contentContainerStyle={styles.content}>
        {/* PROFILE IMAGE */}
        <View style={styles.profileSection}>
          <View>
            <Image
              source={
                userData.profilePic
                  ? { uri: userData.profilePic }
                  : { uri: userData.oldImage }
              }
              style={styles.profileImage}
            />

            {userData.profilePic && !isLoading && (
              <TouchableOpacity style={styles.removeIcon} onPress={removeImage}>
                <X size={16} color="#fff" />
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.actionRow}>
            <TouchableOpacity
              style={[styles.actionBtn, isLoading && styles.disabledBtn]}
              onPress={openCamera}
              disabled={isLoading}
            >
              <Camera size={16} color="#fff" />
              <Text style={styles.actionText}>Camera</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionBtn, isLoading && styles.disabledBtn]}
              onPress={openGallery}
              disabled={isLoading}
            >
              <ImageIcon size={16} color="#fff" />
              <Text style={styles.actionText}>Gallery</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* FORM */}
        <Text style={styles.label}>Army No</Text>
        <InputField
          label="Army No"
          value={userData.armyNo}
          onChangeText={val => setUserData({ ...userData, armyNo: val })}
        />

        <Text style={styles.label}>Rank</Text>
        <Dropdown
          style={styles.dropdown}
          data={rankOptions}
          labelField="label"
          valueField="value"
          value={userData.rank}
          onChange={item => setUserData({ ...userData, rank: item.value })}
        />

        <Text style={styles.label}>Name</Text>
        <InputField
          label="Full Name"
          value={userData.name}
          onChangeText={val => setUserData({ ...userData, name: val })}
        />

        <Text style={styles.label}>Unit</Text>
        <InputField
          label="Unit"
          value={userData.unit}
          onChangeText={val => setUserData({ ...userData, unit: val })}
        />

        <Text style={styles.label}>Mobile</Text>
        <InputField label="Mobile" value={userData.mobile} editable={false} />

        <Text style={styles.label}>Block</Text>
        <InputField
          label="Block"
          value={userData.block}
          onChangeText={val => setUserData({ ...userData, block: val })}
        />

        <Text style={styles.label}>Quarter No</Text>
        <InputField
          label="Qtr No"
          value={userData.qtrNo}
          onChangeText={val => setUserData({ ...userData, qtrNo: val })}
        />

        <Text style={styles.label}>Password</Text>
        <InputField
          label="Password"
          isSecure
          value={userData.password}
          onChangeText={val => setUserData({ ...userData, password: val })}
        />

        <ButtonWithLoader
          text={isLoading ? 'Uploading...' : 'Save Changes'}
          isLoading={isLoading}
          onPress={handleSave}
          disabled={isLoading}
          bgColor={isLoading ? '#9ca3af' : COLORS.darkPurple}
        />

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3f4f6' },
  content: { padding: 20 },

  profileSection: { alignItems: 'center', marginBottom: 20 },
  profileImage: {
    width: scale(90),
    height: scale(90),
    borderRadius: scale(45),
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  removeIcon: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#0008',
    padding: 4,
    borderRadius: 20,
  },

  actionRow: { flexDirection: 'row', marginTop: 10 },
  actionBtn: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    padding: 8,
    borderRadius: 6,
    marginHorizontal: 6,
    alignItems: 'center',
  },
  disabledBtn: {
    opacity: 0.6,
  },
  actionText: {
    color: '#fff',
    marginLeft: 6,
    fontSize: FontSizes.small,
  },

  label: {
    marginTop: 10,
    fontSize: FontSizes.small,
    color: COLORS.black,
  },
  dropdown: {
    height: 50,
    borderColor: COLORS.grayBG,
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    backgroundColor: '#f1f5f9',
    marginBottom: 8,
  },
});
