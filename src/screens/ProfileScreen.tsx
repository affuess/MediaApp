import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { registerAndCreateTokens, AuthTokens } from '../api/authApi';
import { clearTokens } from '../service/storage';

export const ProfileScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const [tokens, setTokens] = useState<AuthTokens | null>(null);

  const isValid = email.trim().length > 0 && firstName.trim().length > 0 && lastName.trim().length > 0;

  const handleCreateTokens = async () => {
    if (!isValid) {
      Alert.alert('Error', 'Fill in email, first name and last name');
      return;
    }
    setLoading(true);
    try {
      const createdTokens = await registerAndCreateTokens({ email, firstName, lastName });
      setTokens(createdTokens);
      Alert.alert('Done', 'Tokens created and saved');
    } catch (error) {
      Alert.alert('Error', 'Failed to create tokens');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleClearTokens = async () => {
    await clearTokens();
    setTokens(null);
    Alert.alert('Done', 'Tokens removed');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create account</Text>

      <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#94a3b8"
        value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="First name" placeholderTextColor="#94a3b8"
        value={firstName} onChangeText={setFirstName} />
      <TextInput style={styles.input} placeholder="Last name" placeholderTextColor="#94a3b8"
        value={lastName} onChangeText={setLastName} />

      <TouchableOpacity
        style={[styles.btn, !isValid && styles.btnDisabled]}
        onPress={handleCreateTokens}
        disabled={!isValid || loading}
      >
        {loading ? <ActivityIndicator color="#ffffff" /> : <Text style={styles.btnText}>Create tokens</Text>}
      </TouchableOpacity>

      {tokens && (
        <View style={styles.tokenBox}>
          <Text style={styles.tokenLabel}>Access token:</Text>
          <Text style={styles.tokenValue} numberOfLines={1}>{tokens.accessToken}</Text>
          <Text style={styles.tokenLabel}>Refresh token:</Text>
          <Text style={styles.tokenValue} numberOfLines={1}>{tokens.refreshToken}</Text>

          <TouchableOpacity style={styles.clearBtn} onPress={handleClearTokens}>
            <Text style={styles.clearBtnText}>Remove tokens</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#0f172a' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#ffffff', marginBottom: 24, textAlign: 'center' },
  input: {
    backgroundColor: '#1e293b', color: '#ffffff', borderRadius: 8,
    paddingHorizontal: 14, paddingVertical: 12, marginBottom: 12, fontSize: 16,
  },
  btn: { backgroundColor: '#6366f1', borderRadius: 8, paddingVertical: 14, alignItems: 'center', marginTop: 8 },
  btnDisabled: { backgroundColor: '#4b5563' },
  btnText: { color: '#ffffff', fontWeight: 'bold', fontSize: 16 },
  tokenBox: { marginTop: 24, padding: 16, backgroundColor: '#1e293b', borderRadius: 10 },
  tokenLabel: { color: '#94a3b8', fontSize: 12, marginTop: 8 },
  tokenValue: { color: '#22c55e', fontSize: 13, fontFamily: 'monospace' },
  clearBtn: { marginTop: 16, alignSelf: 'flex-start' },
  clearBtnText: { color: '#ef4444', fontWeight: 'bold' },
});