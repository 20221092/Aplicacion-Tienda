import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';

export default function Login() {
  const router = useRouter();

  const handleLogin = () => {
    router.replace('/(tabs)/categorias');
  };

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../assets/cli.png')} resizeMode="contain" />
      <Text style={styles.title}>Bienvenido</Text>
      <View style={styles.formContainer}>
        <TextInput style={styles.input} placeholder="Usuario" placeholderTextColor="#bbb" />
        <TextInput style={styles.input} placeholder="Contraseña" placeholderTextColor="#bbb" secureTextEntry />
      </View>
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.registerButton}>
        <Text style={styles.registerText}>¿No tienes cuenta? Regístrate</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1e1e2d' },
  logo: { marginBottom: 20, width: 120, height: 120 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginBottom: 20 },
  formContainer: { width: '85%', backgroundColor: '#2a2a3b', padding: 20, borderRadius: 10 },
  input: { height: 50, backgroundColor: '#3b3b50', color: '#fff', borderRadius: 8, paddingHorizontal: 15, marginBottom: 15 },
  button: { backgroundColor: '#ff5c5c', paddingVertical: 14, width: '85%', borderRadius: 8, alignItems: 'center', marginTop: 15 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  registerButton: { marginTop: 15 },
  registerText: { color: '#ff5c5c', fontSize: 14 },
});