import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { ArrowLeft } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS, FontSizes } from '../theme/theme';

export default function CustomHeader({ headername }) {
  const navigation = useNavigation();

  return (
    <View style={styles.headerAtten}>
      <TouchableOpacity
        style={styles.backButtonAtten}
        onPress={() => navigation.goBack()}
      >
        <ArrowLeft size={24} color={COLORS.textPrimary} strokeWidth={2} />
      </TouchableOpacity>

      <Text style={styles.headerTitleAtten}>{headername}</Text>

      <View style={{ width: '15%' }} />
    </View>
  );
}

const styles = StyleSheet.create({
  headerAtten: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    backgroundColor: COLORS.darkPurple,
  },
  backButtonAtten: {
    width: '15%',
  },
  headerTitleAtten: {
    flex: 1,
    textAlign: 'center',
    fontSize: FontSizes.medium,
    color: COLORS.textPrimary,
    fontFamily: 'InterTight-Bold',
  },
});
