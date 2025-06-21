import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native'
import Animated, { FadeInDown, FadeOutUp } from 'react-native-reanimated'
import { colors, metrics, typography } from '../../../assets/js/theme'
import SearchBar from '../../components/SearchBar'

export default function TeamCreateScreen({ navigation }) {
  const [formVisible, setFormVisible] = useState(false)
  const [teams, setTeams] = useState([])
  const [form, setForm] = useState({ nome: '' })
  const [editingIndex, setEditingIndex] = useState(null)
  const [searchText, setSearchText] = useState('')

  const handleChange = value => setForm({ nome: value })

  const handleSubmit = () => {
    if (!form.nome.trim()) {
      Alert.alert('Erro', 'O nome da categoria não pode estar vazio.')
      return
    }
    if (editingIndex !== null) {
      const updated = [...teams]
      updated[editingIndex] = form
      setTeams(updated)
    } else {
      setTeams([...teams, form])
    }
    setForm({ nome: '' })
    setEditingIndex(null)
    setFormVisible(false)
  }

  const handleEdit = index => {
    setForm(teams[index])
    setEditingIndex(index)
    setFormVisible(true)
  }

  const handleDelete = index => {
    const updated = teams.filter((_, i) => i !== index)
    setTeams(updated)
  }

  const renderItem = ({ item, index }) => (
    <Animated.View entering={FadeInDown} style={styles.card}>
      <TouchableOpacity onPress={() => handleEdit(index)} style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.nome}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteBtn} onPress={() => handleDelete(index)}>
        <Text style={styles.deleteText}>EXCLUIR</Text>
      </TouchableOpacity>
    </Animated.View>
  )

  return (
    <View style={styles.container}>
      <SearchBar
        value={searchText}
        onChangeText={setSearchText}
        onSearch={() => {}}
      />

      {formVisible && (
        <Animated.View
          entering={FadeInDown.duration(300)}
          exiting={FadeOutUp.duration(300)}
          style={styles.formContainer}
        >
          <TextInput
            placeholder="Nome da categoria"
            placeholderTextColor={colors.textPrimary}
            value={form.nome}
            onChangeText={handleChange}
            style={styles.input}
          />
          <View style={styles.formButtons}>
            <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
              <Text style={styles.submitText}>
                {editingIndex !== null ? 'ATUALIZAR' : 'CADASTRAR'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => {
                setForm({ nome: '' })
                setFormVisible(false)
                setEditingIndex(null)
              }}
            >
              <Text style={styles.cancelText}>CANCELAR</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}
      <FlatList
        data={teams}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={teams.length === 0 ? styles.emptyList : null}
      />
      {!formVisible && (
        <TouchableOpacity onPress={() => setFormVisible(true)} style={styles.fab}>
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: metrics.spacing,
    backgroundColor: colors.background,
  },
  formContainer: {
    marginBottom: metrics.spacing,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: metrics.borderRadius,
    padding: metrics.spacing * 0.75,
    marginBottom: metrics.spacing * 0.5,
    backgroundColor: colors.inputBackground,
    fontSize: typography.fontSizeNormal,
    color: colors.textPrimary,
  },
  formButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  submitBtn: {
    backgroundColor: colors.primary,
    padding: metrics.spacing * 0.75,
    borderRadius: metrics.borderRadius,
    flex: 1,
    marginRight: metrics.spacing * 0.5,
    alignItems: 'center',
  },
  submitText: {
    color: colors.textOnPrimary,
    fontWeight: typography.fontWeightBold,
  },
  cancelBtn: {
    backgroundColor: colors.danger,
    padding: metrics.spacing * 0.75,
    borderRadius: metrics.borderRadius,
    flex: 1,
    marginLeft: metrics.spacing * 0.5,
    alignItems: 'center',
  },
  cancelText: {
    color: colors.textOnPrimary,
    fontWeight: typography.fontWeightBold,
  },
  card: {
    backgroundColor: colors.cardBackground,
    padding: metrics.spacing * 0.75,
    borderRadius: metrics.borderRadius,
    marginBottom: metrics.spacing * 0.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cardContent: {
    paddingVertical: metrics.spacing * 0.5,
  },
  cardTitle: {
    fontSize: typography.fontSizeTitle,
    fontWeight: typography.fontWeightBold,
    textAlign: 'center',
    color: colors.textPrimary,
  },
  deleteBtn: {
    marginTop: metrics.spacing * 0.5,
    backgroundColor: colors.danger,
    borderRadius: metrics.borderRadius,
    paddingVertical: metrics.spacing * 0.5,
    alignItems: 'center',
  },
  deleteText: {
    color: colors.textOnPrimary,
    fontWeight: typography.fontWeightBold,
  },
  fab: {
    position: 'absolute',
    right: metrics.spacing,
    bottom: metrics.spacing,
    backgroundColor: colors.primary,
    width: metrics.fabSize,
    height: metrics.fabSize,
    borderRadius: metrics.fabSize / 2,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  fabText: {
    color: colors.textOnPrimary,
    fontSize: typography.fontSizeTitle,
    fontWeight: typography.fontWeightBold,
  },
  emptyList: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
