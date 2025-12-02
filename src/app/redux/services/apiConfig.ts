// Configuración de la API
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://backend-s-8.onrender.com/api';

// Log para debugging (solo en desarrollo)
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  console.log('🔗 API URL configurada:', API_URL);
  console.log('🔗 NEXT_PUBLIC_API_URL:', process.env.NEXT_PUBLIC_API_URL);
}
