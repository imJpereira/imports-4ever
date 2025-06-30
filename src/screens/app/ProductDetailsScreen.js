import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, Image, ScrollView,
  TouchableOpacity, Alert
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { getProductById } from '../../services/ProductService';
import { useShoppingCart } from '../../contexts/ShoppingCartContext';

export default function ProductDetailsScreen({ route }) {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);
  const [currency, setCurrency] = useState('BRL');
  const [selectedSize, setSelectedSize] = useState(null);
  const { addToCart } = useShoppingCart();
  const [loading, setLoading] = useState(true);

  const sizes = ['P', 'M', 'G', 'GG', 'XG'];

  const fetchProduct = async (id, curr) => {
    setLoading(true);
    const { product, error } = await getProductById(id, curr);
    if (error) {
      Alert.alert('Erro', 'Produto não encontrado ou erro ao carregar.');
      setProduct(null);
    } else {
      setProduct(product);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProduct(productId, currency);
  }, [productId, currency]);

  const handleCurrencyChange = (value) => {
    setCurrency(value);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      Alert.alert('Erro', 'Por favor, selecione um tamanho.');
      return;
    }

    const productToAdd = {
      ...product,
      size: selectedSize,
      id: `${product.id}-${selectedSize}`
    };

    addToCart(productToAdd);
    Alert.alert('Sucesso!', 'Produto adicionado ao carrinho.');
  };

  if (loading) {
    return (
      <View style={[styles.center, { flex: 1 }]}>
        <Text>Carregando produto...</Text>
      </View>
    );
  }

  if (!product) {
    return (
      <View style={[styles.center, { flex: 1 }]}>
        <Text>Produto não encontrado.</Text>
      </View>
    );
  }

  const currencySymbol = {
    BRL: 'R$',
    USD: 'US$',
    EUR: '€',
  }[currency] || currency + ' ';

  const displayPrice =
    typeof product.convertedPrice === 'number'
      ? product.convertedPrice
      : product.value || 0;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Image source={{ uri: product.url }} style={styles.productImage} />
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.description}>{product.description || 'Sem descrição'}</Text>

        <Text style={styles.sectionTitle}>Moeda</Text>
        <View style={styles.pickerContainer}>
          <Picker selectedValue={currency} onValueChange={handleCurrencyChange} mode="dropdown">
            <Picker.Item label="Real (BRL)" value="BRL" />
            <Picker.Item label="Dólar (USD)" value="USD" />
            <Picker.Item label="Euro (EUR)" value="EUR" />
          </Picker>
        </View>

        <View style={styles.priceBox}>
          <Text style={styles.finalPrice}>
            {currencySymbol} {displayPrice.toFixed(2).replace('.', ',')}
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Tamanhos disponíveis</Text>
        <View style={styles.sizeContainer}>
          {sizes.map((size) => (
            <TouchableOpacity
              key={size}
              style={[styles.sizeButton, selectedSize === size && styles.sizeButtonSelected]}
              onPress={() => setSelectedSize(size)}
            >
              <Text style={[styles.sizeText, selectedSize === size && styles.sizeTextSelected]}>
                {size}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
          <Text style={styles.addToCartText}>Adicionar ao carrinho</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#f0f0f0', flex: 1 },
  card: {
    margin: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
    padding: 20,
    elevation: 5,
  },
  productImage: { width: '100%', height: 300, resizeMode: 'contain', marginBottom: 16 },
  name: { fontSize: 22, fontWeight: 'bold', marginBottom: 4 },
  description: { fontSize: 14, color: '#555', marginBottom: 8 },
  priceBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  finalPrice: { fontSize: 20, color: '#06C823', fontWeight: 'bold' }, 
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginTop: 20, marginBottom: 10 },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    marginBottom: 10,
  },
  sizeContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  sizeButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  sizeButtonSelected: {
    backgroundColor: 'rgba(6, 200, 35, 0.15)', 
    borderColor: '#06C823',
  },
  sizeText: { fontSize: 16, color: '#333' },
  sizeTextSelected: { color: '#06C823', fontWeight: 'bold' },
  addToCartButton: {
    backgroundColor: '#06C823',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  addToCartText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  center: { justifyContent: 'center', alignItems: 'center' },
});
