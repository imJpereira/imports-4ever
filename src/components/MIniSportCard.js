import { View, Text, StyleSheet, ImageBackground, Pressable } from "react-native";

export default function MiniSportCard({sport, onPress}) {

    
    return (
        <Pressable
            onPress={onPress} 
            style={styles.sportContainer}
            >
            <ImageBackground
                source={{ uri: sport.url }}
                style={styles.image}
                imageStyle={{ borderRadius: 10 }}
            >
                <View style={styles.overlay} />
                <Text style={styles.sportName}>{sport.name}</Text>
            </ImageBackground>
        </Pressable>

    );
}

const styles = StyleSheet.create({

    sportContainer: {
        width: 150,
        height: 300,
        margin: 8,
        borderWidth: 0.8,
        borderRadius: 8,
        elevation: 4,
        overflow: 'hidden',
      },
      image: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // escurece a imagem
        zIndex: 1,
      },
      sportName: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        zIndex: 2,
      },

});; 