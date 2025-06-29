import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet, Text, ActivityIndicator, TouchableOpacity, Image } from "react-native";
import { getSports } from "../../services/SportService";

export default function SportsScreen({ navigation }) {
  const [sports, setSports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSports = async () => {
      setLoading(true);
      const { sports: data, error } = await getSports();
      if (!error) setSports(data);
      else setSports([]);
      setLoading(false);
    };
    fetchSports();
  }, []);

  if (loading) {
    return (
      <View style={[styles.center, styles.container]}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("ProductScreen", { sportId: item.id })}
    >
      {item.url ? <Image source={{ uri: item.url }} style={styles.image} /> : null}
      <Text style={styles.name}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={sports}
        keyExtractor={(item) => item.id?.toString() || item.name}
        numColumns={2}
        renderItem={renderItem}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12, backgroundColor: "#fff" },
  center: { justifyContent: "center", alignItems: "center" },
  row: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
  card: {
    flex: 1,
    marginHorizontal: 8,
    backgroundColor: "#E8F5E9",
    borderRadius: 12,
    alignItems: "center",
    paddingVertical: 14,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 12,
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2E7D32",
    textAlign: "center",
  },
});
