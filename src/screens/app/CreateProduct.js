import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Switch,
  Image,
  Modal,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Animated, { FadeInDown, FadeOutUp } from 'react-native-reanimated';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import SearchBar from '../../components/SearchBar';
import { uploadImage } from '../../services/imageService';
import { getTeams } from '../../services/TeamService';
import { getCategories } from '../../services/CategoryService';
import { getSports } from '../../services/SportService';
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProductsByName,
} from '../../services/ProductService';

const placeholderImage = 'https://via.placeholder.com/150';
const { width } = Dimensions.get('window');

export default function ProductScreen() {
  const [products, setProducts] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [form, setForm] = useState({
    name: '',
    description: '',
    value: '',
    team: null,
    category: null,
    sport: null,
    active: false,
    highlight: false,
    imageUrl: null,
  });
  const [errors, setErrors] = useState({});
  const [editingIndex, setEditingIndex] = useState(null);
  const [searchText, setSearchText] = useState('');

  const [teams, setTeams] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sports, setSports] = useState([]);

  useEffect(() => {
    fetchDropdowns();
    fetchProductsList();
  }, []);

  async function fetchDropdowns() {
    const { teams: fetchedTeams } = await getTeams();
    const { categories: fetchedCategories } = await getCategories();
    const { sports: fetchedSports } = await getSports();
    setTeams(fetchedTeams || []);
    setCategories(fetchedCategories || []);
    setSports(fetchedSports || []);
  }

  async function fetchProductsList() {
    const { products: fetchedProducts } = await getProducts();
    setProducts(fetchedProducts || []);
  }

  async function handleSearch() {
    if (!searchText.trim()) return fetchProductsList();
    const { products: results } = await searchProductsByName(searchText.toLocaleLowerCase());
    setProducts(results || []);
  }

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Nome obrigatório';
    if (!form.value.trim() || isNaN(form.value)) newErrors.value = 'Valor inválido';
    if (!form.team) newErrors.team = 'Time obrigatório';
    if (!form.category) newErrors.category = 'Categoria obrigatória';
    if (!form.sport) newErrors.sport = 'Esporte obrigatório';
    if (!form.imageUrl) newErrors.imageUrl = 'Imagem obrigatória, selecione uma foto';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  async function handleAddOrUpdate() {
    const defaultImages = [
      'https://via.placeholder.com/150/92c952',
      'https://via.placeholder.com/150/771796',
      'https://via.placeholder.com/150/24f355',
      'https://via.placeholder.com/150/d32776',
    ];

    const imageUrlToUse = form.imageUrl || defaultImages[Math.floor(Math.random() * defaultImages.length)];
    const tempForm = { ...form, imageUrl: imageUrlToUse };
    setForm(tempForm);

    const newErrors = {};
    if (!tempForm.name.trim()) newErrors.name = 'Nome obrigatório';
    if (!tempForm.value.trim() || isNaN(tempForm.value)) newErrors.value = 'Valor inválido';
    if (!tempForm.team) newErrors.team = 'Time obrigatório';
    if (!tempForm.category) newErrors.category = 'Categoria obrigatória';
    if (!tempForm.sport) newErrors.sport = 'Esporte obrigatório';
    if (!tempForm.imageUrl) newErrors.imageUrl = 'Imagem obrigatória, selecione uma foto';
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

      const payload = {
    name: form.name,
    description: form.description,
    value: Number(form.value),
    url: form.imageUrl,
    team: form.team,
    category: form.category,
    sport: form.sport,
    status: form.active ? 'ATIVO' : 'INATIVO',
    highlight: form.highlight,
    discountValue: 0,
  };


    try {
      if (editingIndex !== null) {
        const { product } = await updateProduct(products[editingIndex].id, payload);
        const updated = [...products];
        updated[editingIndex] = product;
        setProducts(updated);
      } else {
        const { product } = await createProduct(payload);
        setProducts(prev => [...prev, product]);
      }
      resetForm();
      setFormVisible(false);
    } catch {
      Alert.alert('Erro', 'Falha ao salvar o produto');
    }
  }

  function handleEdit(index) {
  const p = products[index];
  setForm({
    name: p.name,
    description: p.description,
    value: p.value.toString(),
    team: p.team?.id || null,
    category: p.category?.id || null,
    sport: p.sport?.id || null,
    active: p.status === 'ATIVO',
    highlight: p.highlight,
    imageUrl: p.url,
  });
  setEditingIndex(index);
  setFormVisible(true);
}


  const resetForm = () => {
  setForm({
    name: '',
    description: '',
    value: '',
    team: null,
    category: null,
    sport: null,
    active: false,
    highlight: false,
    imageUrl: null,
  });
  setErrors({});
  setEditingIndex(null);
};


  async function pickImage() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permissão necessária', 'Precisamos da permissão para acessar suas fotos.');
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
        setForm(prev => ({ ...prev, imageUrl: url }));
      } catch {
        Alert.alert('Erro', 'Falha no upload da imagem.');
      }
    }
  }

  async function handleDelete(index) {
    Alert.alert(
      'Confirmação',
      `Deseja realmente excluir o produto "${products[index].name}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteProduct(products[index].id);
              setProducts(prev => prev.filter((_, i) => i !== index));
              if (editingIndex === index) {
                resetForm();
                setFormVisible(false);
              }
            } catch {
              Alert.alert('Erro', 'Falha ao excluir produto');
            }
          },
        },
      ]
    );
  }

  async function handleDeleteFromModal() {
    if (editingIndex === null) return;
    handleDelete(editingIndex);
  }

  return (
    <View style={styles.container}>
      <SearchBar
        value={searchText}
        onChangeText={setSearchText}
        onSearch={handleSearch}
        placeholder="Buscar produtos"
      />

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <Animated.View
            entering={FadeInDown.duration(300)}
            exiting={FadeOutUp.duration(300)}
            style={[
              styles.card,
              {
                borderColor: item.status === 'ATIVO' ? '#06C823' : '#aaa',
                borderWidth: 2,
              },
            ]}
          >
            <TouchableOpacity
              onPress={() => handleEdit(index)}
              style={{ flexDirection: 'row', flex: 1 }}
            >
              <Image source={{ uri: item.url || placeholderImage }} style={styles.cardImage} />
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.name}</Text>
                <Text style={styles.cardDescription}>{item.description || 'Sem descrição'}</Text>
                <Text style={styles.cardValue}>R$ {Number(item.value).toFixed(2)}</Text>
                <Text style={styles.cardStatus}>{item.status === 'ATIVO' ? 'Ativo' : 'Inativo'}</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleDelete(index)} style={styles.deleteIconButton}>
              <Ionicons name="trash-outline" size={24} color="#cc0000" />
            </TouchableOpacity>
          </Animated.View>
        )}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          resetForm();
          setFormVisible(true);
        }}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      <Modal
        visible={formVisible}
        animationType="slide"
        transparent
        onRequestClose={() => {
          setFormVisible(false);
          resetForm();
        }}
      >
        <View style={styles.modalOverlay}>
          <ScrollView contentContainerStyle={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {editingIndex !== null ? 'Editar Produto' : 'Novo Produto'}
            </Text>

            <Text style={styles.label}>Nome do produto</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite o nome"
              value={form.name}
              onChangeText={(text) => setForm({ ...form, name: text })}
            />
            {errors.name && <Text style={styles.error}>{errors.name}</Text>}

            <Text style={styles.label}>Descrição</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite a descrição"
              value={form.description}
              onChangeText={(text) => setForm({ ...form, description: text })}
              multiline
              numberOfLines={3}
            />

            <Text style={styles.label}>Valor unitário em BRL</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite o valor"
              keyboardType="numeric"
              value={form.value}
              onChangeText={(text) => setForm({ ...form, value: text })}
            />
            {errors.value && <Text style={styles.error}>{errors.value}</Text>}

            <Text style={styles.label}>Time</Text>
            <Picker
              selectedValue={form.team}
              onValueChange={(value) => setForm(prev => ({ ...prev, team: value }))}
              style={styles.picker}
            >
              <Picker.Item label="Selecione um time" value={null} />
              {teams.map(t => (
                <Picker.Item key={t.id} label={t.name} value={t.id} />
              ))}
            </Picker>
            {errors.team && <Text style={styles.error}>{errors.team}</Text>}

            <Text style={styles.label}>Categoria</Text>
            <Picker
              selectedValue={form.category}
              onValueChange={(value) => setForm(prev => ({ ...prev, category: value }))}
              style={styles.picker}
            >
              <Picker.Item label="Selecione uma categoria" value={null} />
              {categories.map(c => (
                <Picker.Item key={c.id} label={c.name} value={c.id} />
              ))}
            </Picker>
            {errors.category && <Text style={styles.error}>{errors.category}</Text>}

            <Text style={styles.label}>Esporte</Text>
            <Picker
              selectedValue={form.sport}
              onValueChange={(value) => setForm(prev => ({ ...prev, sport: value }))}
              style={styles.picker}
            >
              <Picker.Item label="Selecione um esporte" value={null} />
              {sports.map(s => (
                <Picker.Item key={s.id} label={s.name} value={s.id} />
              ))}
            </Picker>
            {errors.sport && <Text style={styles.error}>{errors.sport}</Text>}

            <View style={{ marginBottom: 16 }}>
              <Text style={styles.label}>Imagem do produto</Text>
              <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
                {form.imageUrl ? (
                  <Image source={{ uri: form.imageUrl }} style={styles.imagePreview} />
                ) : (
                  <Text style={{ color: '#555' }}>Clique para escolher uma imagem</Text>
                )}
              </TouchableOpacity>
              {errors.imageUrl && <Text style={styles.error}>{errors.imageUrl}</Text>}
            </View>

            <View style={styles.switchRow}>
              <Text style={styles.switchLabel}>Ativo</Text>
              <Switch
                value={form.active}
                onValueChange={(value) => setForm({ ...form, active: value })}
                thumbColor="#06C823"
              />
            </View>

            <View style={styles.switchRow}>
              <Text style={styles.switchLabel}>Destaque</Text>
              <Switch
                value={form.highlight}
                onValueChange={(value) => setForm({ ...form, highlight: value })}
                thumbColor="#f39c12"
              />
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <TouchableOpacity onPress={handleAddOrUpdate} style={styles.confirmButton}>
                <Text style={styles.confirmButtonText}>
                  {editingIndex !== null ? 'ATUALIZAR' : 'CADASTRAR'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setFormVisible(false);
                  resetForm();
                }}
                style={styles.cancelButton}
              >
                <Text style={styles.cancelButtonText}>CANCELAR</Text>
              </TouchableOpacity>
            </View>

            {editingIndex !== null && (
              <TouchableOpacity onPress={handleDeleteFromModal} style={styles.deleteButton}>
                <Text style={styles.deleteButtonText}>EXCLUIR PRODUTO</Text>
              </TouchableOpacity>
            )}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },

  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#f5f5f5',
  },

  cardImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 12,
  },

  cardContent: {
    flex: 1,
    justifyContent: 'center',
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  cardDescription: {
    fontSize: 14,
    color: '#666',
  },

  cardValue: {
    marginTop: 8,
    fontWeight: 'bold',
  },

  cardTag: {
    fontSize: 12,
    color: '#444',
  },

  cardStatus: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#666',
  },

  addButton: {
    position: 'absolute',
    right: 24,
    bottom: 24,
    backgroundColor: '#06C823',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },

  addButtonText: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
  },

  modalContent: {
    backgroundColor: '#fff',
    marginHorizontal: 24,
    borderRadius: 12,
    padding: 16,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },

  label: {
    fontWeight: 'bold',
    marginTop: 12,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginTop: 4,
  },

  picker: {
    marginTop: 4,
  },

  error: {
    color: 'red',
    marginTop: 4,
  },

  imagePicker: {
    height: 150,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },

  imagePreview: {
    width: '100%',
    height: 150,
    borderRadius: 6,
  },

  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
  },

  switchLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  confirmButton: {
    flex: 1,
    backgroundColor: '#06C823',
    paddingVertical: 12,
    borderRadius: 6,
    marginRight: 8,
    alignItems: 'center',
  },

  confirmButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  cancelButton: {
    flex: 1,
    backgroundColor: '#999',
    paddingVertical: 12,
    borderRadius: 6,
    marginLeft: 8,
    alignItems: 'center',
  },

  cancelButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  deleteIconButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    padding: 4,
    zIndex: 10,
  },

  deleteButton: {
    marginTop: 16,
    backgroundColor: '#cc0000',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
  },

  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
