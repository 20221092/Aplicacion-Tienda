import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';

const ProductosPorCategoria = () => {
  const router = useRouter();
  const { categoria } = useLocalSearchParams(); 

  interface Producto {
    id: number;
    title: string;
    image: string;
  }
  
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    if (!categoria) return;

    const obtenerProductos = async () => {
      setCargando(true);
      try {
        const respuesta = await fetch(`https://fakestoreapi.com/products/category/${categoria}`);
        if (!respuesta.ok) throw new Error(`Error al obtener productos: ${respuesta.status}`);
        const datos = await respuesta.json();
        setProductos(datos);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      } finally {
        setCargando(false);
      }
    };

    obtenerProductos();
  }, [categoria]);

  return (
    <View style={styles.container}>
      {cargando ? (
        <View style={styles.loadscreen}>
          <Text style={styles.titulo}>Cargando productos...</Text>
          <ActivityIndicator size="large" color="#ff5c5c" />
        </View>
      ) : (
        <FlatList
          data={productos}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => router.push(`/producto/${item.id}`)}
            >
              <Image source={{ uri: item.image }} style={styles.imagen} />
              <Text style={styles.texto}>{item.title}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.flatlist}
        />
      )}
    </View>
  );
};

export default ProductosPorCategoria;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e2d', // Fondo oscuro como en el Login
    paddingHorizontal: 15,
    paddingTop: 20,
    justifyContent: 'center',
  },
  loadscreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff', // Texto en blanco
    marginBottom: 15,
  },
  flatlist: {
    paddingBottom: 20,
    paddingHorizontal: 5,
  },
  card: {
    backgroundColor: '#2a2a3b', // Fondo oscuro para las tarjetas
    borderRadius: 12,
    padding: 15,
    marginVertical: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#3b3b50', // Bordes oscuros sutiles
  },
  texto: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff', // Texto en blanco
    textAlign: 'center',
    marginTop: 8,
  },
  imagen: {
    height: 120,
    width: 120,
    borderRadius: 8,
    backgroundColor: '#3b3b50', // Fondo oscuro detrás de la imagen
  },
});
