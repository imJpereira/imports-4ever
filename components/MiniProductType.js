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
        width: 200,
        height: 100,
        borderRadius: 8,
        backgroundColor: "#a3a3a3",
    },
    typeName: {
        textAlign: 'center',
        fontSize: 24,
    }

});; 