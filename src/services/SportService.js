import { gatewayApi } from './api'

export async function getSports() {
  try {
    const response = await gatewayApi.get('/sports')
    return { sports: response.data, error: null }
  } catch (error) {
    return { error: error.message }
  }
}

export async function getSportById(id) {
  try {
    const response = await gatewayApi.get(`/sports/${id}`)
    return { sport: response.data, error: null }
  } catch (error) {
    return { error: error.message }
  }
}

export async function createSport(sport) {
  try {
    const response = await gatewayApi.post('/sports/create', { name: sport.nome })
    return { sport: response.data, error: null }
  } catch (error) {
    return { error: error.message }
  }
}

export async function updateSport(id, sport) {
  try {
    const response = await gatewayApi.put(`/sports/update/${id}`, { name: sport.nome })
    return { sport: response.data, error: null }
  } catch (error) {
    return { error: error.message }
  }
}

export async function deleteSport(id) {
  try {
    await gatewayApi.delete(`/sports/delete/${id}`)
    return { error: null }
  } catch (error) {
    return { error: error.message }
  }
}

export async function searchSportsByName(name) {
  try {
    const response = await gatewayApi.get(`/sports/like/${name}`)
    return { sports: response.data, error: null }
  } catch (error) {
    return { error: error.message }
  }
}
