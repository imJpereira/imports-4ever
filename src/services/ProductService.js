import { gatewayApi } from './api';

export async function getProducts() {
  try {
    const response = await gatewayApi.get('/products');
    return { products: response.data, error: null };
  } catch (error) {
    return { products: null, error: extractError(error) };
  }
}

export async function getProductById(id, currency = 'BRL') {
  try {
    const response = await gatewayApi.get(`/products/${id}/${currency}`);
    return { product: response.data, error: null };
  } catch (error) {
    return { product: null, error: extractError(error) };
  }
}

export async function searchProductsByName(name) {
  try {
    const response = await gatewayApi.get(`/products/like/${name}`);
    return { products: response.data, error: null };
  } catch (error) {
    return { products: null, error: extractError(error) };
  }
}

export async function createProduct(product) {
  try {
    const payload = {
      ...product,
      discountValue: 0,
      currency: 'BRL', 
    };

    const response = await gatewayApi.post('/products/create', payload);
    return { product: response.data, error: null };
  } catch (error) {
    console.log('Erro ao criar produto:', error.response?.data);
    return { product: null, error: extractError(error) };
  }
}

export async function updateProduct(id, product) {
  try {
    const payload = {
      ...product,
      discountValue: 0,
      currency: 'BRL', 
    };

    const response = await gatewayApi.put(`/products/update/${id}`, payload);
    return { product: response.data, error: null };
  } catch (error) {
    console.log('Erro ao atualizar produto:', error.response?.data);
    return { product: null, error: extractError(error) };
  }
}

export async function deleteProduct(id) {
  try {
    await gatewayApi.delete(`/products/delete/${id}`);
    return { error: null };
  } catch (error) {
    return { error: extractError(error) };
  }
}


export async function updateProductCurrency(id, currency = 'BRL') {
  try {

    await gatewayApi.post(`/products/${id}/${currency}`);
    return { success: true, error: null };
  } catch (error) {
    return { success: false, error: extractError(error) };
  }
}

export async function getHighlightedProducts() {
  try {
    const response = await gatewayApi.get('/products/highlight');
    return { products: response.data, error: null };
  } catch (error) {
    return { products: null, error: extractError(error) };
  }
}

export async function getProductsByCategory(categoryId) {
  try {
    const response = await gatewayApi.get(`/products/category/${categoryId}`);
    return { products: response.data, error: null };
  } catch (error) {
    return { products: null, error: extractError(error) };
  }
}

export async function getProductsBySport(sportId) {
  try {
    const response = await gatewayApi.get(`/products/sport/${sportId}`);
    return { products: response.data, error: null };
  } catch (error) {
    return { products: null, error: extractError(error) };
  }
}

export async function getProductsByTeam(teamId) {
  try {
    const response = await gatewayApi.get(`/products/team/${teamId}`);
    return { products: response.data, error: null };
  } catch (error) {
    return { products: null, error: extractError(error) };
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
