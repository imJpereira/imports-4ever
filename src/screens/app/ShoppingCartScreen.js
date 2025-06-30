import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useShoppingCart } from '../../contexts/ShoppingCartContext';
import { useNavigation } from '@react-navigation/native';

export default function ShoppingCartScreen() {
  const {
    cartItems,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    cartTotalBRL,
  } = useShoppingCart();

  const navigation = useNavigation();

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert('Carrinho vazio', 'Adicione produtos antes de finalizar a compra.');
      return;
    }
    navigation.navigate('Checkout do Pedido');
  };

  const renderItem = ({ item }) => {
    const unitPriceFormatted = `${item.currencySymbol} ${(Number(item.unitValueOriginal) || 0).toFixed(2)}`;
    const subtotalBRL = `R$ ${(Number(item.unitValueConverted || 0) * item.quantity).toFixed(2)}`;

    return (
      <View style={styles.card}>
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.detail}>Tamanho: {item.size}</Text>
          <Text style={styles.detail}>Quantidade: {item.quantity}</Text>
          <Text style={styles.detail}>Valor unitário: {unitPriceFormatted}</Text>
          <Text style={styles.detail}>Subtotal: {subtotalBRL}</Text>
        </View>

        <View style={styles.actions}>
          <View style={styles.qtyButtons}>
            <TouchableOpacity onPress={() => decrementQuantity(item.id)}>
              <Ionicons name="remove-circle-outline" size={24} color="gray" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => incrementQuantity(item.id)} style={{ marginLeft: 8 }}>
              <Ionicons name="add-circle-outline" size={24} color="gray" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => removeFromCart(item.id)}>
            <Ionicons name="trash" size={24} color="#B00020" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total (em R$): R$ {cartTotalBRL.toFixed(2)}</Text>
        <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
          <Text style={styles.checkoutText}>Finalizar Compra</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  infoContainer: {
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  detail: {
    fontSize: 14,
    color: '#555',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    alignItems: 'center',
  },
  qtyButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  totalContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  checkoutButton: {
    backgroundColor: '#06C823',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
