import { View, Text, StyleSheet, Image, Pressable } from "react-native";

export default function MiniProductType({type, onPress}) {
    

    return (
        <Pressable
            onPress={onPress} 
            style={styles.typeContainer}
            >
            <Text style={styles.typeName} >{type.name}</Text>
        </Pressable>

    );
}

const styles = StyleSheet.create({

    typeContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
        width: 170,
        height: 60,
        borderRadius: 8,
        backgroundColor: "#228B22",
    },
    //backgroundColor: "#90EE90", quando botão selecionado usar esse background
    typeName: {
        textAlign: 'center',
        fontSize: 20,
        color: '#fff',
        fontWeight:500,
    }

});; 