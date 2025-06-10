import { View, Text, StyleSheet, Image, Pressable } from "react-native";

export default function ProductShoppingCartCard({product, onPress}){
    
    function formatMoney(valor) {
        return `R$ ${valor.toFixed(2).replace('.', ',')}`;
    }      

    return(
        <Pressable onPress={onPress} style={styles.productContainer}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{uri: product.productImage}}></Image>
            </View>            
            <View style={styles.infoContainer}>
                <Text numberOfLines={2} style={styles.productName}>{product.productName}</Text>
                <Text numberOfLines={1}>{formatMoney(product.productPrice)}</Text>
            </View>
        </Pressable>
    )
};


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