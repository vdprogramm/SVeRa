// services/api.js
import axios from 'axios';

// Địa chỉ backend (cho Android Emulator, dùng 10.0.2.2 để thay localhost)
const API_BASE_URL = 'http://10.0.2.2:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ==== STUDENT API ====
export const getAllStudents = () => api.get('/students');
export const getStudentById = (id) => api.get(`/students/${id}`);
export const createStudent = (data) => api.post('/students', data);
export const updateStudent = (id, data) => api.put(`/students/${id}`, data);
export const deleteStudent = (id) => api.delete(`/students/${id}`);

// Có thể thêm Course, Class... tương tự
export default api;
