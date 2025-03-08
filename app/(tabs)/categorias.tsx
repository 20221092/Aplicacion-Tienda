import { ActivityIndicator, FlatList, Text, TouchableOpacity, View, Animated, StyleSheet } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'expo-router';

const Categorias = () => {
  const router = useRouter();
  const [categorias, setCategorias] = useState<{ original: string; traducida: string }[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);
  const fadeAnim = useRef(new Animated.Value(0)).current; // Animación de fade-in

  // Diccionario de traducción de categorías (solo para mostrar en pantalla)
  const traducciones: Record<string, string> = {
    "electronics": "Electrónica",
    "jewelery": "Joyería",
    "men's clothing": "Ropa de Hombre",
    "women's clothing": "Ropa de Mujer",
  };

  useEffect(() => {
    const obtenerCategorias = async () => {
      setCargando(true);
      try {
        const respuesta = await fetch('https://fakestoreapi.com/products/categories');
        if (!respuesta.ok) throw new Error(`Error en la petición: ${respuesta.status}`);
        const datos = await respuesta.json();

        // Guardar las categorías con su traducción, pero manteniendo el valor original para la ruta
        const categoriasFormateadas = datos.map((categoria: string) => ({
          original: categoria,
          traducida: traducciones[categoria] || categoria, // Mostrar la traducción o el nombre original si no hay traducción
        }));

        setCategorias(categoriasFormateadas);

        // Iniciar animación de fade-in
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }).start();
      } catch (error) {
        console.error('Error al obtener categorías:', error);
      } finally {
        setCargando(false);
      }
    };
    obtenerCategorias();
  }, []);

  return (
    <View style={styles.container}>
      {cargando ? (
        <View style={styles.loadscreen}>
          <Text style={styles.title}>Cargando Categorías...</Text>
          <ActivityIndicator size="large" color="#ff5c5c" />
        </View>
      ) : (
        <Animated.View style={[styles.listContainer, { opacity: fadeAnim }]}>
          <FlatList
            data={categorias}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.card}
                onPress={() => router.push(`/categorias/${item.original.toLowerCase().replace(/\s/g, '-')}`)}
                activeOpacity={0.8}
              >
                <Text style={styles.text}>{item.traducida}</Text> 
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.original}
            contentContainerStyle={styles.flatlist}
          />
        </Animated.View>
      )}
    </View>
  );
};

export default Categorias;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e2d', // Fondo oscuro
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  loadscreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  listContainer: {
    backgroundColor: '#2a2a3b', // Fondo oscuro para la lista
    padding: 20,
    borderRadius: 10,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  flatlist: {
    paddingBottom: 20,
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: '#3b3b50', // Fondo de las tarjetas
    borderRadius: 8,
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginVertical: 10,
    alignItems: 'center',
    width: '100%',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff', // Texto blanco
    textAlign: 'center',
    textTransform: 'capitalize',
  },
});
