import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';

export default function Layout() {
  const router = useRouter();

  useEffect(() => {
    // Simulación de verificación de sesión (puedes cambiarlo según tu lógica de autenticación)
    const isLoggedIn = false; // Cambia a `true` si el usuario está autenticado
    if (!isLoggedIn) {
      router.replace('/login'); // Redirige al login si no ha iniciado sesión
    }
  }, []);

  return (
    <Stack>
      {/* Pantalla de Login */}
      <Stack.Screen name="login" options={{ headerShown: false }} />
      {/* Después del login, muestra las pestañas */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
