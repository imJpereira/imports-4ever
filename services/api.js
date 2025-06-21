import axios from 'axios'

// Cliente axios para o serviço de times (teams)
export const teamApi = axios.create({
  baseURL: 'http://192.168.0.11:8200', 
  timeout: 5000,
})

// Cliente axios para o serviço de esportes (exemplo)
export const sportApi = axios.create({
  baseURL: 'http://192.168.0.11:8300', 
  timeout: 5000,
})


