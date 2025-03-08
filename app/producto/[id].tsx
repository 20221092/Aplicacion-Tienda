import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import Boton from '../../components/Boton';
import Foother from '../../components/Foother';

const ProductoDetalle = () => {
  const { id } = useLocalSearchParams(); 
  interface Producto {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
  }

  const [producto, setProducto] = useState<Producto | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerProducto = async () => {
      setCargando(true);
      try {
        const respuesta = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!respuesta.ok) {
          throw new Error(`Error al obtener el producto: ${respuesta.status}`);
        }
        const datos = await respuesta.json();
        setProducto(datos);
      } catch (error) {
        console.error('Error al obtener el producto:', error);
      } finally {
        setCargando(false);
      }
    };

    obtenerProducto();
  }, [id]);

  if (cargando) {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Cargando producto...</Text>
        <ActivityIndicator size="large" color="#ff5c5c" />
      </View>
    );
  }

  if (!producto) {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Producto no encontrado</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image source={{ uri: producto.image }} style={styles.imagen} />
        <Text style={styles.titulo}>{producto.title}</Text>
        <Text style={styles.descripcion}>{producto.description}</Text>

        <View style={styles.infoContainer}>
          <Text style={styles.precio}>💰 Precio: ${producto.price}</Text>
          <Text style={styles.categoria}>📦 Categoría: {producto.category}</Text>
        </View>

        <Boton titulo="Comprar Ahora" onPress={() => console.log("Compra iniciada")} variante="primario" />
      </View>

      <Foother fecha="20/02/2025" grupo="5B" />
    </View>
  );
};

export default ProductoDetalle;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1e1e2d', // Fondo oscuro
    padding: 20,
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#2a2a3b', // Fondo oscuro para la tarjeta
    borderRadius: 15,
    paddingVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
    width: '90%',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
    color: '#fff', // Texto en blanco
  },
  descripcion: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
    paddingHorizontal: 10,
    color: '#bbb', // Texto gris claro
  },
  infoContainer: {
    backgroundColor: '#3b3b50', // Fondo más oscuro para la información
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  precio: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ff5c5c', // Rojo para el precio
    marginVertical: 5,
  },
  categoria: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#bbb', // Gris claro
  },
  imagen: {
    width: 200,
    height: 200,
    borderRadius: 10,
    backgroundColor: '#3b3b50', // Fondo oscuro detrás de la imagen
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
});
