import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import { useRoute } from "@react-navigation/native";

import ProductCard from "../../components/ProductCard";
import SearchBar from "../../components/SearchBar";

import {
  getProducts,
  searchProductsByName,
  getProductsByCategory,
  getProductsBySport,
  getProductsByTeam,
} from "../../services/ProductService";

export default function ProductScreen({ navigation }) {
  const route = useRoute();
  const { categoryId, sportId, teamId, search } = route.params || {};

  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState(search || "");
  const [error, setError] = useState(null);

  async function fetchProducts() {
    let response;

    if (categoryId) {
      response = await getProductsByCategory(categoryId);
    } else if (sportId) {
      response = await getProductsBySport(sportId);
    } else if (teamId) {
      response = await getProductsByTeam(teamId);
    } else if (searchText.trim() !== "") {
      response = await searchProductsByName(searchText);
    } else {
      response = await getProducts();
    }

    const { products, error } = response;

    if (error) {
      setError(error);
      setProducts([]);
    } else {
      setProducts(products.filter(p => p.status === "ATIVO"));
    }
  }

  async function handleSearch() {
    fetchProducts();
  }

  useEffect(() => {
    fetchProducts();
  }, [categoryId, sportId, teamId, searchText]);

  function renderEmpty() {
    return <Text style={styles.emptyText}>Nenhum produto encontrado.</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <SearchBar
        value={searchText}
        onChangeText={setSearchText}
        onSearch={handleSearch}
      />
      <FlatList
        data={products}
        numColumns={2}
        ListEmptyComponent={renderEmpty}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductCard
            product={{
              name: item.name,
              image: item.url,
              price: item.value,
            }}
            onPress={() =>
              navigation.navigate("ProductDetailsScreen", { productId: item.id })
            }
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  emptyText: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
    color: "#666",
  },
});
