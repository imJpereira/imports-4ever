import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import OrderStatusCard from '../components/OderStatusCard';

export default function OrderScreen({ navigation }) {
  const pedidos = [
    { id: '1', nome: 'Pedido 1' },
    { id: '2', nome: 'Pedido 2' },
    { id: '3', nome: 'Pedido 3' },
    { id: '4', nome: 'Pedido 4' },
    { id: '5', nome: 'Pedido 5' },
  ];


  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#fff' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <FlatList
        data={pedidos}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => {
          return <OrderStatusCard order={{...item}} />;
        }}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#06C823',
  },
  list: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
