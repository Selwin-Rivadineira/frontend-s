// src/app/redux/services/baseApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from './apiConfig'; // 👈 Importamos la URL correcta

// Ya no definimos API_URL aquí localmente

export const baseQuery = fetchBaseQuery({
  baseUrl: API_URL, // 👈 Usamos la constante importada
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('servineo_token');
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    headers.set('Content-Type', 'application/json');
    return headers;
  },
  // credentials: 'include', // Opcional: coméntalo si tienes problemas de CORS al inicio
});

export interface ApiError {
  status: number;
  data: {
    message: string;
    errors?: Record<string, string[]>;
  };
}

export const isApiError = (error: unknown): error is ApiError => {
  return typeof error === 'object' && error !== null && 'status' in error && 'data' in error;
};

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery,
  tagTypes: [
    'User',
    'Job',
    'Statistics',
    'JobOffer',
    'Requester',
    'SearchHistory',
    'Experience',
    'Portfolio',
  ],
  endpoints: () => ({}),
});
