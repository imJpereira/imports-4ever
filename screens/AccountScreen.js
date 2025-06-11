import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import { Ionicons, Feather, MaterialIcons, AntDesign  } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function AccountScreen() {
  const navigation = useNavigation();

  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState('Usuário');

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const saveName = () => {
    if (userName.trim() === '') {
      Alert.alert('Nome inválido', 'O nome não pode ficar vazio.');
      return;
    }
    setIsEditing(false);
  };

  return (
    <ScrollView style={styles.container}>

      <View style={styles.userInfo}>
        <Ionicons name="person-circle-outline" size={70} color="#999" />
        <View style={{ flex: 1, marginLeft: 15 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={userName}
                onChangeText={setUserName}
                onSubmitEditing={saveName}
                onBlur={saveName}
                autoFocus
              />
            ) : (
              <Text style={styles.userName}>
                Olá, <Text style={{ fontWeight: 'bold' }}>{userName}</Text>
              </Text>
            )}
            <TouchableOpacity onPress={toggleEditing} style={{ marginLeft: 8 }}>
              <Feather name="edit-2" size={20} color="gray" />
            </TouchableOpacity>
          </View>
          <Text style={styles.registerDate}>Cadastrado em 18/03/2025</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.option}
        onPress={() => navigation.navigate('OrderScreen')}
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

      <TouchableOpacity style={styles.option}>
        <Feather name="user" size={24} color="#06C823" />
        <View style={styles.optionText}>
          <Text style={styles.optionTitle}>Dados Pessoais</Text>
          <Text style={styles.optionSubtitle}>Gerencie suas informações com segurança.</Text>
        </View>
        <Feather name="chevron-right" size={24} color="#06C823" />
      </TouchableOpacity>

      <Text style={styles.version}>Versão 1.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  header: { fontSize: 20, fontWeight: 'bold', color: '#06C823' },
  userInfo: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  userName: { fontSize: 20 },
  registerDate: { fontSize: 14, color: '#666' },
  input: {
    fontSize: 20,
    borderBottomWidth: 1,
    borderColor: '#06C823',
    paddingVertical: 2,
    paddingHorizontal: 4,
    minWidth: 100,
  },
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
  version: { textAlign: 'center', color: '#666' },
});
