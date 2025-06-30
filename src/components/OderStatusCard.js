
import { Pressable, Text, StyleSheet } from "react-native";

export default function OrderStatusCard({order, onPress}) { 


    return (
        <Pressable style={styles.main}>
            <Text style={styles.nome}>{order.nome}</Text>
            <Text style={styles.status}>Seu pedido está a caminho!!</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    main: {
        backgroundColor: '#f9f9f9',
        padding: 20,
        marginBottom: 15,
        borderRadius: 10,
        elevation: 2,
    },
    nome: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    status: {
        fontSize: 14,
        color: '#555',
        marginBottom: 10,
    }
}
);