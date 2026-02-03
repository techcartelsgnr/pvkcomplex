import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking,
  ActivityIndicator,
  RefreshControl,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FontSizes } from '../../theme/theme';
import CustomHeader from '../../components/CustomHeader';
import { PhoneCall } from 'lucide-react-native';
import { useSelector } from 'react-redux';
import commanServices from '../../redux/services/commanServices';

const { width, height } = Dimensions.get('window');
const BASE_WIDTH = 414; // reference device
const scale = size => (width / BASE_WIDTH) * size;

export default function HelplineScreen() {
  const { token } = useSelector(state => state.auth);

  const [helplines, setHelplines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Load contacts from API
  const loadContacts = async () => {
    const res = await commanServices.getContacts(token);
    setHelplines(res.contacts); // API mapped list
  };

  useEffect(() => {
    (async () => {
      await loadContacts();
      setLoading(false);
    })();
  }, []);

  // Pull to refresh
  const onRefresh = async () => {
    setRefreshing(true);
    await loadContacts();
    setRefreshing(false);
  };

  const makeCall = number => {
    Linking.openURL(`tel:${number}`);
  };

  const renderCard = item => (
    <View key={item.id} style={styles.card}>
      {/* Left Image */}
      <Image source={{ uri: item.image }} style={styles.profileImage} />

      {/* Middle Content */}
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.name}>{item.designation}</Text>

        <View style={styles.row}>
          <Text style={styles.phone}>{item.phone}</Text>

          {/* Call Button */}
          <TouchableOpacity
            style={styles.callButton}
            onPress={() => makeCall(item.phone)}
          >
            <PhoneCall size={15} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader headername="Helpline Numbers" />

      {loading ? (
        <ActivityIndicator
          size="large"
          color={COLORS.primary}
          style={{ marginTop: 40 }}
        />
      ) : (
        <ScrollView
          contentContainerStyle={styles.content}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[COLORS.primary]}
            />
          }
          showsVerticalScrollIndicator={false}
        >
          {helplines.map(renderCard)}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    paddingBottom: 55,
  },
  content: {
    padding: 16,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    padding: 14,
    borderRadius: 12,
    marginBottom: 14,
    alignItems: 'center',
    elevation: 1,
  },
  profileImage: {
    width: scale(45),
    height: scale(45),
    borderRadius: 100,
    marginRight: 12,
    borderWidth: 2,
    borderColor: COLORS.primary,
    backgroundColor: '#eee',
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    fontSize: FontSizes.normal,
    fontFamily: 'Quicksand-Bold',
    color: COLORS.black,
  },
  name: {
    fontSize: FontSizes.small,
    color: '#6b7280',
    fontFamily: 'Quicksand-Medium',
    marginTop: 2,
  },
  row: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  phone: {
    fontSize: FontSizes.normal,
    fontFamily: 'Quicksand-Bold',
    color: COLORS.primary,
    marginRight: 10,
  },
  callButton: {
    backgroundColor: COLORS.darkPurple,
    padding: 8,
    borderRadius: 8,
  },
});
