import { gatewayApi } from './api';

export async function getOrders() {
  try {
    const response = await gatewayApi.get('/orders');
    return { orders: response.data, error: null };
  } catch (error) {
    return { orders: null, error: extractError(error) };
  }
}

export async function getOrderById(id) {
  try {
    const response = await gatewayApi.get(`/orders/${id}`);
    return { order: response.data, error: null };
  } catch (error) {
    return { order: null, error: extractError(error) };
  }
}

export async function createOrder(order) {
  try {
    console.log(order)
    const response = await gatewayApi.post('/orders/create', {
      orderItems: order
    });
    return { order: response.data, error: null };
  } catch (error) {
    return { order: null, error: extractError(error) };
  }
}

export async function deleteOrder(orderId) {
  try {
    await gatewayApi.delete(`/orders/delete/${orderId}`);
    return { error: null };
  } catch (error) {
    return { error: error?.response?.data?.message || 'Erro ao excluir pedido' };
  }
}

function extractError(error) {
  return (
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.response?.data ||
    error.message ||
    'Erro inesperado'
  );
}
