// components/ImageField.js
import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { COLORS } from '../theme/theme';

const ImageUpload = ({ label, imageUri, onPress }) => {
  return (
    <View style={styles.wrapper}>
      {label && <Text style={styles.label}>{label}</Text>}

      <TouchableOpacity style={styles.field} onPress={onPress}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.preview} />
        ) : (
          <Text style={styles.placeholder}>Tap to upload image</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 10,
  },
  label: {
    marginBottom: 4,
    color: COLORS.black,
    fontWeight: '600',
    fontSize: FontSizes.small,
  },
  field: {
    height: 90,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.grayBG,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholder: {
    color: COLORS.placeholder,
    fontFamily: 'InterTight-Medium',
  },
  preview: {
    width: '100%',
    height: '100%',
    borderRadius: 6,
  },
});

export default ImageUpload;
