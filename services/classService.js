// services/classService.js
import axios from 'axios';

const API_URL = 'http://10.0.2.2:8080/api/classes'; // Ví dụ: http://192.168.1.5:8080/api/classes

export const getAllClasses = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addClass = async (classData) => {
  const response = await axios.post(API_URL, classData);
  return response.data;
};

export const searchClasses = async (keyword) => {
  const response = await axios.get(`http://10.0.2.2:8080/api/classes/search?keyword=${keyword}`);
  return response.data;
};

export const updateClass = async (id, classData) => {
  const response = await axios.put(`${API_URL}/${id}`, classData);
  return response.data;
};

export const deleteClass = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
