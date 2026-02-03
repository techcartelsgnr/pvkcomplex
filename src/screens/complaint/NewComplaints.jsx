import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  ToastAndroid,
  PermissionsAndroid,
  Platform,
  useColorScheme,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { X } from 'lucide-react-native';
import InputField from '../../components/InputField';
import { COLORS, FontSizes } from '../../theme/theme';
import CustomHeader from '../../components/CustomHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import ButtonWithLoader from '../../components/ButtonWithLoader';
import { Dropdown } from 'react-native-element-dropdown';
import { useSelector } from 'react-redux';
import commanServices from '../../redux/services/commanServices';
import { useNavigation } from '@react-navigation/native';

const colorScheme = useColorScheme();

export default function NewComplaints() {
  const navigation = useNavigation();
  const { token, qtr_no, block: qtrblock } = useSelector(state => state.auth);

  const [block, setBlock] = useState(qtrblock);
  const [qtrNo, setQtrNo] = useState(qtr_no);
  const [complaintType, setComplaintType] = useState(null);
  const [complaintMsg, setComplaintMsg] = useState('');
  const [image, setImage] = useState(null);
  const [priority, setPriority] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const complaintDate = new Date().toISOString().substring(0, 10);

  /* ================= PERMISSION ================= */
  const requestPermission = async () => {
    if (Platform.OS !== 'android') return true;

    try {
      const permission =
        Platform.Version >= 33
          ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
          : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

      const granted = await PermissionsAndroid.request(permission);
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch {
      return false;
    }
  };

  // Dropdown Values
  const complaintTypes = [
    { label: 'B/R - Building & Plumbing', value: 'B/R' },
    { label: 'E/M - Electrical', value: 'E/M' },
    { label: 'BSO - Furniture', value: 'BSO' },
  ];

  const complaintPriority = [
    { label: 'Low Priority', value: 'LOW' },
    { label: 'Medium Priority', value: 'MEDIUM' },
    { label: 'High Priority', value: 'HIGH' },
    { label: 'Urgent Priority', value: 'URGENT' },
  ];

  /* ================= IMAGE PICK (CROP PICKER) ================= */
  const handleImageUpload = async () => {
    const ok = await requestPermission();
    if (!ok) {
      ToastAndroid.show('Gallery permission denied', ToastAndroid.SHORT);
      return;
    }

    try {
      const img = await ImagePicker.openPicker({
        cropping: true,
        compressImageQuality: 0.8,
        mediaType: 'photo',
      });

      setImage({
        uri: img.path,
        type: img.mime || 'image/jpeg',
        name: 'complaint.jpg',
      });
    } catch (e) {}
  };

  const handleRemoveImage = () => setImage(null);

  /* ================= VALIDATION ================= */
  const validateForm = () => {
    if (!block) return 'Block is required';
    if (!qtrNo) return 'Quarter number is required';
    if (!complaintType) return 'Complaint type is required';
    if (!priority) return 'Priority is required';
    if (!complaintMsg.trim()) return 'Please write complaint message';
    if (!image) return 'Please upload an image';
    return null;
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async () => {
    const error = validateForm();

    if (error) {
      ToastAndroid.showWithGravity(
        error,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      return;
    }

    try {
      setIsSubmitting(true);

      const formData = new FormData();
      formData.append('date_of_complaint', complaintDate);
      formData.append('block', block);
      formData.append('qtr_no', qtrNo);
      formData.append('type_of_complaint', complaintType);
      formData.append('complaint_message', complaintMsg);
      formData.append('priority', priority);

      formData.append('image', {
        uri: image.uri,
        type: image.type,
        name: image.name,
      });

      await commanServices.addComplaint({
        token,
        data: formData,
      });

      ToastAndroid.showWithGravity(
        'Complaint submitted successfully!',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );

      navigation.navigate('MesComplaints');
    } catch (e) {
      ToastAndroid.showWithGravity(
        'Unable to submit complaint.',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader headername="MES Complaint" />

      <ScrollView contentContainerStyle={styles.content}>
        {/* DATE */}
        <Text style={styles.label}>Date of Complaint</Text>
        <InputField value={complaintDate} editable={false} />

        {/* BLOCK */}
        <Text style={styles.label}>Block</Text>
        <InputField value={block} onChangeText={setBlock} />

        {/* QTR NO */}
        <Text style={styles.label}>Qtr No</Text>
        <InputField value={qtrNo} onChangeText={setQtrNo} />

        {/* TYPE */}
        <Text style={styles.label}>Type of Complaint</Text>
        <Dropdown
          style={styles.dropdown}
          data={complaintTypes}
          labelField="label"
          valueField="value"
          placeholder="Select Complaint Type"
          value={complaintType}
          onChange={item => setComplaintType(item.value)}
        />

        {/* PRIORITY */}
        <Text style={styles.label}>Priority</Text>
        <Dropdown
          style={styles.dropdown}
          data={complaintPriority}
          labelField="label"
          valueField="value"
          placeholder="Select Priority"
          value={priority}
          onChange={item => setPriority(item.value)}
        />

        {/* MESSAGE */}
        <Text style={styles.label}>Complaint Message</Text>
        <TextInput
          style={styles.textArea}
          multiline
          value={complaintMsg}
          onChangeText={setComplaintMsg}
          placeholder="Write your complaint..."
          placeholderTextColor={
            colorScheme === 'dark' ? COLORS.background : COLORS.background
          }
        />

        {/* IMAGE */}
        <Text style={styles.label}>Image</Text>
        <TouchableOpacity style={styles.uploadBtn} onPress={handleImageUpload}>
          <Text>Upload Image</Text>
        </TouchableOpacity>

        {image && (
          <View style={styles.imageWrapper}>
            <Image source={{ uri: image.uri }} style={styles.imagePreview} />
            <TouchableOpacity
              style={styles.cancelIcon}
              onPress={handleRemoveImage}
            >
              <X size={18} color="#fff" />
            </TouchableOpacity>
          </View>
        )}

        {/* SUBMIT */}
        <ButtonWithLoader
          text="Submit"
          isLoading={isSubmitting}
          onPress={handleSubmit}
          bgColor={COLORS.primary}
        />

        <View style={{ height: 50 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { paddingHorizontal: 16, paddingBottom: 24 },
  label: {
    marginBottom: 4,
    color: COLORS.black,
    fontWeight: '600',
    fontSize: FontSizes.small,
    marginTop: 10,
  },
  dropdown: {
    height: 50,
    borderColor: COLORS.grayBG,
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    backgroundColor: '#f1f5f9',
    marginTop: 10,
  },
  textArea: {
    backgroundColor: '#f1f5f9',
    borderRadius: 5,
    borderColor: COLORS.grayBG,
    borderWidth: 1,
    minHeight: 100,
    padding: 10,
    color: COLORS.black,
    textAlignVertical: 'top',
  },
  uploadBtn: {
    backgroundColor: COLORS.grayBG,
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
  },
  imageWrapper: { marginTop: 10, alignSelf: 'center' },
  imagePreview: { height: 90, width: 90, borderRadius: 6 },
  cancelIcon: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#111827AA',
    borderRadius: 999,
    padding: 3,
  },
});
