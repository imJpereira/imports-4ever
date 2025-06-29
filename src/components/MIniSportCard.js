import { View, Text, StyleSheet, ImageBackground, Pressable } from "react-native";

export default function MiniSportCard({ sport, onPress, smaller }) {
  return (
    <Pressable onPress={onPress} style={[styles.sportContainer, smaller && styles.sportContainerSmall]}>
      <ImageBackground
        source={{ uri: sport.url }}
        style={[styles.image, smaller && styles.imageSmall]}
        imageStyle={{ borderRadius: 10 }}
      >
        <View style={styles.overlay} />
        <Text style={[styles.sportName, smaller && styles.sportNameSmall]}>{sport.name}</Text>
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
  sportContainerSmall: {
    width: 100,
    height: 180,
    margin: 6,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageSmall: {
    justifyContent: 'flex-end',
    paddingBottom: 8,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    zIndex: 1,
  },
  sportName: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    zIndex: 2,
  },
  sportNameSmall: {
    fontSize: 14,
    paddingHorizontal: 6,
  },
});
