// src/app/redux/services/apiConfig.ts

// 1. La URL del servidor (sin /api)
export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://backend-s-8.onrender.com';

// 2. La URL específica para peticiones de datos (con /api)
export const API_URL = `${BACKEND_URL}/api`;

// Log para debugging (solo en desarrollo)
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  console.log('🔗 BACKEND_URL:', BACKEND_URL);
  console.log('🔗 API_URL:', API_URL);
}
