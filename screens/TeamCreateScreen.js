import React, { useState } from 'react';
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
} from 'react-native';
import Animated, { FadeInDown, FadeOutUp } from 'react-native-reanimated';

const placeholderImage = 'https://via.placeholder.com/150';

export default function ProductScreen() {
  const [products, setProducts] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [form, setForm] = useState({
    name: '',
    description: '',
    value: '',
    team: '',
    category: '',
    sport: '',
    active: false,
  });
  const [errors, setErrors] = useState({});
  const [editingIndex, setEditingIndex] = useState(null);

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Nome obrigatório';
    if (!form.value.trim() || isNaN(form.value)) newErrors.value = 'Valor inválido';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddOrUpdate = () => {
    if (!validate()) return;
    const updated = [...products];
    if (editingIndex !== null) {
      updated[editingIndex] = form;
    } else {
      updated.push(form);
    }
    setProducts(updated);
    setFormVisible(false);
    resetForm();
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setForm(products[index]);
    setFormVisible(true);
  };

  const handleDelete = (index) => {
    // Remove o produto direto, sem confirmação
    setProducts((prev) => {
      const updated = [...prev];
      updated.splice(index, 1);
      return updated;
    });
  };

  const resetForm = () => {
    setForm({
      name: '',
      description: '',
      value: '',
      team: '',
      category: '',
      sport: '',
      active: false,
    });
    setEditingIndex(null);
    setErrors({});
  };

  const renderProductCard = ({ item, index }) => (
    <Animated.View
      entering={FadeInDown.duration(300)}
      exiting={FadeOutUp.duration(300)}
      style={[styles.card, { backgroundColor: item.active ? '#e6ffe6' : '#f9f9f9' }]}
    >
      <TouchableOpacity onPress={() => handleEdit(index)} style={{ flexDirection: 'row', flex: 1 }}>
        <Image source={{ uri: placeholderImage }} style={styles.productImage} />
        <View style={styles.productInfo}>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <Text style={styles.description} numberOfLines={2}>{item.description || 'Sem descrição'}</Text>
          <Text style={styles.price}>R$ {Number(item.value).toFixed(2)}</Text>

          <View style={styles.tagsRow}>
            {item.team ? <Text style={styles.tag}>{item.team}</Text> : null}
            {item.category ? <Text style={styles.tag}>{item.category}</Text> : null}
            {item.sport ? <Text style={styles.tag}>{item.sport}</Text> : null}
          </View>

          <Text style={{ marginTop: 4, color: item.active ? '#06C823' : '#999' }}>
            {item.active ? 'Ativo' : 'Inativo'}
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleDelete(index)} style={styles.deleteBtn}>
        <Text style={styles.deleteBtnText}>EXCLUIR</Text>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={() => setFormVisible(true)}>
        <Text style={styles.addButtonText}>+ ADICIONAR UM ITEM</Text>
      </TouchableOpacity>

      <FlatList
        data={products}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderProductCard}
        contentContainerStyle={{ paddingBottom: 120 }}
      />

      <Modal
        visible={formVisible}
        animationType="slide"
        transparent
        onRequestClose={() => { setFormVisible(false); resetForm(); }}
      >
        <View style={styles.modalOverlay}>
          <ScrollView contentContainerStyle={styles.modalContent}>
            <Text style={styles.modalTitle}>{editingIndex !== null ? 'Editar Produto' : 'Novo Produto'}</Text>

            <TextInput
              style={styles.input}
              placeholder="Nome do produto"
              value={form.name}
              onChangeText={(text) => setForm({ ...form, name: text })}
            />
            {errors.name && <Text style={styles.error}>{errors.name}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Descrição"
              value={form.description}
              onChangeText={(text) => setForm({ ...form, description: text })}
              multiline
              numberOfLines={3}
            />

            <TextInput
              style={styles.input}
              placeholder="Valor unitário"
              keyboardType="numeric"
              value={form.value}
              onChangeText={(text) => setForm({ ...form, value: text })}
            />
            {errors.value && <Text style={styles.error}>{errors.value}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Time"
              value={form.team}
              onChangeText={(text) => setForm({ ...form, team: text })}
            />

            <TextInput
              style={styles.input}
              placeholder="Categoria"
              value={form.category}
              onChangeText={(text) => setForm({ ...form, category: text })}
            />

            <TextInput
              style={styles.input}
              placeholder="Esporte"
              value={form.sport}
              onChangeText={(text) => setForm({ ...form, sport: text })}
            />

            <View style={styles.switchRow}>
              <Text style={styles.switchLabel}>Ativo</Text>
              <Switch
                value={form.active}
                onValueChange={(value) => setForm({ ...form, active: value })}
                thumbColor="#06C823"
              />
            </View>

            <View style={styles.buttonRow}>
              <TouchableOpacity onPress={handleAddOrUpdate} style={styles.confirmButton}>
                <Text style={styles.confirmButtonText}>{editingIndex !== null ? 'ATUALIZAR' : 'CADASTRAR'}</Text>
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
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

const { width } = Dimensions.get('window');
const cardWidth = width - 32;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },

  addButton: {
    backgroundColor: '#06C823',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 12,
    elevation: 4,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  card: {
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    width: cardWidth,
    backgroundColor: '#f9f9f9',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
    elevation: 6,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: '#cfcfcf',
  },
  productInfo: {
    marginBottom: 12,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 4,
    color: '#333',
  },
  description: {
    color: '#555',
    fontSize: 14,
    marginBottom: 4,
  },
  price: {
    fontWeight: 'bold',
    color: '#06C823',
    fontSize: 16,
    marginBottom: 6,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 6,
  },
  tag: {
    backgroundColor: '#06C823',
    color: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    marginRight: 8,
    marginTop: 4,
    fontSize: 12,
  },

  deleteBtn: {
    backgroundColor: '#D11A2A',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 6,
  },
  deleteBtnText: {
    color: 'white',
    fontWeight: 'bold',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    paddingBottom: 40,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 10,
    fontSize: 16,
  },
  error: {
    color: 'red',
    marginBottom: 6,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    justifyContent: 'space-between',
  },
  switchLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#444',
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  confirmButton: {
    backgroundColor: '#06C823',
    flex: 1,
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    marginRight: 8,
  },
  confirmButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: '#aaa',
    flex: 1,
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    marginLeft: 8,
  },
  cancelButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
