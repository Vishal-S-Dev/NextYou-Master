// screens/TermsWebViewScreen.tsx
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';

import { FocusAwareStatusBar } from '@/components/ui';
import { colors, Font } from '@/lib';
import { useAgreementStore } from '@/store/use-agreement-store';

const TermsWebViewScreen = () => {
  const insets = useSafeAreaInsets();
  const statusBarHeight = insets.top + 8;
  const bottomHeight = Platform.OS === 'android' ? 20 : insets.bottom;

  const router = useRouter();
  const { onAgree, onDisagree, clearCallbacks } = useAgreementStore();

  useEffect(() => {
    return () => {
      clearCallbacks(); // Clear on screen unmount
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAgree = () => {
    onAgree?.();
    router.back(); // or router.replace('/home')
  };

  const handleDisagree = () => {
    onDisagree?.();
    router.back();
  };

  const htmlSource = require('@assets/html/terms.html');

  return (
    <View style={styles.container}>
      <FocusAwareStatusBar style="dark" />
      <View
        style={{
          flex: 1,
          paddingTop: statusBarHeight,
          paddingBottom: bottomHeight,
        }}
      >
        {/* header */}
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>Terms and Condition</Text>
        </View>
        <WebView
          originWhitelist={['*']}
          source={htmlSource}
          style={{ flex: 1, backgroundColor: colors.bg }}
          allowFileAccess={true}
          javaScriptEnabled={true}
          domStorageEnabled={true}
        />
        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.agreeButton} onPress={handleAgree}>
            <Text style={styles.agreeText}>Agree</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.disagreeButton}
            onPress={handleDisagree}
          >
            <Text style={styles.disagreeText}>Disagree</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default TermsWebViewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontFamily: Font.IBMPlexSans_600SemiBold,
    fontSize: 20,
    textAlign: 'center',
    color: '#000000',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  agreeButton: {
    flex: 1,
    backgroundColor: '#6C47FF',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginRight: 10,
  },
  agreeText: {
    color: '#fff',
    fontWeight: '600',
  },
  disagreeButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#6C47FF',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  disagreeText: {
    color: '#6C47FF',
    fontWeight: '600',
  },
});
