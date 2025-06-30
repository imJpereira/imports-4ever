import React, { useState, useCallback } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";

import { useFocusEffect, useRoute } from "@react-navigation/native";

import ProductCard from "../../components/ProductCard";
import MiniProductType from "../../components/MiniProductType";
import MiniSportCard from "../../components/MIniSportCard";
import SearchBar from "../../components/SearchBar";

import { getHighlightedProducts } from "../../services/ProductService";
import { getCategories } from "../../services/CategoryService";
import { getSports } from "../../services/SportService";
import { getTeams } from "../../services/TeamService";

export default function HomeScreen({ navigation }) {
  const route = useRoute();
  const [searchText, setSearchText] = useState("");

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sports, setSports] = useState([]);
  const [teams, setTeams] = useState([]);

  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);

    const { products: prods, error: prodErr } = await getHighlightedProducts();
    const { categories: cats, error: catErr } = await getCategories();
    const { sports: sprts, error: sprtErr } = await getSports();
    const { teams: tms, error: tmsErr } = await getTeams();

    if (!prodErr)
      setProducts(prods.filter((p) => p.status === "ATIVO" && p.highlight === true));
    else setProducts([]);

    if (!catErr) setCategories(cats);
    else setCategories([]);

    if (!sprtErr) setSports(sprts);
    else setSports([]);

    if (!tmsErr) setTeams(tms);
    else setTeams([]);

    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      if (route.params?.redirectTo === "Esportes") {
        navigation.navigate("Esportes");
      } else if (route.params?.redirectTo === "Times") {
        navigation.navigate("Times");
      }
      fetchData();
    }, [route.params])
  );

  if (loading) {
    return (
      <View style={[styles.mainContainer, styles.center]}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  function SectionHeader({ title, onPress }) {
    return (
      <View style={styles.sectionHeader}>
        <Text style={styles.subtitle}>{title}</Text>
        {onPress && (
          <TouchableOpacity style={styles.verMaisContainer} onPress={onPress}>
            <Text style={styles.verMaisText}>VER MAIS</Text>
            <Text style={styles.arrow}>&#8594;</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <ScrollView>
        <SearchBar
          value={searchText}
          onChangeText={setSearchText}
          onSearch={() => navigation.navigate("Produtos", { search: searchText })}
        />

        <View style={styles.listContainer}>
          <Text style={styles.subtitle}>MAIS VISTOS</Text>
          {products.length === 0 ? (
            <Text style={styles.emptyMessage}>Nenhum produto em destaque disponível.</Text>
          ) : (
            <FlatList
              data={products}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id?.toString() || item.name}
              renderItem={({ item }) => (
                <ProductCard
                  product={{
                    ...item,
                    price:
                      typeof item.convertedPrice === "number"
                        ? item.convertedPrice
                        : item.value || 0,
                    image: item.url || item.image || null,
                  }}
                  onPress={() =>
                    navigation.navigate("Sobre o produto", {
                      productId: item.id,
                    })
                  }
                />
              )}
              contentContainerStyle={styles.list}
            />
          )}
        </View>

        <View style={styles.listContainer}>
          <SectionHeader
            title="CATEGORIAS"
            onPress={() => navigation.navigate("Categorias")}
          />
          {categories.length === 0 ? (
            <Text style={styles.emptyMessage}>Nenhuma categoria cadastrada.</Text>
          ) : (
            <FlatList
              data={categories.slice(0, 10)}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id?.toString() || item.name}
              renderItem={({ item }) => (
                <MiniProductType
                  type={{ ...item }}
                  onPress={() => navigation.navigate("Produtos", { categoryId: item.id })}
                />
              )}
              contentContainerStyle={styles.list}
            />
          )}
        </View>

        <View style={styles.listContainer}>
          <SectionHeader
            title="BUSQUE POR ESPORTE"
            onPress={() => navigation.navigate("SportsScreen")}
          />
          {sports.length === 0 ? (
            <Text style={styles.emptyMessage}>Nenhum esporte cadastrado.</Text>
          ) : (
            <FlatList
              data={sports}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id?.toString() || item.name}
              renderItem={({ item }) => (
                <MiniSportCard
                  sport={{ ...item, url: item.url || item.image || null }}
                  onPress={() => navigation.navigate("Produtos", { sportId: item.id })}
                />
              )}
              contentContainerStyle={styles.list}
            />
          )}
        </View>

        <View style={styles.listContainer}>
          <SectionHeader
            title="TIMES"
            onPress={() => navigation.navigate("Times")}
          />
          {teams.length === 0 ? (
            <Text style={styles.emptyMessage}>Nenhum time cadastrado.</Text>
          ) : (
            <FlatList
              data={teams}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id?.toString() || item.name}
              renderItem={({ item }) => (
                <MiniProductType
                  type={{ ...item }}
                  onPress={() => navigation.navigate("Produtos", { teamId: item.id })}
                />
              )}
              contentContainerStyle={styles.list}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    padding: 10,
    flex: 1,
  },
  list: {
    alignItems: "center",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "500",
  },
  listContainer: {
    marginTop: 40,
  },
  emptyMessage: {
    fontStyle: "italic",
    color: "#888",
    paddingLeft: 10,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  verMaisContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  verMaisText: {
    color: "#06C823",
    fontWeight: "bold",
    marginRight: 6,
    fontSize: 14,
  },
  arrow: {
    fontSize: 18,
    color: "#06C823",
  },
});
