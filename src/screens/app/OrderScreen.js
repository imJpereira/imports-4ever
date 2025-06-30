import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getOrders, deleteOrder } from '../../services/OrderService';

export default function OrderScreen({ navigation }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    setLoading(true);
    const { orders: fetchedOrders, error } = await getOrders();
    if (!error) setOrders(fetchedOrders || []);
    else Alert.alert('Erro', 'Falha ao carregar pedidos');
    setLoading(false);
  }

  function openModal(order) {
    setSelectedOrder(order);
    setModalVisible(true);
  }

  function closeModal() {
    setModalVisible(false);
    setSelectedOrder(null);
  }

  async function handleDeleteOrder(orderId) {
    Alert.alert('Confirmação', 'Deseja realmente excluir este pedido?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteOrder(orderId);
            setOrders((prev) => prev.filter((o) => o.id !== orderId));
            closeModal();
          } catch {
            Alert.alert('Erro', 'Falha ao excluir pedido');
          }
        },
      },
    ]);
  }

  function renderOrderItem({ item }) {
    const totalBRL = Number(item.total || 0).toFixed(2);

    return (
      <View style={styles.card}>
        <TouchableOpacity style={{ flex: 1 }} onPress={() => openModal(item)}>
          <Text style={styles.orderId}>Pedido #{item.id.substring(0, 8)}</Text>
          <Text style={styles.orderDate}>
            {new Date(item.orderDate).toLocaleDateString()}
          </Text>
          <Text style={styles.orderTotal}>Total: R$ {totalBRL} (em BRL)</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleDeleteOrder(item.id)}
          style={styles.deleteIconButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="trash-outline" size={24} color="#cc0000" />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <Text style={styles.loadingText}>Carregando pedidos...</Text>
      ) : orders.length === 0 ? (
        <Text style={styles.emptyText}>Nenhum pedido encontrado.</Text>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          renderItem={renderOrderItem}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      )}

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView>
              <Text style={styles.modalTitle}>Detalhes do Pedido</Text>

              {selectedOrder?.order_items?.map((item) => (
                <View key={item.id} style={styles.modalItem}>
                  <Text style={styles.modalItemName}>{item.productName}</Text>
                  <Text style={styles.modalItemText}>
                    Quantidade: {item.quantity} | Tamanho: {item.size || '—'}
                  </Text>
                  <Text style={styles.modalItemText}>
                    Preço unitário: {(item.unitPrice ?? 0).toFixed(2)} {item.currency || 'BRL'}
                  </Text>
                  <Text style={styles.modalItemText}>
                    Total: {(item.totalPrice ?? 0).toFixed(2)} {item.currency || 'BRL'}
                  </Text>
                </View>
              ))}

              <Text style={styles.modalTotal}>
                Total do pedido: R$ {(selectedOrder?.total ?? 0).toFixed(2)} (em BRL)
              </Text>

              <View style={styles.modalButtonsRow}>
                <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                  <Text style={styles.closeButtonText}>FECHAR</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleDeleteOrder(selectedOrder.id)}
                  style={styles.deleteButton}
                >
                  <Text style={styles.deleteButtonText}>EXCLUIR PEDIDO</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f4f8', padding: 16 },
  loadingText: { textAlign: 'center', marginTop: 40, fontSize: 16, color: '#555' },
  emptyText: { textAlign: 'center', marginTop: 40, fontSize: 18, color: '#999' },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 14,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
  },
  orderId: { fontWeight: 'bold', fontSize: 16 },
  orderDate: { fontSize: 14, color: '#666', marginTop: 4 },
  orderTotal: { fontWeight: 'bold', marginTop: 6, fontSize: 14, color: '#333' },
  deleteIconButton: { marginLeft: 10, padding: 4, zIndex: 10 },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 16,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    maxHeight: '80%',
    padding: 20,
  },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 12, textAlign: 'center' },
  modalItem: {
    marginBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
  },
  modalItemName: { fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
  modalItemText: { fontSize: 14, textAlign: 'center', color: '#555', marginTop: 2 },
  modalTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  modalButtonsRow: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  closeButton: {
    flex: 1,
    backgroundColor: '#999',
    paddingVertical: 14,
    borderRadius: 6,
    marginRight: 10,
    alignItems: 'center',
  },
  closeButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  deleteButton: {
    flex: 1,
    backgroundColor: '#cc0000',
    paddingVertical: 14,
    borderRadius: 6,
    marginLeft: 10,
    alignItems: 'center',
  },
  deleteButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
