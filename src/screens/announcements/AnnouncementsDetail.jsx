import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '../../components/CustomHeader';
import WebView from 'react-native-webview';
import { useRoute } from '@react-navigation/native';

export default function AnnouncementsDetail() {
  const route = useRoute();
  const { title, fileUrl, isPDF, isImage } = route.params;

  // Google Docs Viewer for PDF
  const finalPdfUrl = `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(
    fileUrl
  )}`;

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader headername={title || 'Announcement Details'} />

      {/* IMAGE VIEW */}
      {isImage && (
        <Image
          source={{ uri: fileUrl }}
          style={styles.fullImage}
          resizeMode="contain"
        />
      )}

      {/* PDF VIEW */}
      {isPDF && (
        <WebView
          style={{ flex: 1 }}
          source={{ uri: finalPdfUrl }}
          javaScriptEnabled
          domStorageEnabled
          startInLoadingState
        />
      )}

      {/* FALLBACK (Unknown file type) */}
      {!isPDF && !isImage && (
        <WebView
          style={{ flex: 1 }}
          source={{ uri: fileUrl }}
          startInLoadingState
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
  fullImage: {
    width: '100%',
    height: '100%',
  },
});
