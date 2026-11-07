import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { getServiceHealth } from './src/services/api';
import { colors, radius, space } from './src/theme/tokens';

const services = [
  ['Find care', 'Locate a participating hospital or clinic.'],
  ['Appointments', 'View and manage confirmed visits.'],
  ['My care', 'Access records shared by your care team.'],
];

function StatusPill({ state }) {
  const online = state === 'connected';
  const checking = state === 'checking';
  return (
    <View style={[styles.statusPill, online ? styles.statusOnline : styles.statusOffline]} accessibilityLiveRegion="polite">
      {checking ? <ActivityIndicator size="small" color={colors.muted} /> : <View style={[styles.statusDot, online ? styles.dotOnline : styles.dotOffline]} />}
      <Text style={[styles.statusText, online ? styles.onlineText : styles.offlineText]}>
        {checking ? 'Checking service' : online ? 'Service available' : 'Service status unavailable'}
      </Text>
    </View>
  );
}

export default function App() {
  const [serviceState, setServiceState] = useState('checking');
  const [notice, setNotice] = useState('');

  const checkService = useCallback(async () => {
    setServiceState('checking');
    try {
      await getServiceHealth();
      setServiceState('connected');
    } catch {
      setServiceState('offline');
    }
  }, []);

  useEffect(() => { checkService(); }, [checkService]);

  const unavailable = label => setNotice(`${label} will be available after your hospital enables patient access.`);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.canvas} />
      <ScrollView contentContainerStyle={styles.page} showsVerticalScrollIndicator={false}>
        <View style={styles.topBar}>
          <View accessible accessibilityRole="header" accessibilityLabel="UniHealth patient care">
            <Text style={styles.wordmark}>UniHealth</Text>
            <Text style={styles.overline}>PATIENT CARE</Text>
          </View>
          <Pressable accessibilityRole="button" accessibilityLabel="Refresh service status" onPress={checkService} style={({ pressed }) => [styles.refresh, pressed && styles.pressed]}>
            <Text style={styles.refreshText}>Refresh</Text>
          </Pressable>
        </View>

        <View style={styles.hero}>
          <Text style={styles.eyebrow}>CONNECTED CARE, WHEN YOU NEED IT</Text>
          <Text style={styles.title}>Your care journey, made clearer.</Text>
          <Text style={styles.lede}>Find the right service, keep appointments in one place, and stay informed by your care team.</Text>
          <StatusPill state={serviceState} />
        </View>

        <View style={styles.alert} accessibilityRole="alert">
          <Text style={styles.alertTitle}>For a medical emergency</Text>
          <Text style={styles.alertBody}>Call your local emergency number or go to the nearest emergency department. Do not rely on this app for urgent care.</Text>
        </View>

        <Text style={styles.sectionLabel}>CARE SERVICES</Text>
        <View style={styles.serviceList}>
          {services.map(([label, detail]) => (
            <Pressable key={label} accessibilityRole="button" accessibilityLabel={`${label}. ${detail}`} onPress={() => unavailable(label)} style={({ pressed }) => [styles.serviceCard, pressed && styles.pressed]}>
              <View style={styles.serviceCopy}><Text style={styles.serviceTitle}>{label}</Text><Text style={styles.serviceDetail}>{detail}</Text></View>
              <Text accessibilityElementsHidden style={styles.arrow}>›</Text>
            </Pressable>
          ))}
        </View>

        {notice ? <View style={styles.notice} accessibilityRole="status"><Text style={styles.noticeText}>{notice}</Text></View> : null}
        <Text style={styles.footer}>UniHealth connects participating care teams and patients. Access is enabled by your hospital.</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.canvas },
  page: { padding: space.lg, paddingBottom: space.xxl, gap: space.xl },
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  wordmark: { color: colors.text, fontSize: 24, fontWeight: '800', letterSpacing: -0.5 },
  overline: { color: colors.brand, fontSize: 11, fontWeight: '700', letterSpacing: 1.2, marginTop: 1 },
  refresh: { minHeight: 44, justifyContent: 'center', paddingHorizontal: space.md, borderWidth: 1, borderColor: colors.border, borderRadius: radius.sm, backgroundColor: colors.surface },
  refreshText: { color: colors.brandDark, fontSize: 14, fontWeight: '700' },
  hero: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radius.lg, padding: space.xl, gap: space.md },
  eyebrow: { color: colors.brandDark, fontSize: 11, fontWeight: '800', letterSpacing: 1.1 },
  title: { color: colors.text, fontSize: 32, fontWeight: '800', lineHeight: 39, letterSpacing: -0.8 },
  lede: { color: colors.muted, fontSize: 16, lineHeight: 24 },
  statusPill: { alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', minHeight: 36, paddingHorizontal: space.md, gap: space.sm, borderRadius: radius.pill },
  statusOnline: { backgroundColor: '#E8F7F0' }, statusOffline: { backgroundColor: '#FFF3E0' },
  statusDot: { width: 8, height: 8, borderRadius: 4 }, dotOnline: { backgroundColor: colors.success }, dotOffline: { backgroundColor: colors.warning },
  statusText: { fontSize: 13, fontWeight: '700' }, onlineText: { color: colors.success }, offlineText: { color: colors.warning },
  alert: { borderLeftWidth: 4, borderLeftColor: colors.danger, backgroundColor: '#FFF5F4', padding: space.lg, borderRadius: radius.sm, gap: space.xs },
  alertTitle: { color: colors.danger, fontSize: 15, fontWeight: '800' }, alertBody: { color: colors.text, fontSize: 14, lineHeight: 20 },
  sectionLabel: { color: colors.muted, fontSize: 12, fontWeight: '800', letterSpacing: 1 },
  serviceList: { gap: space.md },
  serviceCard: { minHeight: 92, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: space.lg },
  serviceCopy: { flex: 1, paddingRight: space.md, gap: space.xs }, serviceTitle: { color: colors.text, fontSize: 17, fontWeight: '800' }, serviceDetail: { color: colors.muted, fontSize: 14, lineHeight: 20 },
  arrow: { color: colors.brand, fontSize: 32, fontWeight: '400' },
  notice: { backgroundColor: colors.brandTint, borderRadius: radius.sm, padding: space.lg }, noticeText: { color: colors.brandDark, fontSize: 14, lineHeight: 20, fontWeight: '600' },
  footer: { color: colors.muted, fontSize: 12, lineHeight: 18, textAlign: 'center', paddingHorizontal: space.md },
  pressed: { opacity: 0.72 },
});
