import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { colors, metrics, typography } from '../../../assets/js/theme'

export default function AccountDataScreen() {
  const [nome, setNome] = useState('')
  const [cidade, setCidade] = useState('')
  const [rua, setRua] = useState('')
  const [bairro, setBairro] = useState('')
  const [cep, setCep] = useState('')
  const [telefone, setTelefone] = useState('')
  const [email, setEmail] = useState('')

  function salvarDados() {
    if (!nome.trim() || !email.trim()) {
      Alert.alert('Erro', 'Preencha nome e email antes de salvar.')
      return
    }
    Alert.alert('Sucesso!', 'Dados pessoais salvos com sucesso!')
  }

  function renderInput(label, value, setValue, placeholder, keyboardType = 'default') {
    return (
      <View style={styles.inputGroup}>
        <View style={styles.labelWithIcon}>
          <Text style={styles.label}>{label}</Text>
          <Icon name="edit" size={20} color={colors.primary} />
        </View>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={colors.textPrimary}
          value={value}
          onChangeText={setValue}
          keyboardType={keyboardType}
          autoCapitalize="words"
        />
      </View>
    )
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
  )
}

const styles = StyleSheet.create({
  container: {
    padding: metrics.spacing,
    backgroundColor: colors.background,
    flexGrow: 1
  },
  inputGroup: {
    marginBottom: metrics.spacing
  },
  labelWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: metrics.spacing * 0.25
  },
  label: {
    fontWeight: typography.fontWeightBold,
    fontSize: typography.fontSizeNormal,
    marginRight: metrics.spacing * 0.5,
    color: colors.textPrimary
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: metrics.borderRadius,
    paddingHorizontal: metrics.spacing,
    paddingVertical: metrics.spacing * 0.5,
    fontSize: typography.fontSizeNormal,
    backgroundColor: colors.inputBackground,
    color: colors.textPrimary
  },
  buttonSave: {
    backgroundColor: colors.primary,
    paddingVertical: metrics.spacing,
    borderRadius: metrics.borderRadius,
    alignItems: 'center',
    marginTop: metrics.spacing,
    marginBottom: metrics.spacing * 2
  },
  buttonText: {
    color: colors.textOnPrimary,
    fontSize: typography.fontSizeNormal,
    fontWeight: typography.fontWeightBold
  }
})
