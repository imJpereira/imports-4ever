import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function AccountDataScreen() {
  const [nome, setNome] = useState('');
  const [cidade, setCidade] = useState('');
  const [rua, setRua] = useState('');
  const [bairro, setBairro] = useState('');
  const [cep, setCep] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');

  function salvarDados() {
    // Aqui pode ir a validação e lógica de salvar
    Alert.alert('Sucesso!', 'Dados pessoais salvos com sucesso!');
  }

  function renderInput(label, value, setValue, placeholder, keyboardType = 'default') {
    return (
      <View style={styles.inputGroup}>
        <View style={styles.labelWithIcon}>
          <Text style={styles.label}>{label}</Text>
          <Icon name="edit" size={20} color="#06C823" />
        </View>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={value}
          onChangeText={setValue}
          keyboardType={keyboardType}
          autoCapitalize="words"
        />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      {renderInput('Nome', nome, setNome, 'Digite seu nome')}
      {renderInput('Cidade', cidade, setCidade, 'Digite sua cidade')}
      {renderInput('Rua', rua, setRua, 'Digite sua rua')}
      {renderInput('Bairro', bairro, setBairro, 'Digite seu bairro')}
      {renderInput('CEP', cep, setCep, 'Digite seu CEP', 'numeric')}
      {renderInput('Telefone', telefone, setTelefone, 'Digite seu telefone', 'phone-pad')}
      {renderInput('Email', email, setEmail, 'Digite seu email', 'email-address')}

      <TouchableOpacity style={styles.buttonSave} onPress={salvarDados}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  inputGroup: {
    marginBottom: 20,
  },
  labelWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  buttonSave: {
    backgroundColor: '#06C823',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
