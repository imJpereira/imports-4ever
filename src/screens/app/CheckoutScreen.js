import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useShoppingCart } from '../../contexts/ShoppingCartContext';
import { createOrder } from '../../services/OrderService';
import { useAuth } from '../../contexts/AuthContext';

export default function CheckoutScreen({ navigation }) {
  const { cartItems, cartTotalBRL, clearCart } = useShoppingCart();
  const { user } = useAuth();

  const finalizePurchase = async () => {
    if (!user) {
      Alert.alert('Erro', 'Você precisa estar logado para finalizar a compra.');
      return;
    }

    if (cartItems.length === 0) {
      Alert.alert('Carrinho vazio', 'Adicione produtos ao carrinho antes de finalizar.');
      return;
    }

    const invalidQuantityItem = cartItems.find(item => item.quantity <= 0);
    if (invalidQuantityItem) {
      Alert.alert('Quantidade inválida', 'Algum item no carrinho tem quantidade zero ou inválida.');
      return;
    }

    
    const orderItems = cartItems.map(item => ({
      productId: item.originalId,
      quantity: item.quantity,
      size: item.size || undefined,
    }));

    
    const payload = {
      orderItems,
    };

    console.log('Payload enviado para createOrder:', JSON.stringify(payload, null, 2));

    try {
      const { order, error } = await createOrder(payload);

      if (!error) {
        Alert.alert(
          'Pedido realizado com sucesso!',
          'Obrigado pela sua compra.',
          [{
            text: 'OK',
            onPress: () => {
              clearCart();
              navigation.navigate('OrderScreen');
            },
          }]
        );
      } else {
        Alert.alert('Erro', error);
      }
    } catch (error) {
      Alert.alert('Erro', 'Falha ao finalizar o pedido.');
    }
  };

  const renderItem = ({ item }) => {
    const unitPriceFormatted = `${item.currencySymbol} ${(Number(item.unitValueOriginal) || 0).toFixed(2)}`;
    const subtotalBRL = (Number(item.unitValueConverted || 0) * item.quantity).toFixed(2);

    return (
      <View style={styles.itemContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text>Quantidade: {item.quantity}</Text>
        <Text>Tamanho: {item.size || '-'}</Text>
        <Text>Preço unitário: {unitPriceFormatted}</Text>
        <Text>Subtotal (R$): {subtotalBRL}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resumo do Pedido</Text>
      <FlatList
        data={cartItems}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.empty}>Nenhum item no carrinho.</Text>}
      />
      <Text style={styles.total}>Valor Total (em BRL): R$ {cartTotalBRL.toFixed(2)}</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Voltar ao Carrinho</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.finishButton} onPress={finalizePurchase}>
          <Text style={styles.buttonText}>Finalizar Compra</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  itemContainer: { marginBottom: 15, borderBottomWidth: 1, borderColor: '#ddd', paddingBottom: 10 },
  name: { fontSize: 16, fontWeight: '600' },
  total: { fontSize: 20, fontWeight: 'bold', marginTop: 20, textAlign: 'right' },
  empty: { textAlign: 'center', color: '#888', marginTop: 50, fontSize: 16 },
  buttonsContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 30 },
  finishButton: {
    flex: 1,
    backgroundColor: '#06C823',
    padding: 12,
    borderRadius: 8,
    marginLeft: 10,
    alignItems: 'center',
  },
  backButton: {
    flex: 1,
    backgroundColor: '#aaa',
    padding: 12,
    borderRadius: 8,
    marginRight: 10,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 16 },
});
