// src/screens/LoginScreen.js

import React, { useState, useEffect } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, 
  Alert, ActivityIndicator, KeyboardAvoidingView, Platform 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons'; 

// --- 1. UPDATED: IMPORT FROM SHARED CONFIG ---
import { auth } from '../../firebaseConfig'; 
import { signInWithEmailAndPassword } from 'firebase/auth';

// Added SecureStore for Remember Me logic
import * as SecureStore from 'expo-secure-store';

export default function LoginScreen({ navigation }) {
  // --- State Management ---
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // --- 2. Check for saved credentials on load ---
  useEffect(() => {
    checkSavedCredentials();
  }, []);

  const checkSavedCredentials = async () => {
    try {
      const savedEmail = await SecureStore.getItemAsync('userEmail');
      const savedPass = await SecureStore.getItemAsync('userPassword');
      if (savedEmail && savedPass) {
        setEmail(savedEmail);
        setPassword(savedPass);
        setRememberMe(true);
      }
    } catch (e) {
      console.log('Error loading saved credentials');
    }
  };

  // --- 3. Login Logic ---
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Input Required', 'Please enter your registered Email and Password.');
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);

      if (rememberMe) {
        await SecureStore.setItemAsync('userEmail', email);
        await SecureStore.setItemAsync('userPassword', password);
      } else {
        await SecureStore.deleteItemAsync('userEmail');
        await SecureStore.deleteItemAsync('userPassword');
      }

      Alert.alert('Authorized', 'Welcome back to UNI-HEALTH!');
      // NORMAL PATIENT: isGuest = false
      navigation.navigate('Home', { isGuest: false });
    } catch (error) {
      let msg = 'Invalid email or password. Please try again.';
      if (error.code === 'auth/user-not-found') msg = 'No patient record found with this email.';
      if (error.code === 'auth/wrong-password') msg = 'Incorrect password. Please verify and retry.';
      Alert.alert('Access Denied', msg);
    } finally {
      setLoading(false);
    }
  };

  // --- 4. Guest Login Logic ---
  const handleGuestLogin = () => {
    console.log('Guest entry triggered');
    // GUEST: mark isGuest = true → PatientHome will lock non‑emergency features
    navigation.navigate('Home', { isGuest: true });
  };

  return (
    <LinearGradient colors={['#0891b2', '#0e7490']} style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.innerContainer}
      >
        <View style={styles.card}>
          <Text style={styles.brand}>UNI-HEALTH</Text>
          <Text style={styles.title}>PATIENT & CLINICAL PORTAL</Text>

          {/* Email Field */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Registered Email</Text>
            <TextInput
              style={styles.input}
              placeholder="patient@unihealth.com"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              placeholderTextColor="#bdc3c7"
            />
          </View>

          {/* Password Field */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Access Password</Text>
            <View style={styles.passwordWrapper}>
              <TextInput
                style={styles.passwordInput}
                placeholder="********"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!isPasswordVisible}
                placeholderTextColor="#bdc3c7"
              />
              <TouchableOpacity 
                style={styles.eyeIcon} 
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                <Ionicons 
                  name={isPasswordVisible ? 'eye-off' : 'eye'} 
                  size={22} 
                  color="#0891b2" 
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Remember Me Toggle */}
          <TouchableOpacity 
            activeOpacity={0.7}
            style={styles.rememberRow} 
            onPress={() => setRememberMe(!rememberMe)}
          >
            <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
              {rememberMe && <Text style={styles.checkMark}>✓</Text>}
            </View>
            <Text style={styles.rememberText}>Remember my credentials</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity 
            style={[styles.loginBtn, loading && { backgroundColor: '#bdc3c7' }]} 
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.btnText}>SIGN IN TO WORKSPACE</Text>
            )}
          </TouchableOpacity>

          {/* Guest Link */}
          <TouchableOpacity 
            onPress={handleGuestLogin} 
            style={styles.guestLinkWrapper}
            disabled={loading}
          >
            <Text style={styles.guestText}>
              Not a member yet? <Text style={styles.guestLink}>Login as Guest</Text>
            </Text>
          </TouchableOpacity>

          {/* Footer */}
          <TouchableOpacity 
            onPress={() => navigation.navigate('Register')}
            style={styles.footer}
          >
            <Text style={styles.footerText}>
              Need a full patient account? <Text style={styles.link}>Sign Up</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  innerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: { 
    width: '90%', 
    maxWidth: 420,
    backgroundColor: '#ffffff', 
    paddingHorizontal: 26, 
    paddingVertical: 36, 
    borderRadius: 24, 
    elevation: 8,
    shadowColor: '#0891b2',
    shadowOpacity: 0.15,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 6 },
  },
  brand: { fontSize: 32, fontWeight: '800', color: '#0f172a', textAlign: 'center', letterSpacing: 1 },
  title: { fontSize: 11, color: '#0891b2', textAlign: 'center', marginBottom: 28, fontWeight: '700', letterSpacing: 1.2, textTransform: 'uppercase', marginTop: 4 },
  inputGroup: { marginBottom: 18 },
  label: { fontSize: 12, fontWeight: '700', color: '#334155', marginBottom: 8, marginLeft: 2, textTransform: 'uppercase', letterSpacing: 0.5 },
  input: { backgroundColor: '#f8fafc', padding: 14, borderRadius: 12, fontSize: 15, color: '#0f172a', borderWidth: 1, borderColor: '#cbd5e1' },
  passwordWrapper: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#f8fafc', 
    borderRadius: 12, 
    borderWidth: 1, 
    borderColor: '#cbd5e1',
  },
  passwordInput: { flex: 1, padding: 14, fontSize: 15, color: '#0f172a' },
  eyeIcon: { paddingHorizontal: 14, minHeight: 44, justifyContent: 'center' },
  rememberRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 22, marginLeft: 2 },
  checkbox: { width: 22, height: 22, borderWidth: 2, borderColor: '#0891b2', borderRadius: 6, marginRight: 10, justifyContent: 'center', alignItems: 'center' },
  checkboxChecked: { backgroundColor: '#0891b2' },
  checkMark: { color: '#fff', fontSize: 13, fontWeight: 'bold' },
  rememberText: { color: '#64748b', fontSize: 13, fontWeight: '500' },
  loginBtn: { backgroundColor: '#0891b2', minHeight: 50, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginTop: 6, elevation: 3, shadowColor: '#0891b2', shadowOpacity: 0.2, shadowRadius: 8, shadowOffset: { width: 0, height: 2 } },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 14, letterSpacing: 1 },
  guestLinkWrapper: { marginTop: 18, alignItems: 'center', minHeight: 44, justifyContent: 'center' },
  guestText: { color: '#64748b', fontSize: 13, fontWeight: '500' },
  guestLink: { color: '#0891b2', fontWeight: '700', textDecorationLine: 'underline' },
  footer: { marginTop: 14, alignItems: 'center', minHeight: 44, justifyContent: 'center' },
  footerText: { color: '#64748b', fontSize: 13, fontWeight: '500' },
  link: { color: '#0891b2', fontWeight: '700' },
});
