// services/studentService.js
import api from '../constants/api';

// Lấy danh sách sinh viên
export const getAllStudents = async () => {
  try {
    const response = await api.get('/students');
    return response.data;
  } catch (error) {
    console.error('Lỗi getAllStudents:', error.message);
    throw error;
  }
};

// Lấy chi tiết 1 sinh viên theo ID
export const getStudentById = async (id) => {
  try {
    const response = await api.get(`/students/${id}`);
    return response.data;
  } catch (error) {
    console.error('Lỗi getStudentById:', error.message);
    throw error;
  }
};

// Thêm sinh viên mới
export const createStudent = async (student) => {
  try {
    const response = await api.post('/students', student);
    return response.data;
  } catch (error) {
    console.error('Lỗi createStudent:', error.message);
    throw error;
  }
};

// Cập nhật sinh viên
export const updateStudent = async (id, student) => {
  try {
    const response = await api.put(`/students/${id}`, student);
    return response.data;
  } catch (error) {
    console.error('Lỗi updateStudent:', error.message);
    throw error;
  }
};

// Xóa sinh viên
export const deleteStudent = async (id) => {
  try {
    await api.delete(`/students/${id}`);
    return true;
  } catch (error) {
    console.error('Lỗi deleteStudent:', error.message);
    throw error;
  }
};
