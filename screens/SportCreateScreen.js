import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
import Animated, { FadeInDown, FadeOutUp } from 'react-native-reanimated';

export default function CategoriesScreen({ navigation }) {
  const [formVisible, setFormVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ nome: '' });
  const [editingIndex, setEditingIndex] = useState(null);

  const handleChange = (value) => setForm({ nome: value });

  const handleSubmit = () => {
    if (!form.nome.trim()) {
      Alert.alert('Erro', 'O nome do time não pode estar vazio.');
      return;
    }

    if (editingIndex !== null) {
      const updated = [...categories];
      updated[editingIndex] = form;
      setCategories(updated);
    } else {
      setCategories([...categories, form]);
    }

    setForm({ nome: '' });
    setEditingIndex(null);
    setFormVisible(false);
  };

  const handleEdit = (index) => {
    setForm(categories[index]);
    setEditingIndex(index);
    setFormVisible(true);
  };

  const handleDelete = (index) => {
    const updated = categories.filter((_, i) => i !== index);
    setCategories(updated);
  };

  return (
    <View style={styles.container}>
      {!formVisible && (
        <TouchableOpacity onPress={() => setFormVisible(true)} style={styles.addCard}>
          <Text style={styles.addText}>CADASTRE SEU ESPORTE AQUI</Text>
        </TouchableOpacity>
      )}

      {formVisible && (
        <Animated.View
          entering={FadeInDown.duration(300)}
          exiting={FadeOutUp.duration(300)}
          style={styles.formContainer}
        >
          <TextInput
            placeholder="Nome do esporte"
            value={form.nome}
            onChangeText={handleChange}
            style={styles.input}
          />

          <View style={styles.formButtons}>
            <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
              <Text style={styles.submitText}>CADASTRAR</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelBtn} onPress={() => {
              setForm({ nome: '' });
              setFormVisible(false);
              setEditingIndex(null);
            }}>
              <Text style={styles.cancelText}>CANCELAR</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}

      <FlatList
        data={categories}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <Animated.View entering={FadeInDown} style={styles.card}>
            <TouchableOpacity onPress={() => handleEdit(index)} style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.nome}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteBtn} onPress={() => handleDelete(index)}>
              <Text style={styles.cancelText}>EXCLUIR</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      />

      {!formVisible && (
        <TouchableOpacity onPress={() => setFormVisible(true)} style={styles.fab}>
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  addCard: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#06C823',
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
    borderRadius: 12,
  },
  addText: { color: '#06C823', fontWeight: 'bold' },
  formContainer: { marginBottom: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  formButtons: { flexDirection: 'row', justifyContent: 'space-between' },
  submitBtn: {
    backgroundColor: '#06C823',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
    alignItems: 'center',
  },
  submitText: { color: '#fff', fontWeight: 'bold' },
  cancelBtn: {
    backgroundColor: '#D11A2A',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginLeft: 8,
    alignItems: 'center',
  },
  cancelText: { color: 'white', fontWeight: 'bold' },
  card: {
    backgroundColor: '#f2f2f2',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardContent: {
    paddingVertical: 10,
  },
  cardTitle: { fontSize: 16, fontWeight: 'bold' },
  deleteBtn: {
    marginTop: 12,
    backgroundColor: '#D11A2A',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#06C823',
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  fabText: { color: 'white', fontSize: 24, fontWeight: 'bold' },
});
