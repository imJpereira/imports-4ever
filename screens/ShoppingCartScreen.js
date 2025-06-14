import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const ShoppingCartScreen = ({navigation}) => {
  const [carrinho, setCarrinho] = useState([
    { id: '1', nome: 'Camisa Bagual do Sul', preco: 69.69, quantidade: 1 },
    { id: '2', nome: 'Jersey Mcdonalds Nuggets', preco: 149.90, quantidade: 2 },
    { id: '3', nome: 'Camisa Furini Lanches', preco: 199.99, quantidade: 1 },
  ]);

  const removerItem = (id) => {
    const novoCarrinho = carrinho.filter(item => item.id !== id);
    setCarrinho(novoCarrinho);
  };

  const calcularTotal = () => {
    return carrinho.reduce((total, item) => total + item.preco * item.quantidade, 0).toFixed(2);
  };

  const finalizarCompra = () => {
    navigation.navigate('Checkout', {
      carrinho: carrinho,
      total: calcularTotal(),
    });
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View>
        <Text style={styles.nome}>{item.nome}</Text>
        <Text>Qtd: {item.quantidade}</Text>
        <Text>R$ {(item.preco * item.quantidade).toFixed(2)}</Text>
      </View>
      <TouchableOpacity onPress={() => removerItem(item.id)}>
        <Text style={styles.remover}>Remover</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Meu Carrinho:</Text>

      <FlatList
        data={carrinho}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.vazio}>Seu carrinho está vazio.</Text>}
      />

      <View style={styles.footer}>
        <Text style={styles.total}>Total: R$ {calcularTotal()}</Text>
        <TouchableOpacity style={styles.botao} onPress={finalizarCompra}>
          <Text style={styles.botaoTexto}>Finalizar Compra</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ShoppingCartScreen;

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
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  nome: {
    fontSize: 16,
    fontWeight: '500',
  },
  remover: {
    color: 'red',
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderColor: '#ccc',
    paddingTop: 20,
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  botao: {
    backgroundColor: '#008000',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 16,
  },
  vazio: {
    textAlign: 'center',
    color: '#888',
    marginTop: 50,
    fontSize: 16,
  },
});
