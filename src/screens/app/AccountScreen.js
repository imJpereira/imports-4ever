import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {
  Ionicons,
  Feather,
  MaterialIcons,
  AntDesign,
} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../contexts/AuthContext';

export default function AccountScreen() {
  const navigation = useNavigation();
  const { user, signOut } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Sair da conta',
      'Tem certeza que deseja sair?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Sair', style: 'destructive', onPress: () => signOut() },
      ],
      { cancelable: true }
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.userInfo}>
        <Ionicons name="person-circle-outline" size={70} color="#999" />
        <View style={{ flex: 1, marginLeft: 15 }}>
          <View style={styles.greetingRow}>
            <Text style={styles.userName}>
              Olá, <Text style={{ fontWeight: 'bold' }}>{user.name}</Text>
            </Text>

            <TouchableOpacity onPress={handleLogout} style={styles.iconButton}>
              <Feather name="log-out" size={24} color="gray" style={styles.iconAdjust} />
            </TouchableOpacity>
          </View>
          <Text style={styles.registerDate}>Cadastrado em 18/03/2025</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.option}
        onPress={() => navigation.navigate('Pedidos')}
      >
        <Feather name="box" size={24} color="#06C823" />
        <View style={styles.optionText}>
          <Text style={styles.optionTitle}>Meus pedidos</Text>
          <Text style={styles.optionSubtitle}>Acompanhe seus pedidos aqui</Text>
        </View>
        <Feather name="chevron-right" size={24} color="#06C823" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.option}>
        <AntDesign name="staro" size={24} color="#06C823" />
        <View style={styles.optionText}>
          <Text style={styles.optionTitle}>Avalie nosso aplicativo</Text>
          <Text style={styles.optionSubtitle}>Sua opinião é importante para nós!</Text>
        </View>
        <Feather name="chevron-right" size={24} color="#06C823" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.option}
        onPress={() => navigation.navigate('Conta')}
      >
        <Feather name="user" size={24} color="#06C823" />
        <View style={styles.optionText}>
          <Text style={styles.optionTitle}>Dados Pessoais</Text>
          <Text style={styles.optionSubtitle}>Gerencie suas informações com segurança.</Text>
        </View>
        <Feather name="chevron-right" size={24} color="#06C823" />
      </TouchableOpacity>

      {user?.type === 'Admin' && (
        <>
          <TouchableOpacity
            style={styles.option}
            onPress={() => navigation.navigate('Cadastro de Produtos')}
          >
            <MaterialIcons name="inventory" size={24} color="#06C823" />
            <View style={styles.optionText}>
              <Text style={styles.optionTitle}>Cadastro de Produto</Text>
              <Text style={styles.optionSubtitle}>Adicione novos produtos ao sistema.</Text>
            </View>
            <Feather name="chevron-right" size={24} color="#06C823" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.option}
            onPress={() => navigation.navigate('Cadastro de Categorias')}
          >
            <Feather name="tag" size={24} color="#06C823" />
            <View style={styles.optionText}>
              <Text style={styles.optionTitle}>Cadastro de Categoria</Text>
              <Text style={styles.optionSubtitle}>Organize os produtos por categorias.</Text>
            </View>
            <Feather name="chevron-right" size={24} color="#06C823" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.option}
            onPress={() => navigation.navigate('Cadastro de Times')}
          >
            <Feather name="users" size={24} color="#06C823" />
            <View style={styles.optionText}>
              <Text style={styles.optionTitle}>Cadastro de Times</Text>
              <Text style={styles.optionSubtitle}>Configure os times disponíveis no app.</Text>
            </View>
            <Feather name="chevron-right" size={24} color="#06C823" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.option}
            onPress={() => navigation.navigate('Cadastro de Esportes')}
          >
            <MaterialIcons name="sports-soccer" size={24} color="#06C823" />
            <View style={styles.optionText}>
              <Text style={styles.optionTitle}>Cadastro de Esportes</Text>
              <Text style={styles.optionSubtitle}>Gerencie os tipos de esportes cadastrados.</Text>
            </View>
            <Feather name="chevron-right" size={24} color="#06C823" />
          </TouchableOpacity>
        </>
      )}

      <Text style={styles.version}>Versão 1.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  userInfo: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  greetingRow: { flexDirection: 'row', alignItems: 'center' },
  userName: { fontSize: 20 },
  registerDate: { fontSize: 14, color: '#666' },
  iconButton: { marginLeft: 8, padding: 4 },
  iconAdjust: { marginTop: 4 },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  optionText: { flex: 1, marginLeft: 10 },
  optionTitle: { fontSize: 16, fontWeight: 'bold', color: '#000' },
  optionSubtitle: { fontSize: 14, color: '#666' },
  version: { textAlign: 'center', color: '#666', marginTop: 20 },
});
