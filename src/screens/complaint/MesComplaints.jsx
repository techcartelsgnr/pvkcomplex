import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { CircleChevronRight } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import CustomHeader from '../../components/CustomHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FontSizes } from '../../theme/theme';

export default function MesComplaints() {
  const navigation = useNavigation();

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#f5f5f5"
        translucent={false}
      />
      {/* Whole screen in SafeAreaView */}
      <SafeAreaView style={styles.screen}>
        {/* Top fixed header */}
        <CustomHeader headername="MES Complaint" />

        {/* Content area: takes remaining space and centers children */}
        <View style={styles.content}>
          {/* New Complaint section */}
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('NewComplaints')}
          >
            <Text style={styles.title}>New Complaint</Text>
            <View style={styles.badges}>
              <Text style={styles.badgesText}>File a new issue</Text>
              <CircleChevronRight size={16} color="#2563eb" />
            </View>
          </TouchableOpacity>

          {/* Track Complaints section */}
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('TrackComplaints')}
          >
            <Text style={styles.title}>Track Complaints</Text>

            <View style={styles.row}>
              <View style={styles.badge}>
                <CircleChevronRight size={16} color="#22c55e" />
                <Text style={styles.badgeText}>Completed</Text>
              </View>

              <View style={styles.badge}>
                <CircleChevronRight size={16} color="#f59e0b" />
                <Text style={styles.badgeText}>In Progress</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  // content (cards) are centered vertically because this View gets remaining space
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    gap: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingVertical: 18,
    paddingHorizontal: 16,
    elevation: 1,
    borderWidth: 1,
    borderColor: COLORS.darkPurple,
  },
  title: {
    fontSize: FontSizes.medium,
    fontFamily: 'Quicksand-Bold',
    marginBottom: 15,
    color: '#111827',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e5e7eb',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    gap: 4,
  },
  badgeText: {
    fontSize: FontSizes.xsmall,
    color: '#374151',
    fontFamily: 'InterTight-Medium',
  },
  badges: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgesText: {
    fontSize: FontSizes.xsmall,
    fontFamily: 'InterTight-Medium',
    color: COLORS.textDark,
    marginRight: 5,
  },
});
