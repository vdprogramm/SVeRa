// screens/ChangePasswordScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert } from 'react-native';
import { changePassword } from '../services/authService';

const ChangePasswordScreen = ({ navigation }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = async () => {
    if (!oldPassword || !newPassword) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin');
      return;
    }

    try {
      await changePassword({oldPassword, newPassword });
      Alert.alert('Thành công', 'Đổi mật khẩu thành công');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể đổi mật khẩu. Vui lòng kiểm tra lại.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đổi mật khẩu</Text>
      <TextInput
        placeholder="Mật khẩu cũ"
        secureTextEntry
        value={oldPassword}
        onChangeText={setOldPassword}
        style={styles.input}
      />
      <TextInput
        placeholder="Mật khẩu mới"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
        style={styles.input}
      />
      <Button title="Xác nhận" onPress={handleSubmit} />
    </View>
  );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
});
