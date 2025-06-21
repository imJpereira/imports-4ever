import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useShoppingCart } from '../../contexts/ShoppingCartContext';

const CartItem = ({ item }) => {
  const { incrementQuantity, decrementQuantity, removeFromCart } = useShoppingCart();

  return (
    <View style={styles.itemContainer}>
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>R$ {item.price.toFixed(2)}</Text>
      </View>
      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={() => decrementQuantity(item.id)} style={styles.quantityButton}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>{item.quantity}</Text>
        <TouchableOpacity onPress={() => incrementQuantity(item.id)} style={styles.quantityButton}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => removeFromCart(item.id)} style={styles.removeButton}>
        <Text style={styles.removeButtonText}>Remover</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function ShoppingCartScreen() {
  const { cartItems, cartTotal, clearCart } = useShoppingCart();

  if (cartItems.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyCartContainer}>
          <Text style={styles.emptyCartText}>Seu carrinho está vazio.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={cartItems}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <CartItem item={item} />}
        ListHeaderComponent={() => <Text style={styles.header}>Meu Carrinho</Text>}
      />
      <View style={styles.footer}>
        <Text style={styles.totalText}>Total: R$ {cartTotal.toFixed(2)}</Text>
        <TouchableOpacity style={styles.clearButton} onPress={clearCart}>
          <Text style={styles.clearButtonText}>Limpar Carrinho</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f8',
    },
    emptyCartContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyCartText: {
        fontSize: 18,
        color: '#555',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
    },
    itemContainer: {
        backgroundColor: '#fff',
        padding: 15,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 2,
    },
    itemInfo: {
        flex: 2,
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    itemPrice: {
        fontSize: 14,
        color: '#888',
    },
    quantityContainer: {
        flex: 1.5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    quantityButton: {
        padding: 8,
        backgroundColor: '#ddd',
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    quantityText: {
        marginHorizontal: 15,
        fontSize: 16,
    },
    removeButton: {
        marginLeft: 10,
    },
    removeButtonText: {
        color: 'red',
        fontSize: 12
    },
    footer: {
        padding: 20,
        borderTopWidth: 1,
        borderColor: '#eee',
        backgroundColor: '#fff',
    },
    totalText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'right',
        marginBottom: 10,
    },
    clearButton: {
        backgroundColor: '#ff4d4d',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    clearButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    }
});