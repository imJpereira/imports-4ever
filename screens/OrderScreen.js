import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';

export default function OrderScreen({ navigation }) {
  const pedidos = [
    { id: '1', nome: 'Pedido 1' },
    { id: '2', nome: 'Pedido 2' },
    { id: '3', nome: 'Pedido 3' },
    { id: '4', nome: 'Pedido 4' },
    { id: '5', nome: 'Pedido 5' },
  ];

  const [quantidades, setQuantidades] = useState(
    pedidos.reduce((acc, pedido) => ({ ...acc, [pedido.id]: 0 }), {})
  );

  const incrementar = (id) => {
    setQuantidades({ ...quantidades, [id]: quantidades[id] + 1 });
  };

  const decrementar = (id) => {
    if (quantidades[id] > 0) {
      setQuantidades({ ...quantidades, [id]: quantidades[id] - 1 });
    }
  };

  const handleVoltar = () => {
    if (navigation && navigation.goBack) {
      navigation.goBack();
    }
  };

  const handleLogout = () => {
    alert('Logout realizado');
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.nome}>{item.nome}</Text>
      <Text style={styles.status}>Seu pedido está a caminho!!</Text>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => decrementar(item.id)}>
          <Ionicons name="trash" size={24} color="#FF3B30" />
        </TouchableOpacity>
        <Text style={styles.quantidade}>{quantidades[item.id]}</Text>
        <TouchableOpacity onPress={() => incrementar(item.id)}>
          <Ionicons name="add-circle-outline" size={24} color="#06C823" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#fff' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={handleVoltar} style={styles.backButton}>
          <Feather name="arrow-left" size={28} color="#06C823" />
        </TouchableOpacity>
        <Text style={styles.title}>Meus pedidos</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Feather name="log-out" size={28} color="#FF3B30" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={pedidos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  backButton: { padding: 5 },
  logoutButton: { padding: 5 },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#06C823',
  },
  list: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  item: {
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
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantidade: {
    fontSize: 16,
    marginHorizontal: 10,
    fontWeight: 'bold',
  },
});
