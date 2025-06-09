import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Switch, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

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
    const updated = [...products];
    updated.splice(index, 1);
    setProducts(updated);
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

  return (
    <View style={styles.container}>
      {!formVisible && (
        <TouchableOpacity style={styles.addCard} onPress={() => setFormVisible(true)}>
          <Text style={styles.addText}>ADICIONAR UM ITEM</Text>
        </TouchableOpacity>
      )}

      {formVisible && (
        <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.card}>
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
            <TouchableOpacity onPress={handleAddOrUpdate}>
              <Text style={styles.confirmButton}>CADASTRAR</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setFormVisible(false); resetForm(); }}>
              <Text style={styles.cancelButton}>CANCELAR</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}

      <FlatList
        data={products}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.card}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text>Descrição: {item.description}</Text>
            <Text>Valor: R$ {item.value}</Text>
            <Text>Time: {item.team}</Text>
            <Text>Categoria: {item.category}</Text>
            <Text>Esporte: {item.sport}</Text>
            <Text>Ativo: {item.active ? 'Sim' : 'Não'}</Text>

            <View style={styles.cardActions}>
              <TouchableOpacity onPress={() => handleEdit(index)}>
                <FontAwesome name="pencil" size={20} color="black" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(index)} style={styles.deleteButtonContainer}>
                <Text style={styles.deleteButton}>EXCLUIR</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  addCard: {
    backgroundColor: '#06C823',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  addText: { color: '#fff', fontWeight: 'bold' },
  card: {
    backgroundColor: '#e6ffe6',
    padding: 16,
    marginVertical: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 8,
  },
  cardTitle: { fontWeight: 'bold', fontSize: 16, marginBottom: 4 },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 8,
    paddingVertical: 4,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  switchLabel: { marginRight: 10 },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  confirmButton: {
    backgroundColor: '#06C823',
    padding: 10,
    borderRadius: 8,
    color: '#fff',
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 8,
    color: '#fff',
    fontWeight: 'bold',
  },
  deleteButtonContainer: {
    backgroundColor: 'red',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    marginLeft: 10,
  },
  deleteButton: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 12,
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginBottom: 4,
  },
});
