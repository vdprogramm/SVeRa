import api from '../constants/api';

export const getGradesByClassAndCourse = async (classId, courseId) => {
  const response = await api.get(`/grades/by-class-course?classId=${classId}&courseId=${courseId}`);
  return response.data;
};

export const searchGradesByStudent = async (keyword) => {
  const response = await api.get(`/grades/search?keyword=${keyword}`);
  return response.data;
};

export const submitGrade = async (gradeId, value) => {
  return api.post(`/grades/${gradeId}/update`, { grade: value });
};

export const getStats = async () => {
  const response = await api.get('/grades/stats');
  return response.data;
};
