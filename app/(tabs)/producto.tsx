import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import Boton from '../../components/Boton';

const Productos = () => {
  const router = useRouter();

  type Producto = {
    id: number;
    title: string;
    price?: number;
    description: string;
    category?: string;
    image: string;
    rating?: {
      rate: number;
      count: number;
    };
  };

  // Estados
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);

  useEffect(() => {
    const consultar = async () => {
      setCargando(true);
      try {
        const respuesta = await fetch('https://fakestoreapi.com/products');
        if (!respuesta.ok) throw new Error(`Error en la petición: ${respuesta.status}`);
        const datos = await respuesta.json();
        setProductos(datos);
      } catch (error) {
        console.log('Error al obtener los datos:', error);
      } finally {
        setCargando(false);
      }
    };
    consultar();
  }, []);

  // Renderizar cada producto
  const ProductoItem = (props: Producto) => (
    <View style={styles.card}>
      <Image source={{ uri: props.image }} style={styles.imagen} />
      <Text style={styles.titulo}>{props.title}</Text>
      <Boton
        titulo="Ver Detalles"
        onPress={() => router.push(`/producto/${props.id}`)}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      {cargando ? (
        <View style={styles.loadscreen}>
          <Text style={styles.tituloCargando}>Cargando productos...</Text>
          <ActivityIndicator size="large" color="#ff5c5c" />
        </View>
      ) : (
        <FlatList
          data={productos}
          renderItem={({ item }) => (
            <ProductoItem title={item.title} description={item.description} image={item.image} id={item.id} />
          )}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.flatlist}
        />
      )}
    </View>
  );
};

export default Productos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e2d', // Fondo oscuro
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  loadscreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tituloCargando: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff', // Texto blanco
    marginBottom: 15,
  },
  flatlist: {
    paddingBottom: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#2a2a3b', // Fondo oscuro para tarjetas
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginVertical: 10,
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
  },
  titulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff', // Texto en blanco
    textAlign: 'center',
    marginVertical: 8,
  },
  imagen: {
    height: 130,
    width: 130,
    borderRadius: 10,
    backgroundColor: '#3b3b50', // Fondo oscuro detrás de la imagen
    marginBottom: 10,
  },
});
