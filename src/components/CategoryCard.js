import { View, Text, StyleSheet, Pressable } from "react-native";

export default function CategoryCard({ category, onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={styles.content}>
        <Text numberOfLines={2} style={styles.name}>
          {category.name}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 150,             
    height: 260,            
    margin: 10,
    backgroundColor: '#E8F5E9',  
    borderColor: '#A5D6A7',     
    borderWidth: 1,
    borderRadius: 10,
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    paddingHorizontal: 8,
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2E7D32',     
    textAlign: 'center',
  },
});
