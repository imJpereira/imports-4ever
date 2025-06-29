import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  Alert,
  Dimensions,
  Modal,
  ScrollView
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown, FadeOutUp } from 'react-native-reanimated';
import SearchBar from '../../components/SearchBar';
import { getSports, createSport, updateSport, deleteSport, searchSportsByName } from '../../services/SportService';
import { uploadImage } from '../../services/imageService';

const placeholderImage = 'https://via.placeholder.com/100';

export default function SportScreen() {
  const [sports, setSports] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [form, setForm] = useState({ name: '', url: null });
  const [editingIndex, setEditingIndex] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    loadSports();
  }, []);

  async function loadSports() {
    const { sports: data } = await getSports();
    setSports(data || []);
  }

  async function handleSearch() {
    if (!searchText.trim()) return loadSports();
    const { sports: results } = await searchSportsByName(searchText.trim());
    setSports(results || []);
  }

  async function pickImage() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permissão necessária', 'Acesso à galeria é obrigatório.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      try {
        const url = await uploadImage(result.assets[0].uri);
        setForm(prev => ({ ...prev, url }));
      } catch {
        Alert.alert('Erro', 'Falha no upload da imagem.');
      }
    }
  }

  async function handleSubmit() {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Nome obrigatório';
    if (!form.url) newErrors.url = 'Imagem obrigatória';
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const payload = { name: form.name.trim(), url: form.url };
    try {
      if (editingIndex !== null) {
        const { sport } = await updateSport(sports[editingIndex].id, payload);
        const updated = [...sports];
        updated[editingIndex] = sport;
        setSports(updated);
      } else {
        const { sport } = await createSport(payload);
        setSports(prev => [...prev, sport]);
      }
      resetForm();
      setFormVisible(false);
    } catch {
      Alert.alert('Erro', 'Falha ao salvar.');
    }
  }

  function handleEdit(index) {
    const s = sports[index];
    setForm({ name: s.name, url: s.url });
    setEditingIndex(index);
    setFormVisible(true);
  }

  async function handleDelete(index) {
    Alert.alert('Confirmar', `Excluir esporte "${sports[index].name}"?`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteSport(sports[index].id);
            setSports(prev => prev.filter((_, i) => i !== index));
            resetForm();
            setFormVisible(false);
          } catch {
            Alert.alert('Erro', 'Não foi possível excluir');
          }
        },
      },
    ]);
  }

  function resetForm() {
    setForm({ name: '', url: null });
    setErrors({});
    setEditingIndex(null);
  }

  const renderItem = ({ item, index }) => (
    <Animated.View entering={FadeInDown} exiting={FadeOutUp} style={styles.card}>
      <TouchableOpacity style={styles.cardContent} onPress={() => handleEdit(index)}>
        <Image source={{ uri: item.url || placeholderImage }} style={styles.cardImage} />
        <Text style={styles.cardTitle}>{item.name}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteBtn} onPress={() => handleDelete(index)}>
        <Ionicons name="trash-outline" size={20} color="#fff" />
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <SearchBar value={searchText} onChangeText={setSearchText} onSearch={handleSearch} />

      <FlatList
        data={sports}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={sports.length === 0 && styles.emptyList}
        ListEmptyComponent={<Text style={styles.emptyMessage}>Nenhum esporte encontrado</Text>}
      />

      {!formVisible && (
        <TouchableOpacity style={styles.fab} onPress={() => setFormVisible(true)}>
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>
      )}

      <Modal visible={formVisible} animationType="slide" transparent onRequestClose={() => setFormVisible(false)}>
        <View style={styles.modalOverlay}>
          <ScrollView contentContainerStyle={styles.modalContent}>
            <Text style={styles.modalTitle}>{editingIndex !== null ? 'Editar Esporte' : 'Novo Esporte'}</Text>
            <TextInput
              style={styles.input}
              placeholder="Nome do esporte"
              value={form.name}
              onChangeText={text => setForm(prev => ({ ...prev, name: text }))}
            />
            {errors.name && <Text style={styles.error}>{errors.name}</Text>}

            <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
              {form.url ? (
                <Image source={{ uri: form.url }} style={styles.imagePreview} />
              ) : (
                <Text style={{ color: '#555' }}>Escolher imagem</Text>
              )}
            </TouchableOpacity>
            {errors.url && <Text style={styles.error}>{errors.url}</Text>}

            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.confirmBtn} onPress={handleSubmit}>
                <Text style={styles.btnText}>{editingIndex !== null ? 'ATUALIZAR' : 'CADASTRAR'}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setFormVisible(false)}>
                <Text style={styles.btnText}>CANCELAR</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    elevation: 1,
  },
  cardContent: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  cardImage: { width: 50, height: 50, borderRadius: 8, marginRight: 12 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#222' },
  deleteBtn: {
    backgroundColor: 'red',
    padding: 6,
    borderRadius: 6,
    marginLeft: 8,
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
  },
  fabText: { color: '#fff', fontSize: 30, fontWeight: 'bold' },
  emptyList: { flexGrow: 1, justifyContent: 'center', alignItems: 'center' },
  emptyMessage: { textAlign: 'center', fontSize: 16, color: '#555' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center' },
  modalContent: {
    backgroundColor: '#fff',
    marginHorizontal: 24,
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
  },
  imagePicker: {
    borderWidth: 1,
    borderColor: '#ccc',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    marginBottom: 12,
  },
  imagePreview: { width: '100%', height: '100%', borderRadius: 6 },
  error: { color: 'red', marginBottom: 8 },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between' },
  confirmBtn: {
    flex: 1,
    backgroundColor: '#06C823',
    paddingVertical: 12,
    marginRight: 6,
    borderRadius: 6,
    alignItems: 'center',
  },
  cancelBtn: {
    flex: 1,
    backgroundColor: '#999',
    paddingVertical: 12,
    marginLeft: 6,
    borderRadius: 6,
    alignItems: 'center',
  },
  btnText: { color: '#fff', fontWeight: 'bold' },
});
