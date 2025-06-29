import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { colors, metrics, typography } from '../../../assets/js/theme'
import { getOrders, getOrderById, deleteOrder } from '../../services/OrderService' 

export default function OrderScreen() {
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [orderModalVisible, setOrderModalVisible] = useState(false)
  const [products, setProducts] = useState([])
  const [pedidos, setPedidos] = useState([])

  useEffect(() => {
    fetchOrders()
  }, [])

  async function fetchOrders() {
    try {
      const orders = await getOrders()
      setPedidos(orders)
    } catch (error) {
      Alert.alert('Erro', 'Falha ao carregar pedidos')
    }
  }

  async function openOrderModal(order) {
    setSelectedOrder(order)
    try {
      const fullOrder = await getOrderById(order.id)
      setProducts(fullOrder.produtos || []) 
      setOrderModalVisible(true)
    } catch (error) {
      Alert.alert('Erro', 'Falha ao carregar detalhes do pedido')
    }
  }

  async function removeOrder() {
    try {
     
      await deleteOrder(selectedOrder.id)
      setPedidos(prev => prev.filter(p => p.id !== selectedOrder.id))
      setOrderModalVisible(false)
    } catch (error) {
      Alert.alert('Erro', 'Falha ao excluir pedido')
    }
  }

  const renderOrderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => openOrderModal(item)}>
      <View style={styles.cardHeader}>
        <Ionicons name="cart" size={24} color={colors.primary} style={{ marginRight: 8 }} />
        <Text style={styles.cardTitle}>{item.nome}</Text>
      </View>
      <Text style={styles.cardDate}>Chegada: {item.data}</Text>
      <Text style={styles.cardSubtitle}>
        {item.produtos?.length > 0 ? `${item.produtos.length} produto(s)` : 'Nenhum produto'}
      </Text>
    </TouchableOpacity>
  )

  const renderProductRow = ({ item }) => (
    <View style={styles.productRow}>
      <Text style={styles.productText}>{item}</Text>
      <View style={styles.productDivider} />
    </View>
  )

  return (
    <View style={styles.container}>
      <FlatList
        data={pedidos}
        keyExtractor={item => item.id}
        renderItem={renderOrderItem}
        contentContainerStyle={pedidos.length === 0 ? styles.emptyList : styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum pedido encontrado</Text>
        }
      />

      <Modal visible={orderModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{selectedOrder?.nome}</Text>
          <Text style={styles.modalSubtitle}>Data de chegada: {selectedOrder?.data}</Text>

          <FlatList
            data={products}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderProductRow}
          />

          <TouchableOpacity onPress={() => setOrderModalVisible(false)} style={styles.closeBtn}>
            <Text style={styles.closeText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: metrics.base,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd', 
    alignItems: 'center',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: typography.xxlarge,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
  },
  cardDate: {
    fontSize: typography.large,
    color: colors.textLight,
    textAlign: 'center',
  },
  cardSubtitle: {
    marginTop: 6,
    fontSize: typography.large,
    color: colors.textDark,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    padding: 24,
    backgroundColor: colors.background,
  },
  modalTitle: {
    fontSize: typography.xxlarge,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 10,
  },
  modalSubtitle: {
    fontSize: typography.large,
    color: colors.textDark,
    textAlign: 'center',
    marginBottom: 20,
  },
  productRow: {
    paddingVertical: 10,
    paddingHorizontal: 8,
    backgroundColor: colors.white,
  },
  productText: {
    fontSize: typography.large,
    color: colors.textDark,
    textAlign: 'center',
  },
  productDivider: {
    height: 1,
    backgroundColor: '#CCCCCC',
    opacity: 0.8,
    marginTop: 5,
  },
  deleteOrderBtn: {
    marginTop: 30,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: colors.danger,
  },
  deleteOrderText: {
    color: colors.danger,
    fontSize: typography.large,
    fontWeight: 'bold',
  },
  closeBtn: {
    marginTop: 16,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  closeText: {
    fontSize: typography.large,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  emptyList: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: typography.large,
    color: '#555',
    textAlign: 'center',
    marginTop: 20,
  },
})
