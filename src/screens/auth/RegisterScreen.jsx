import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';

import InputField from '../../components/InputField';
import { COLORS, FontSizes } from '../../theme/theme';
import { Dropdown } from 'react-native-element-dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../redux/slices/authSlice'; // <-- adjust path

const { width, height } = Dimensions.get('window');
const BASE_WIDTH = 414; // reference device
const scale = size => (width / BASE_WIDTH) * size;

export default function RegisterScreen() {
  const dispatch = useDispatch();
  const { pending } = useSelector(state => state.auth);

  // Rank list
  const rankOptions = [
    { label: 'Brigadier', value: 'Brigadier' },
    { label: 'Colonel', value: 'Colonel' },
    { label: 'Lieutenant Colonel', value: 'Lieutenant Colonel' },
    { label: 'Major', value: 'Major' },
    { label: 'Captain', value: 'Captain' },
    { label: 'Lieutenant', value: 'Lieutenant' },
  ];

  const [rank, setRank] = useState(rankOptions[0].value);
  const [armyNo, setArmyNo] = useState('');
  const [mobile, setMobile] = useState('');
  const [name, setName] = useState('');
  const [unit, setUnit] = useState('');
  const [block, setBlock] = useState('');
  const [qtrNo, setQtrNo] = useState('');
  const [password, setPassword] = useState('');

  const fcmToken = 'TEST_FCM_TOKEN_123'; // Replace with real FCM later

  const onSubmit = () => {
    if (!name || !armyNo || !mobile || !unit || !block || !qtrNo || !password) {
      alert('Please fill all fields');
      return;
    }

    dispatch(
      register({
        name,
        unit,
        rank,
        armyNo,
        mobile,
        block,
        qtrNo,
        password,
        fcmToken,
      }),
    );
  };

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#f5f5f5"
        translucent={false}
      />

      <KeyboardAvoidingView
        style={styles.flexContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
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

          <Text style={styles.title}>Registration</Text>

          {/* Army No */}
          <Text style={styles.label}>Army No</Text>
          <InputField
            label="Enter Army Name"
            value={armyNo}
            onChangeText={setArmyNo}
          />

          {/* Rank */}
          <Text style={styles.label}>Rank</Text>

          <Dropdown
            style={styles.dropdown}
            data={rankOptions}
            search={false}
            maxHeight={250}
            labelField="label"
            valueField="value"
            placeholder="Select Rank"
            value={rank}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            itemTextStyle={styles.dropdownItemText}
            onChange={item => setRank(item.value)}
          />

          {/* Name */}
          <Text style={styles.label}>Name</Text>
          <InputField
            label="Enter Full Name"
            value={name}
            onChangeText={setName}
          />

          {/* Unit */}
          <Text style={styles.label}>Unit</Text>
          <InputField
            label="Enter Unit Name"
            value={unit}
            onChangeText={setUnit}
          />

          {/* Mobile */}
          <Text style={styles.label}>Mobile</Text>
          <InputField
            label="Enter Mobile Number"
            keyboardType="phone-pad"
            maxLength={10}
            value={mobile}
            onChangeText={setMobile}
          />

          {/* Block */}
          <Text style={styles.label}>Block</Text>
          <InputField
            label="Enter Block"
            value={block}
            onChangeText={setBlock}
          />

          {/* Qtr No */}
          <Text style={styles.label}>Quarter No</Text>
          <InputField
            label="Enter Quarter Number"
            value={qtrNo}
            onChangeText={setQtrNo}
          />

          {/* Password */}
          <Text style={styles.label}>Password</Text>
          <InputField
            label="Enter Password"
            isSecure={true}
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={onSubmit}
            disabled={pending}
          >
            <Text style={styles.buttonText}>
              {pending ? 'Registering...' : 'Register Now!'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: COLORS.whiteBackground,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  logo: {
    width: scale(120),
    height: scale(120),
  },
  title: {
    fontSize: FontSizes.xlarge,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
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

  // Dropdown styles
  dropdown: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  placeholderStyle: {
    color: COLORS.black,
    fontSize: FontSizes.small,
  },
  selectedTextStyle: {
    color: COLORS.black,
    fontSize: FontSizes.small,
    fontFamily: 'Quicksand-Medium',
  },
  dropdownItemText: {
    color: COLORS.black,
    fontSize: FontSizes.small,
  },

  button: {
    marginTop: 20,
    backgroundColor: '#5D3FD3',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: FontSizes.medium,
    fontWeight: 'bold',
  },
});
