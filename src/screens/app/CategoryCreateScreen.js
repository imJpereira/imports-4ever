import React, { useState, useEffect } from 'react'
import { View, FlatList, Text, TouchableOpacity, Alert, TextInput, StyleSheet } from 'react-native'
import Animated, { FadeInDown, FadeOutUp } from 'react-native-reanimated'
import SearchBar from '../../components/SearchBar'
import {
  getCategories,
  searchCategoriesByName,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../../services/CategoryService'

export default function CategoryCreateScreen() {
  const [formVisible, setFormVisible] = useState(false)
  const [categories, setCategories] = useState([])
  const [form, setForm] = useState({ nome: '' })
  const [editingCategoryId, setEditingCategoryId] = useState(null)
  const [searchText, setSearchText] = useState('')
  const [searchTriggered, setSearchTriggered] = useState(false)

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = async () => {
    const { categories, error } = await getCategories()
    if (!error) setCategories(categories)
    else Alert.alert('Erro', 'Erro ao carregar as categorias')
  }

  const handleChange = value => setForm({ nome: value })

  const handleSubmit = async () => {
    if (!form.nome.trim()) {
      Alert.alert('Erro', 'O nome da categoria não pode estar vazio.')
      return
    }

    const { error } = editingCategoryId
      ? await updateCategory(editingCategoryId, form)
      : await createCategory(form)

    if (error) {
      Alert.alert('Erro', error)
      return
    }

    setForm({ nome: '' })
    setEditingCategoryId(null)
    setFormVisible(false)
    await loadCategories()
  }

  const handleEdit = category => {
    setForm({ nome: category.name })
    setEditingCategoryId(category.id)
    setFormVisible(true)
  }

  const handleDelete = async id => {
    const { error } = await deleteCategory(id)
    if (error) Alert.alert('Erro', error)
    else await loadCategories()
  }

  const handleSearch = async () => {
    if (!searchText.trim()) {
      await loadCategories()
    } else {
      const { categories, error } = await searchCategoriesByName(searchText)
      if (!error) setCategories(categories)
      else Alert.alert('Erro', 'Erro na busca')
    }
    setSearchTriggered(true)
  }

  const renderItem = ({ item }) => (
    <Animated.View entering={FadeInDown} exiting={FadeOutUp}>
      <TouchableOpacity onPress={() => handleEdit(item)} style={styles.cardContent}>
        <Text style={styles.cardTitle}>
          {item.name}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteBtn}>
        <Text style={styles.deleteText}>EXCLUIR</Text>
      </TouchableOpacity>
    </Animated.View>
  )

  return (
    <View style={styles.container}>
      <SearchBar value={searchText} onChangeText={setSearchText} onSearch={handleSearch} />

      {formVisible && (
        <Animated.View entering={FadeInDown.duration(300)} exiting={FadeOutUp.duration(300)} style={styles.formContainer}>
          <TextInput
            placeholder="Nome da categoria"
            placeholderTextColor="#666"
            value={form.nome}
            onChangeText={handleChange}
            style={styles.input}
          />
          <View style={styles.formButtons}>
            <TouchableOpacity onPress={handleSubmit} style={styles.submitBtn}>
              <Text style={styles.submitText}>{editingCategoryId ? 'ATUALIZAR' : 'CADASTRAR'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              setForm({ nome: '' })
              setFormVisible(false)
              setEditingCategoryId(null)
            }} style={styles.cancelBtn}>
              <Text style={styles.cancelText}>CANCELAR</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}

      <FlatList
        data={categories}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={categories.length === 0 ? styles.emptyList : null}
        ListEmptyComponent={<Text style={styles.emptyMessage}>Nenhuma categoria encontrada</Text>}
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
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  formContainer: {
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#333',
  },
  formButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  submitBtn: {
    backgroundColor: '#06C823',
    flex: 1,
    marginRight: 8,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cancelBtn: {
    backgroundColor: '#999',
    flex: 1,
    marginLeft: 8,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cardContent: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    color: '#222',
  },
  deleteBtn: {
    backgroundColor: 'red',
    borderRadius: 6,
    paddingVertical: 6,
    marginHorizontal: 16,
    marginBottom: 8,
  },
  deleteText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  emptyList: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyMessage: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#555',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#06C823',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  fabText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
})
