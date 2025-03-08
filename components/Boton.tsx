import { Pressable, StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';
import React from 'react';

type props = {
    titulo: string;
    onPress: () => void;
    variante?: 'primario' | 'secundario' | 'peligro';
    estilo?: StyleProp<ViewStyle>;
    disable?: boolean;
    icono?: React.ReactNode;
    posicionIcono?: 'izquierda' | 'derecha';
};

const Boton = (Props: props) => {
    const getVariante = () => {
        switch (Props.variante) {
            case 'secundario': return styles.secundario;
            case 'peligro': return styles.peligro;
            default: return styles.primario;
        }
    };

    return (
        <Pressable 
            onPress={Props.onPress}
            style={[
                styles.boton, 
                getVariante(), 
                Props.estilo, 
                Props.disable && styles.disable
            ]}
            disabled={Props.disable}
        >
            {Props.icono && Props.posicionIcono !== 'derecha' && Props.icono}
            <Text style={styles.titulo}>{Props.titulo}</Text>
            {Props.icono && Props.posicionIcono === 'derecha' && Props.icono}
        </Pressable>
    );
};

export default Boton;

const styles = StyleSheet.create({
    boton: {
        backgroundColor: '#2a2a3b', // Fondo oscuro
        flexDirection: 'row',
        padding: 12,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#3b3b50', // Borde oscuro más claro
    },
    titulo: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        marginStart: 10,
    },
    primario: {
        backgroundColor: '#ff5c5c', // Rojo vibrante como en los botones del Login
        borderColor: '#ff5c5c',
    },
    secundario: {
        backgroundColor: '#3b3b50', // Gris oscuro medio
        borderColor: '#4a4a5f',
    },
    peligro: {
        backgroundColor: '#ff5c5c', // Rojo para acciones peligrosas
        borderColor: '#ff3b3b',
    },
    disable: {
        opacity: 0.5,
    },
});
