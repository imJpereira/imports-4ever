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
    const response = await gatewayApi.post('/orders/create', { orderItems : order});
    return { order: response.data, error: null };
  } catch (error) {
    return { order: null, error: extractError(error) };
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
