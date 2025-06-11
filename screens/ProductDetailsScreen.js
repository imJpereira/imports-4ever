import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';

export default function CamisaDoBrasilScreen() {
  const [selectedSize, setSelectedSize] = useState(null);

  const product = {
    name: "Camisa oficial da seleção brasileira 2024",
    description: "Camisa oficial da seleção brasileira 2024",
    review: 4.5,
    price: 199.90,
    discount: 20,
    finalPrice: 159.92,
    category: "Futebol",
    brand: "Nike",
    stock: 25,
    image: "https://acdn-us.mitiendanube.com/stores/001/055/309/products/376fad4f1-57ca58960a0e7750d116645796652096-1024-1024.jpeg",
    tags: ["camisa", "seleção", "brasil"]
  };

  const sizes = ['P', 'M', 'G', 'GG', 'XG'];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Image source={{ uri: product.image }} style={styles.productImage} />

        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.brand}>Marca: {product.brand}</Text>

        

        <View style={styles.priceBox}>
          <Text style={styles.finalPrice}>R$ {product.finalPrice.toFixed(2)}</Text>
          <Text style={styles.oldPrice}>R$ {product.price.toFixed(2)}</Text>
          <Text style={styles.discount}>{product.discount}% off</Text>
        </View>

        

        <Text style={styles.sectionTitle}>Tamanhos disponíveis</Text>
        <View style={styles.sizeContainer}>
          {sizes.map(size => (
            <TouchableOpacity
              key={size}
              style={[
                styles.sizeButton,
                selectedSize === size && styles.sizeButtonSelected,
              ]}
              onPress={() => setSelectedSize(size)}
            >
              <Text
                style={[
                  styles.sizeText,
                  selectedSize === size && styles.sizeTextSelected,
                ]}
              >
                {size}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Calcular frete</Text>
        <View style={styles.cepContainer}>
          <TextInput placeholder="Digite o CEP" style={styles.cepInput} />
          <TouchableOpacity style={styles.cepButton}>
            <Text style={styles.cepButtonText}>Calcular</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.addToCartButton}>
          <Text style={styles.addToCartText}>Adicionar ao carrinho</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0',
    flex: 1,
  },
  card: {
    margin: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  productImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    marginBottom: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  brand: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  review: {
    fontSize: 14,
    color: '#777',
    marginBottom: 12,
  },
  priceBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  finalPrice: {
    fontSize: 20,
    color: 'green',
    fontWeight: 'bold',
  },
  oldPrice: {
    fontSize: 16,
    color: '#aaa',
    textDecorationLine: 'line-through',
  },
  discount: {
    fontSize: 14,
    color: 'red',
  },
  pix: {
    fontSize: 14,
    color: '#555',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  sizeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  sizeButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  sizeButtonSelected: {
    backgroundColor: '#eaffea',
    borderColor: 'green',
  },
  sizeText: {
    fontSize: 16,
    color: '#333',
  },
  sizeTextSelected: {
    color: 'green',
    fontWeight: 'bold',
  },
  cepContainer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
    marginBottom: 16,
  },
  cepInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
  },
  cepButton: {
    backgroundColor: 'green',
    paddingHorizontal: 16,
    justifyContent: 'center',
    borderRadius: 6,
  },
  cepButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  addToCartButton: {
    backgroundColor: 'green',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  addToCartText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
