import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { FileText, ImageIcon } from 'lucide-react-native';
import { COLORS, FontSizes } from '../../theme/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '../../components/CustomHeader';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import commanServices from '../../redux/services/commanServices';

export default function AnnouncementsScreen() {
  const navigation = useNavigation();
  const { token } = useSelector(state => state.auth);

  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // --- API Call Function ---
  const loadAnnouncements = async () => {
    const res = await commanServices.getAnnouncements(token);
    setAnnouncements(res.announcements);
  };

  // --- Initial Load ---
  useEffect(() => {
    (async () => {
      await loadAnnouncements();
      setLoading(false);
    })();
  }, []);

  // --- Refresh Handler ---
  const onRefresh = async () => {
    setRefreshing(true);
    await loadAnnouncements();
    setRefreshing(false);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate('AnnouncementsDetail', {
          id: item.id,
          title: item.title,
          fileUrl: item.fileUrl,
          isPDF: item.isPDF,
          isImage: item.isImage,
        })
      }
    >
      <Text style={styles.title}>{item.title}</Text>

      {item.isPDF ? (
        <FileText size={26} color={COLORS.primary} />
      ) : (
        <ImageIcon size={26} color={COLORS.primary} />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader headername="Announcement" />

      {loading ? (
        <ActivityIndicator
          size="large"
          color={COLORS.primary}
          style={{ marginTop: 40 }}
        />
      ) : (
        <FlatList
          data={announcements}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={{ padding: 16 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[COLORS.primary]}
              tintColor={COLORS.primary}
            />
          }
          ListEmptyComponent={
            <Text style={styles.noData}>No announcements available.</Text>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  title: {
    fontSize: FontSizes.normal,
    fontWeight: '600',
    color: COLORS.background,
    flex: 1,
    paddingRight: 10,
  },
  noData: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: FontSizes.normal,
    color: '#777',
    fontWeight: '500',
  },
});
