import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ActivityIndicator, Alert } from 'react-native';
import { signInWithEmailAndPassword } from '../api/firebase';
import { useAuth } from '../contexts';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password.');
      return;
    }

    setLoading(true);
    setError('');

    const result = await signInWithEmailAndPassword(email.trim(), password);

    setLoading(false);

    if (result.success) {
      login(result.data);
      navigation.replace('Home');
    } else {
      setError(result.error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ABA App</Text>
      <Text style={styles.subtitle}>Welcome! Please log in to continue.</Text>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#9caf9dff"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          autoComplete="email"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#9ca3af"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
          autoComplete="password"
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>

      <TouchableOpacity
        style={[styles.loginButton, loading && styles.loginButtonDisabled]}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.loginText}>Login</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('SignUp')}
        style={styles.signUpLink}
      >
        <Text style={styles.signUpLinkText}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#466effff',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    color: '#000000ff',
    marginBottom: 32,
    textAlign: 'center',
  },
  loginButton: {
    backgroundColor: '#3b82f6',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    marginBottom: 16,
  },
  loginText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 24,
  },
  input: {
    backgroundColor: 'white',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 16,
    color: '#111827',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 14,
    marginTop: 4,
    textAlign: 'center',
  },
  loginButtonDisabled: {
    opacity: 0.6,
  },
  signUpLink: {
    marginTop: 8,
  },
  signUpLinkText: {
    fontSize: 14,
    color: '#fafafaff',
    textDecorationLine: 'underline',
  },
});
