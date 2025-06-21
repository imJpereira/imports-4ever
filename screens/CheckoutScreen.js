import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const CheckoutScreen = ({ route, navigation }) => {
  const { shoppingCart, total } = route.params;

  const finalizePurchase = () => {
    Alert.alert('Compra finalizada!', 'Obrigado pela sua compra.');
  };

  const backToCart = () => {
    navigation.goBack();
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.nome}>{item.name}</Text>
      <Text>Quantidade: {item.quantity}</Text>
      <Text>Subtotal: R$ {(item.preco * item.quantity).toFixed(2)}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Resumo do Pedido</Text>
      <FlatList
        data={shoppingCart}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.vazio}>Nenhum item no carrinho.</Text>}
      />
      <Text style={styles.total}>Total: R$ {total}</Text>

      <View style={styles.botoesContainer}>
        <TouchableOpacity style={styles.botaoVoltar} onPress={backToCart}>
          <Text style={styles.textoBotao}>Voltar ao Carrinho</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botaoFinalizar} onPress={finalizePurchase}>
          <Text style={styles.textoBotao}>Finalizar Compra</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  itemContainer: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingBottom: 10,
  },
  nome: {
    fontSize: 16,
    fontWeight: '600',
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'right',
  },
  vazio: {
    textAlign: 'center',
    color: '#888',
    marginTop: 50,
    fontSize: 16,
  },
  botoesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  botaoFinalizar: {
    flex: 1,
    backgroundColor: '#008000',
    padding: 12,
    borderRadius: 8,
    marginLeft: 10,
    alignItems: 'center',
  },
  botaoVoltar: {
    flex: 1,
    backgroundColor: '#aaa',
    padding: 12,
    borderRadius: 8,
    marginRight: 10,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
  },
});