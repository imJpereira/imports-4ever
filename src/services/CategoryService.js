import { gatewayApi } from './api'

export async function getCategories() {
  try {
    const response = await gatewayApi.get('/categories')
    return { categories: response.data, error: null }
  } catch (error) {
    return { error: error.message }
  }
}

export async function createCategory(category) {
  try {
    const response = await gatewayApi.post('/categories/create', { name: category.nome })
    return { category: response.data, error: null }
  } catch (error) {
    return { error: error.message }
  }
}

export async function updateCategory(id, category) {
  try {
    const response = await gatewayApi.put(`/categories/update/${id}`, { name: category.nome })
    return { category: response.data, error: null }
  } catch (error) {
    return { error: error.message }
  }
}

export async function deleteCategory(id) {
  try {
    await gatewayApi.delete(`/categories/delete/${id}`)
    return { error: null }
  } catch (error) {
    return { error: error.message }
  }
}

export async function searchCategoriesByName(name) {
  try {
    const response = await gatewayApi.get(`/categories/like/${name}`)
    return { categories: response.data, error: null }
  } catch (error) {
    return { error: error.message }
  }
}
