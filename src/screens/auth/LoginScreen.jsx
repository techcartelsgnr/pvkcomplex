import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Linking,
  TouchableOpacity,
  Modal,
  Dimensions,
} from 'react-native';
import InputField from '../../components/InputField';
import ButtonWithLoader from '../../components/ButtonWithLoader';
import { useNavigation } from '@react-navigation/native';
import { fetchLogin } from '../../redux/slices/authSlice';
import { useDispatch } from 'react-redux';
import commanServices from '../../redux/services/commanServices';
import { PhoneCall, X } from 'lucide-react-native';
import { COLORS, FontSizes } from '../../theme/theme';

const { width, height } = Dimensions.get('window');
const BASE_WIDTH = 414; // reference device
const scale = size => (width / BASE_WIDTH) * size;

export default function LoginScreen() {
  const [helpline, setHelpline] = useState(null);
  const [forgotModal, setForgotModal] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading] = useState(false);

  const fcm_token = 'login';

  // GET HELPLINE NUMBER
  const getHelplineNumber = async () => {
    const number = await commanServices.getHelplineNumber();
    setHelpline(number);
  };

  useEffect(() => {
    getHelplineNumber();
  }, []);

  // MAKE PHONE CALL
  const makeCall = () => {
    if (helpline) {
      Linking.openURL(`tel:${helpline}`);
    }
  };

  // LOGIN
  const onSubmit = () => {
    if (!mobile || !password) {
      alert('Please fill all fields');
      return;
    }

    dispatch(fetchLogin({ mobile, password, fcm_token }));
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />

      <KeyboardAvoidingView
        style={styles.flexContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.contentContainer}
          keyboardShouldPersistTaps="handled"
        >
          {/* Logo */}
          <View style={styles.logoContainer}>
            <Image
              source={require('../../../assets/images/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <View style={styles.digitalPhotoOuter}>
            <Image
              source={require('../../../assets/images/digitalPhoto.jpg')}
              style={styles.digitalPhoto}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.title}>Login</Text>

          {/* Mobile Number */}
          <Text style={styles.label}>Mobile Number</Text>
          <InputField
            label="Enter Mobile Number"
            keyboardType="phone-pad"
            maxLength={10}
            value={mobile}
            onChangeText={setMobile}
          />

          {/* Password */}
          <Text style={styles.label}>Password</Text>
          <InputField
            label="Enter Password"
            isSecure={true}
            value={password}
            onChangeText={setPassword}
            fieldButtonLabel={'Forgot PIN ?'}
            fieldButtonFunction={() => setForgotModal(true)}
          />

          {/* Login Button */}
          <ButtonWithLoader
            isLoading={isLoading}
            text="Login Now"
            onPress={onSubmit}
            bgColor="#5D3FD3"
          />

          {/* Bottom Message */}
          <View style={styles.bottomMessageContainer}>
            <Text style={styles.bottomMessage}>
              If you have no login credential then
            </Text>

            <ButtonWithLoader
              isLoading={isLoading}
              text="Register Here"
              bgColor="#5D3FD3"
              onPress={() => navigation.navigate('RegisterScreen')}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* 🔥 Forgotten PIN Modal */}
      <Modal
        transparent
        animationType="fade"
        visible={forgotModal}
        onRequestClose={() => setForgotModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            {/* Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Forgot Password?</Text>

              <TouchableOpacity onPress={() => setForgotModal(false)}>
                <X size={24} color="#444" />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalMessage}>
              For resetting your password, please contact the admin.
            </Text>

            {/* Contact Admin Section */}
            {helpline && (
              <View style={{ marginTop: 10 }}>
                <Text style={styles.loginAdminTitle}>Contact Admin</Text>
                <TouchableOpacity style={styles.callBox} onPress={makeCall}>
                  <PhoneCall size={20} color="#fff" />
                  <Text style={styles.callText}>{helpline}</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  flexContainer: { flex: 1 },
  scrollContainer: { flex: 1 },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
    paddingBottom: 50,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  logo: {
    width: scale(120),
    height: scale(120),
    borderRadius: 100,
  },

  digitalPhotoOuter: {
    alignItems: 'center',
    marginTop: 10,

    borderRadius: 10,
  },
  digitalPhoto: {
    width: scale(350),
    height: scale(175),
    // borderWidth: 1,
    // borderColor: COLORS.secondaryGradientEnd,
  },

  title: {
    fontSize: FontSizes.xl,
    textAlign: 'center',
    marginBottom: 10,
    color: '#5D3FD3',
    fontFamily: 'Quicksand-Bold',
  },
  label: {
    fontSize: FontSizes.normal,
    fontFamily: 'Quicksand-Bold',
    color: '#333',
    marginTop: 10,
    marginBottom: 5,
  },

  bottomMessageContainer: { marginTop: 30, alignItems: 'center' },
  bottomMessage: {
    fontSize: FontSizes.small,
    color: '#666',
    textAlign: 'center',
    fontFamily: 'Quicksand-Regular',
  },

  /* Modal Styling */
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
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: FontSizes.large,
    fontFamily: 'Quicksand-Bold',
    color: COLORS.textDark,
  },
  modalMessage: {
    fontSize: FontSizes.normal,
    fontFamily: 'Quicksand-Regular',
    color: COLORS.textDark,
    marginTop: 10,
    marginBottom: 20,
    lineHeight: 22,
  },

  loginAdminTitle: {
    color: COLORS.textDark,
    fontSize: FontSizes.normal,
    fontFamily: 'Quicksand-Bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  callBox: {
    flexDirection: 'row',
    backgroundColor: '#ff4400ff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
  },
  callText: {
    color: '#fff',
    fontSize: FontSizes.normal,
    marginLeft: 10,
    fontWeight: '700',
  },
  closeButton: {
    backgroundColor: '#ddd',
    marginTop: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  closeButtonText: {
    textAlign: 'center',
    color: '#333',
    fontSize: FontSizes.normal,
    fontFamily: 'Quicksand-Bold',
  },
});
