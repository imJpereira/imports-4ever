import React, { useContext } from 'react';
import { View, Text, FlatList, Image, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { CartContext } from '../contexts/CartContext';

const ShoppingCartScreen = () => {
  const { cartItems, total, removeFromCart, updateQuantity } = useContext(CartContext);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.title}>{item.name}</Text>
        <Text>R$ {item.price.toFixed(2)}</Text>
        <View style={styles.quantityRow}>
          <TouchableOpacity onPress={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}>
            <Text style={styles.quantityButton}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => updateQuantity(item.id, item.quantity + 1)}>
            <Text style={styles.quantityButton}>+</Text>
          </TouchableOpacity>
        </View>
        <Button title="Remover" color="red" onPress={() => removeFromCart(item.id)} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {cartItems.length === 0 ? (
        <Text style={styles.emptyText}>Seu carrinho está vazio</Text>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
          />
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total: R$ {total.toFixed(2)}</Text>
            <Button title="Finalizar Compra" onPress={() => alert('Pedido finalizado!')} />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  item: { flexDirection: 'row', marginVertical: 10 },
  image: { width: 80, height: 80, borderRadius: 8 },
  details: { flex: 1, marginLeft: 10 },
  title: { fontWeight: 'bold', fontSize: 16 },
  quantityRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 8 },
  quantityButton: {
    fontSize: 20,
    paddingHorizontal: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  quantityText: { marginHorizontal: 10, fontSize: 16 },
  totalContainer: { paddingVertical: 20, borderTopWidth: 1, borderColor: '#ccc' },
  totalText: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  emptyText: { textAlign: 'center', marginTop: 50, fontSize: 18 },
});

export default CartScreen;
