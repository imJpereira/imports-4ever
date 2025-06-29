import axios from 'axios'

//conexão no android studio
// export const gatewayApi = axios.create({
  // baseURL: 'http://10.0.2.2:8765', 
  // timeout: 5000,
// })

//conexão casa pereira
// export const gatewayApi = axios.create({
  // baseURL: 'http://192.168.100.225:8765', 
 // timeout: 5000,
//}) 

// conexão casa alex
  export const gatewayApi = axios.create({
    baseURL: 'http://189.30.255.90:8000/ws',
      timeout: 5000,
    })


// ==== CONEXÕES FORA DO GATEWAY =====
// Cliente axios para o serviço de times (teams)
// export const teamApi = axios.create({
//   baseURL: 'http://192.168.0.11:8200', 
//   timeout: 5000,
// })

// // Cliente axios para o serviço de esportes (exemplo)
// export const sportApi = axios.creat-e({
//   baseURL: 'http://192.168.0.11:8300', 
//   timeout: 5000,
// })

// // conexão docker pereira
// export const gatewayApi = axios.create({
//   baseURL: 'http://189.30.255.90:8000/ws', 
//  timeout: 5000,
//  }) 

// // conexão docker pereira 2
//export const gatewayApi = axios.create({
//  baseURL: 'http://10.1.201.200:8765', 
//  timeout: 5000,
//})

export const setAuthToken = (token) => {
  if (token) {
    gatewayApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete gatewayApi.defaults.headers.common['Authorization'];
  }
};

