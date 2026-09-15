// services/authService.js
import api from '../constants/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const changePassword = async ({ oldPassword, newPassword }) => {
  const username = await AsyncStorage.getItem('username'); // lấy username đã lưu

  if (!username) {
    throw new Error('Không tìm thấy thông tin người dùng');
  }

  return api.post('/auth/change-password', {
    username,
    oldPassword,
    newPassword,
  });
};
