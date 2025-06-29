import { gatewayApi } from './api';

export async function getSports() {
  try {
    const response = await gatewayApi.get('/sports');
    return { sports: response.data, error: null };
  } catch (error) {
    return { sports: null, error: extractError(error) };
  }
}

export async function getSportById(id) {
  try {
    const response = await gatewayApi.get(`/sports/${id}`);
    return { sport: response.data, error: null };
  } catch (error) {
    return { sport: null, error: extractError(error) };
  }
}

export async function searchSportsByName(name) {
  try {
    const response = await gatewayApi.get(`/sports/like/${name}`);
    return { sports: response.data, error: null };
  } catch (error) {
    return { sports: null, error: extractError(error) };
  }
}

export async function createSport(sport) {
  try {
    const payload = {
      name: sport.name,
      url: sport.url,
    };
    const response = await gatewayApi.post('/sports/create', payload);
    return { sport: response.data, error: null };
  } catch (error) {
    console.log('Erro ao criar esporte:', error.response?.data);
    return { sport: null, error: extractError(error) };
  }
}

export async function updateSport(id, sport) {
  try {
    const payload = {
      name: sport.name,
      url: sport.url,
    };
    const response = await gatewayApi.put(`/sports/update/${id}`, payload);
    return { sport: response.data, error: null };
  } catch (error) {
    console.log('Erro ao atualizar esporte:', error.response?.data);
    return { sport: null, error: extractError(error) };
  }
}

export async function deleteSport(id) {
  try {
    await gatewayApi.delete(`/sports/delete/${id}`);
    return { error: null };
  } catch (error) {
    return { error: extractError(error) };
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
