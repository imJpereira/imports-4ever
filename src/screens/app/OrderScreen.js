import React, { useState } from 'react'
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { colors, metrics, typography } from '../../../assets/js/theme'

export default function OrderScreen() {
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [orderModalVisible, setOrderModalVisible] = useState(false)
  const [products, setProducts] = useState([])
  const [pedidos, setPedidos] = useState([
    { id: '1', nome: 'Pedido 1', data: '13/06/2025', produtos: ['Tênis Nike', 'Camisa Nike'] },
    { id: '2', nome: 'Pedido 2', data: '15/06/2025', produtos: ['Camisa do Corinthians'] },
    { id: '3', nome: 'Pedido 3', data: '20/06/2025', produtos: [] },
  ])

  const openOrderModal = order => {
    setSelectedOrder(order)
    setProducts(order.produtos || [])
    setOrderModalVisible(true)
  }

  const removeOrder = () => {
    setPedidos(prev => prev.filter(p => p.id !== selectedOrder.id))
    setOrderModalVisible(false)
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
        contentContainerStyle={styles.list}
      />

      <Modal visible={orderModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{selectedOrder?.nome}</Text>
          <Text style={styles.modalSubtitle}>Data de chegada: {selectedOrder?.data}</Text>

          <FlatList
            data={products}
            keyExtractor={(item, idx) => idx.toString()}
            renderItem={renderProductRow}
            ListEmptyComponent={
              <Text style={styles.emptyText}>Nenhum produto adicionado.</Text>
            }
          />

          <TouchableOpacity
            onPress={removeOrder}
            style={styles.deleteOrderBtn}
          >
            <Text style={styles.deleteOrderText}>Excluir Pedido</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setOrderModalVisible(false)}
            style={styles.closeBtn}
          >
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
    borderColor: '#ddd', // contorno leve
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
  emptyText: {
    textAlign: 'center',
    fontSize: typography.large,
    color: colors.textLight,
    marginTop: 40,
  },
})
