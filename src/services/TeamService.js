import { gatewayApi } from './api'

export async function getTeams() {
  try {
    const response = await gatewayApi.get('/teams')
    return { teams: response.data, error: null }
  } catch (error) {
    return { error: error.message }
  }
}

export async function createTeam(team) {
  try {
    const response = await gatewayApi.post('/teams/create', { name: team.nome })
    return { team: response.data, error: null }
  } catch (error) {
    return { error: error.message }
  }
}

export async function updateTeam(id, team) {
  try {
    const response = await gatewayApi.put(`/teams/update/${id}`, { name: team.nome })
    return { team: response.data, error: null }
  } catch (error) {
    return { error: error.message }
  }
}

export async function deleteTeam(id) {
  try {
    await gatewayApi.delete(`/teams/delete/${id}`)
    return { error: null }
  } catch (error) {
    return { error: error.message }
  }
}
