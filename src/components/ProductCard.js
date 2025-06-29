import { View, Text, StyleSheet, Image, Pressable } from "react-native";

export default function ProductCard({ product, onPress }) {
    
    function formatMoney(valor) {
        if (typeof valor !== 'number' || isNaN(valor)) {
            return 'R$ 0,00';
        }
        return `R$ ${valor.toFixed(2).replace('.', ',')}`;
    }      

    return (
        <Pressable
            onPress={onPress} 
            style={styles.productContainer}
        >
            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    source={{
                        uri: product.image || 'https://via.placeholder.com/150', // placeholder se não tiver imagem
                    }}
                />
            </View>
            <View style={styles.infoContainer}>
                <Text numberOfLines={2} style={styles.productName}>{product.name || 'Sem nome'}</Text>
                <Text numberOfLines={1}>{formatMoney(product.value ?? product.price)}</Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    imageContainer: {
        alignItems: 'center',
        height: '70%',
        width:'100%'
    },
    productContainer: {
        width: 180,
        height: 280,
        margin: 10,
        backgroundColor: '#e9e9e9',
        borderColor: '#a1a1a1',
        borderWidth: 0.8,
        borderRadius: 8,
        elevation: 6,
    },
    image: {
        height: '100%',
        width: '100%'
    },
    infoContainer: {
        padding: 10
    },
    productName: {
        fontSize: 18
    }
});
