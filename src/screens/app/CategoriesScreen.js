import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";

import MiniProductType from "../../components/MiniProductType";
import CategoryCard from "../../components/CategoryCard";
import SearchBar from "../../components/SearchBar";

import { getCategories, searchCategoriesByName } from "../../services/CategoryService";
import { getTeams, searchTeamsByName } from "../../services/TeamService";
import { getSports, searchSportsByName } from "../../services/SportService";

export default function CategoriesScreen({ navigation }) {
  const [searchText, setSearchText] = useState("");
  const [categories, setCategories] = useState([]);
  const [teams, setTeams] = useState([]);
  const [sports, setSports] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);

  async function fetchAll() {
    setLoading(true);
    const { categories: cats } = await getCategories();
    const { teams: tms } = await getTeams();
    const { sports: sprts } = await getSports();

    setCategories(cats || []);
    setTeams(tms || []);
    setSports(sprts || []);
    setLoading(false);
  }

  useEffect(() => {
    fetchAll();
  }, []);

  async function handleSearch() {
    setLoading(true);

    if (searchText.trim() === "") {
      await fetchAll();
    } else {
      const [catRes, teamRes, sportRes] = await Promise.all([
        searchCategoriesByName(searchText.trim()),
        searchTeamsByName(searchText.trim()),
        searchSportsByName(searchText.trim()),
      ]);

      setCategories(catRes?.categories || []);
      setTeams(teamRes?.teams || []);
      setSports(sportRes?.sports || []);
    }

    setLoading(false);
  }

  if (loading) {
    return (
      <View style={[styles.center, styles.container]}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  function SectionHeader({ title, onPress }) {
    return (
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {onPress && (
          <TouchableOpacity onPress={onPress} style={styles.verMaisContainer}>
            <Text style={styles.verMaisText}>VER MAIS</Text>
            <Text style={styles.verMaisArrow}>&#8594;</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  return (
    <>
      <ScrollView style={styles.container}>
        <SearchBar value={searchText} onChangeText={setSearchText} onSearch={handleSearch} />

        {/* Categorias */}
        <SectionHeader title="Categorias" onPress={() => setModalVisible(true)} />
        {categories.length === 0 ? (
          <Text style={styles.emptyText}>Nenhuma categoria encontrada.</Text>
        ) : (
          <FlatList
            data={categories}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id?.toString() || item.name}
            renderItem={({ item }) => (
              <CategoryCard
                category={item}
                onPress={() => navigation.navigate("ProductScreen", { categoryId: item.id })}
              />
            )}
            contentContainerStyle={styles.horizontalList}
          />
        )}

        
        <SectionHeader
          title="Times"
          onPress={() =>
            navigation.getParent()?.navigate("Inicio", {
              screen: "TeamsScreen",
            })
          }
        />
        {teams.length === 0 ? (
          <Text style={styles.emptyText}>Nenhum time encontrado.</Text>
        ) : (
          <FlatList
            data={teams.slice(0, 10)}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id?.toString() || item.name}
            renderItem={({ item }) => (
              <MiniProductType
                type={item}
                onPress={() => navigation.navigate("ProductScreen", { teamId: item.id })}
              />
            )}
            contentContainerStyle={styles.horizontalList}
          />
        )}

        
        <SectionHeader
          title="Esportes"
          onPress={() =>
            navigation.getParent()?.navigate("Inicio", {
              screen: "SportsScreen",
            })
          }
        />
        {sports.length === 0 ? (
          <Text style={styles.emptyText}>Nenhum esporte encontrado.</Text>
        ) : (
          <FlatList
            data={sports.slice(0, 10)}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id?.toString() || item.name}
            renderItem={({ item }) => (
              <MiniProductType
                type={item}
                onPress={() => navigation.navigate("ProductScreen", { sportId: item.id })}
              />
            )}
            contentContainerStyle={styles.horizontalList}
          />
        )}
      </ScrollView>

      
      <Modal visible={modalVisible} animationType="slide" onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Todas as Categorias</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.modalClose}>Fechar</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={categories}
            keyExtractor={(item) => item.id?.toString() || item.name}
            numColumns={2}
            columnWrapperStyle={styles.modalRow}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.modalCardWrapper}
                onPress={() => {
                  setModalVisible(false);
                  navigation.navigate("ProductScreen", { categoryId: item.id });
                }}
              >
                <CategoryCard category={item} />
              </TouchableOpacity>
            )}
            ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma categoria encontrada.</Text>}
          />
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: "#fff",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 24,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#2E7D32",
  },
  emptyText: {
    fontStyle: "italic",
    color: "#888",
    marginBottom: 12,
    textAlign: "center",
  },
  horizontalList: {
    paddingVertical: 10,
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
  verMaisArrow: {
    fontSize: 18,
    color: "#06C823",
  },

  modalContainer: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 12,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#2E7D32",
  },
  modalClose: {
    fontSize: 16,
    fontWeight: "600",
    color: "#06C823",
  },
  modalRow: {
    justifyContent: "space-between",
    marginBottom: 14,
  },
  modalCardWrapper: {
    flex: 1,
    margin: 6,
  },
});
