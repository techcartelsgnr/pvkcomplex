import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  useColorScheme,
} from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';
import { COLORS } from '../theme/theme';

const InputField = ({
  label,
  icon,
  keyboardType,
  fieldButtonLabel,
  fieldButtonFunction,
  onChangeText,
  onBlur,
  isSecure,
  maxLength,
  editable = true,
  value,
  flex,
  flexBasis,
  width = '100%',
}) => {
  // 👁 password visibility state
  const [secureText, setSecureText] = useState(isSecure);
  const colorScheme = useColorScheme(); // 'dark' | 'light'
  const placeholderColor =
    colorScheme === 'dark' ? COLORS.black : COLORS.placeholder;

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f1f5f9',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: COLORS.grayBG,
      }}
    >
      {icon}

      <TextInput
        placeholder={label}
        placeholderTextColor={placeholderColor}
        keyboardType={keyboardType}
        secureTextEntry={secureText}
        onChangeText={onChangeText}
        onBlur={onBlur}
        maxLength={maxLength}
        editable={editable}
        value={value}
        style={{
          flex: flex || 1,
          flexBasis,
          width,
          color: COLORS.black,
          fontFamily: 'InterTight-Medium',
          paddingVertical: 0,
        }}
      />

      {/* 👁 Eye icon only for password field */}
      {isSecure && (
        <TouchableOpacity
          onPress={() => setSecureText(!secureText)}
          style={{ paddingHorizontal: 6 }}
        >
          {secureText ? (
            <EyeOff size={18} color="#555" />
          ) : (
            <Eye size={18} color="#555" />
          )}
        </TouchableOpacity>
      )}

      {/* Forgot PIN / Button */}
      {fieldButtonFunction && (
        <TouchableOpacity onPress={fieldButtonFunction}>
          <Text
            style={{
              color: COLORS.black,
              fontFamily: 'InterTight-Bold',
              marginLeft: 6,
            }}
          >
            {fieldButtonLabel}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default InputField;
