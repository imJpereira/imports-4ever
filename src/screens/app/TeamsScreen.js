import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import { getTeams } from "../../services/TeamService";

export default function TeamsScreen({ navigation }) {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeams = async () => {
      setLoading(true);
      const { teams: data, error } = await getTeams();
      if (!error) setTeams(data);
      else setTeams([]);
      setLoading(false);
    };
    fetchTeams();
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
      onPress={() => navigation.navigate("ProductScreen", { teamId: item.id })}
    >
      <Text style={styles.name}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={teams}
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
    paddingVertical: 24,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2E7D32",
    textAlign: "center",
  },
});
