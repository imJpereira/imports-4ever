import api from './api';
import { useAuth } from '../contexts/AuthContext';

export function useAuthenticatedApi() {
  const { token } = useAuth();

  if (!token) {
    throw new Error('Token de autenticação não encontrado');
  }

  const authApi = {
    get: (url, config = {}) =>
      api.get(url, {
        ...config,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        },
      }),

    post: (url, data, config = {}) =>
      api.post(url, data, {
        ...config,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        },
      }),

    put: (url, data, config = {}) =>
      api.put(url, data, {
        ...config,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        },
      }),

    delete: (url, config = {}) =>
      api.delete(url, {
        ...config,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        },
      }),
  };

  return authApi;
}
