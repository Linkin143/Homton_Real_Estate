import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

// ─── Response interceptor ──────────────────────────────────────────────────────
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      'An unexpected error occurred'
    return Promise.reject(new Error(message))
  }
)

// ─── Properties ───────────────────────────────────────────────────────────────
export const propertiesApi = {
  getAll: (params = {}) => api.get('/properties', { params }),
  getFeatured: () => api.get('/properties/featured'),
  getById: (id) => api.get(`/properties/${id}`),
  getBySlug: (slug) => api.get(`/properties/slug/${slug}`),
}

// ─── Inquiries ─────────────────────────────────────────────────────────────────
export const inquiriesApi = {
  create: (data) => api.post('/inquiries', data),
}

export default api
