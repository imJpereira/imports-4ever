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
import { colors, metrics, typography } from '../theme'

export default function OrderScreen() {
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [productModalVisible, setProductModalVisible] = useState(false)
  const [orderModalVisible, setOrderModalVisible] = useState(false)
  const [products, setProducts] = useState([])

  const pedidos = [
    { id: '1', nome: 'Pedido 1', data: '13/06/2025', produtos: ['Camisa do Flamengo', 'Tênis Nike'] },
    { id: '2', nome: 'Pedido 2', data: '15/06/2025', produtos: ['Camisa do Corinthians'] },
    { id: '3', nome: 'Pedido 3', data: '20/06/2025', produtos: [] },
  ]
  const mockProdutos = [
    'Camisa do Palmeiras',
    'Camisa do Grêmio',
    'Tênis Adidas',
    'Boné Nike',
    'Jaqueta Puma',
  ]

  const openOrderModal = order => {
    setSelectedOrder(order)
    setProducts(order.produtos || [])
    setOrderModalVisible(true)
  }

  const addProduct = produto => {
    setProducts(prev => [...prev, produto])
    setProductModalVisible(false)
  }

  const removeProduct = index => {
    setProducts(prev => {
      const updated = [...prev]
      updated.splice(index, 1)
      return updated
    })
  }

  const renderOrderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => openOrderModal(item)}>
      <Text style={styles.cardTitle}>{item.nome}</Text>
      <Text style={styles.cardDate}>Chegada: {item.data}</Text>
      <Text style={styles.cardSubtitle}>
        {item.produtos && item.produtos.length > 0
          ? `${item.produtos.length} produto(s)`
          : 'Nenhum produto'}
      </Text>
    </TouchableOpacity>
  )

  const renderProductRow = ({ item, index }) => (
    <View style={styles.productRow}>
      <Text style={styles.productText}>{item}</Text>
      <TouchableOpacity onPress={() => removeProduct(index)}>
        <Ionicons name="trash" size={20} color={colors.danger} />
      </TouchableOpacity>
    </View>
  )

  const renderMockProduct = ({ item }) => (
    <TouchableOpacity style={styles.productItem} onPress={() => addProduct(item)}>
      <Text style={styles.productItemText}>{item}</Text>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <FlatList
        data={pedidos}
        keyExtractor={item => item.id}
        renderItem={renderOrderItem}
        contentContainerStyle={styles.list}
      />

      
      <Modal visible={orderModalVisible} animationType="slide" transparent={false}>
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

          <TouchableOpacity style={styles.addBtn} onPress={() => setProductModalVisible(true)}>
            <Text style={styles.addBtnText}>+ Adicionar Produto</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setOrderModalVisible(false)}
            style={styles.closeBtn}
          >
            <Text style={styles.closeText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      
      <Modal visible={productModalVisible} animationType="slide" transparent={false}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Escolha um produto</Text>
          <FlatList
            data={mockProdutos}
            keyExtractor={item => item}
            renderItem={renderMockProduct}
            ListEmptyComponent={
              <Text style={styles.emptyText}>Nenhum produto disponível.</Text>
            }
          />
          <TouchableOpacity
            onPress={() => setProductModalVisible(false)}
            style={styles.closeBtn}
          >
            <Text style={styles.closeText}>Cancelar</Text>
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
  },
  list: {
    padding: metrics.spacing,
  },
  card: {
  backgroundColor: '#e6f9ed',
  padding: 20,
  borderRadius: 16,
  marginBottom: 16,
  borderWidth: 2.5, 
  borderColor: '#06C823',
  shadowColor: '#06C823', 
  shadowOpacity: 0.2,
  shadowRadius: 6,
  elevation: 6,
},

  cardTitle: {
    fontSize: typography.fontSizeTitle,
    fontWeight: typography.fontWeightBold,
    color: '#000' ,
    marginBottom: metrics.spacing * 0.25,
    textAlign: 'center',
  },
  cardDate: {
    fontSize: typography.fontSizeNormal * 0.875,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  cardSubtitle: {
    fontSize: typography.fontSizeNormal * 0.875,
    color: colors.textPrimary,
    marginTop: metrics.spacing * 0.25,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    padding: metrics.spacing,
    backgroundColor: colors.background,
  },
  modalTitle: {
    fontSize: typography.fontSizeTitle + 2,
    fontWeight: typography.fontWeightBold,
    color: colors.primary,
    marginBottom: metrics.spacing * 0.5,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: typography.fontSizeNormal,
    color: colors.textPrimary,
    marginBottom: metrics.spacing,
    textAlign: 'center',
  },
  productRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: metrics.spacing * 0.5,
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
  },
  productText: {
    fontSize: typography.fontSizeNormal,
    color: colors.textPrimary,
  },
  addBtn: {
    backgroundColor: colors.primary,
    padding: metrics.spacing * 0.75,
    borderRadius: metrics.borderRadius,
    alignItems: 'center',
    marginTop: metrics.spacing,
  },
  addBtnText: {
    color: colors.textOnPrimary,
    fontWeight: typography.fontWeightBold,
  },
  closeBtn: {
    marginTop: metrics.spacing,
    alignItems: 'center',
  },
  closeText: {
    color: colors.textPrimary,
    fontSize: typography.fontSizeNormal,
  },
  emptyText: {
    textAlign: 'center',
    color: colors.textPrimary,
    marginVertical: metrics.spacing,
  },
  productItem: {
    padding: metrics.spacing,
    backgroundColor: colors.cardBackground,
    borderRadius: metrics.borderRadius,
    marginBottom: metrics.spacing * 0.5,
    borderWidth: 1,
    borderColor: colors.border,
  },
  productItemText: {
    fontSize: typography.fontSizeNormal,
    color: colors.textPrimary,
  },
})
