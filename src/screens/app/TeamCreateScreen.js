import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native'
import Animated, { FadeInDown, FadeOutUp } from 'react-native-reanimated'
import {
  getTeams,
  createTeam,
  updateTeam,
  deleteTeam,
  searchTeamsByName,
} from '../../services/TeamService'
import SearchBar from '../../components/SearchBar'

export default function TeamCreateScreen() {
  const [formVisible, setFormVisible] = useState(false)
  const [teams, setTeams] = useState([])
  const [form, setForm] = useState({ nome: '' })
  const [editingTeamId, setEditingTeamId] = useState(null)
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    loadTeams()
  }, [])

  const loadTeams = async () => {
    const { teams, error } = await getTeams()
    if (!error) setTeams(teams)
    else Alert.alert('Erro', 'Erro ao carregar os times')
  }

  const handleChange = value => setForm({ nome: value })

  const handleSubmit = async () => {
    if (!form.nome.trim()) {
      Alert.alert('Erro', 'O nome do time não pode estar vazio.')
      return
    }
    const { error } = editingTeamId
      ? await updateTeam(editingTeamId, form)
      : await createTeam(form)
    if (error) {
      Alert.alert('Erro', error)
      return
    }
    setForm({ nome: '' })
    setEditingTeamId(null)
    setFormVisible(false)
    await loadTeams()
  }

  const handleEdit = team => {
    setForm({ nome: team.name })
    setEditingTeamId(team.id)
    setFormVisible(true)
  }

  const handleDelete = async id => {
    const { error } = await deleteTeam(id)
    if (error) Alert.alert('Erro', error)
    else await loadTeams()
  }

  const handleSearch = async () => {
    if (!searchText.trim()) {
      await loadTeams()
    } else {
      const { teams, error } = await searchTeamsByName(searchText)
      if (!error) setTeams(teams)
      else Alert.alert('Erro', 'Erro na busca')
    }
  }

  const renderItem = ({ item }) => (
    <Animated.View entering={FadeInDown} exiting={FadeOutUp} style={styles.card}>
      <TouchableOpacity onPress={() => handleEdit(item)} style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.name}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteBtn} onPress={() => handleDelete(item.id)}>
        <Text style={styles.deleteText}>EXCLUIR</Text>
      </TouchableOpacity>
    </Animated.View>
  )

  return (
    <View style={styles.container}>
      <SearchBar
        value={searchText}
        onChangeText={setSearchText}
        onSearch={handleSearch}
      />

      {formVisible && (
        <Animated.View
          entering={FadeInDown.duration(300)}
          exiting={FadeOutUp.duration(300)}
          style={styles.formContainer}
        >
          <TextInput
            placeholder="Nome do time"
            placeholderTextColor="#333"
            value={form.nome}
            onChangeText={handleChange}
            style={styles.input}
          />
          <View style={styles.formButtons}>
            <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
              <Text style={styles.submitText}>
                {editingTeamId ? 'ATUALIZAR' : 'CADASTRAR'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => {
                setForm({ nome: '' })
                setFormVisible(false)
                setEditingTeamId(null)
              }}
            >
              <Text style={styles.cancelText}>CANCELAR</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}

      <FlatList
        data={teams}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={teams.length === 0 ? styles.emptyList : null}
        ListEmptyComponent={
          <Text style={styles.emptyMessage}>Nenhum time encontrado</Text>
        }
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
  card: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cardContent: {
    paddingVertical: 6,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    color: '#222',
  },
  deleteBtn: {
    marginTop: 6,
    backgroundColor: 'red',
    borderRadius: 6,
    paddingVertical: 6,
    alignItems: 'center',
  },
  deleteText: {
    color: 'white',
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
