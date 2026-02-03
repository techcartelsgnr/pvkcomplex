import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '../../components/CustomHeader';
import WebView from 'react-native-webview';
import { useRoute } from '@react-navigation/native';

export default function RwaAdvisoryDetail() {
  const route = useRoute();
  const { pdfUrl, title } = route.params;

  // Detect file type
  const lowerUrl = pdfUrl.toLowerCase();

  const isImage =
    lowerUrl.endsWith('.jpg') ||
    lowerUrl.endsWith('.jpeg') ||
    lowerUrl.endsWith('.png') ||
    lowerUrl.endsWith('.webp') ||
    lowerUrl.endsWith('.heic');

  const isPDF = lowerUrl.endsWith('.pdf');

  // If PDF → Show in Google Docs Viewer
  const finalPdfUrl = `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(
    pdfUrl,
  )}`;

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader headername={title || 'PVK Advisory Details'} />

      {/* Show Image */}
      {isImage && (
        <Image
          source={{ uri: pdfUrl }}
          style={styles.fullImage}
          resizeMode="contain"
        />
      )}

      {/* Show PDF */}
      {isPDF && (
        <WebView
          style={{ flex: 1 }}
          source={{ uri: finalPdfUrl }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
        />
      )}

      {/* If neither PDF nor image */}
      {!isImage && !isPDF && (
        <WebView
          style={{ flex: 1 }}
          source={{ uri: pdfUrl }}
          startInLoadingState={true}
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
