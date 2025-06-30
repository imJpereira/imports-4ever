import React from 'react';
import { View, TextInput, StyleSheet, Pressable, Text } from 'react-native';

export default function SearchBar({ value, onChangeText, onSearch }) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={"Pesquisar ..."}
        placeholderTextColor="#999"
      />
      <Pressable style={styles.button} onPress={onSearch}>
        <Text style={styles.buttonText}>Buscar</Text>
      </Pressable>

    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        flexDirection: 'row',
    
    },
    input: {
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor:'#06C823',
        borderRadius: 8,
        flexGrow: 1,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 16,
        color: '#333',
        marginRight: 5
    },
    button: {
        backgroundColor: '#06C823',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
},
});
