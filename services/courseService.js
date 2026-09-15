// services/courseService.js
import axios from './axiosInstance'; // hoặc axios trực tiếp nếu không có instance

export const getAllCourses = async () => {
  const response = await axios.get('/courses');
  return response.data;
};

export const addCourse = async (course) => {
  const response = await axios.post('/courses', course);
  return response.data;
};

export const updateCourse = async (id, course) => {
  const response = await axios.put(`/courses/${id}`, course);
  return response.data;
};
