// screens/RegisterScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import axios from 'axios';

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (!username || !password) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin');
      return;
    }

    try {
      const response = await axios.post('http://10.0.2.2:8080/api/auth/register', {
        username,
        password,
      });

      if (response.data.success) {
        Alert.alert('Thành công', response.data.message, [
          { text: 'Đăng nhập ngay', onPress: () => navigation.replace('Login') },
        ]);
      } else {
        Alert.alert('Thất bại', response.data.message);
      }
    } catch (error) {
      console.error('Lỗi đăng ký:', error);
      Alert.alert('Lỗi', 'Không thể kết nối đến máy chủ');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📝 Đăng ký tài khoản</Text>

      <TextInput
        style={styles.input}
        placeholder="Tên đăng nhập"
        value={username}
        onChangeText={setUsername}
        placeholderTextColor="#999"
      />

      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#999"
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleRegister}>
        <Text style={styles.loginButtonText}>Đăng ký</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.replace('Login')}>
        <Text style={styles.registerText}>
          Đã có tài khoản? <Text style={{ color: '#1e90ff' }}>Đăng nhập</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#f9fafe',
  },
  title: {
    fontSize: 26,
    marginBottom: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#1e90ff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#1e90ff',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  registerText: {
    textAlign: 'center',
    color: '#555',
  },
});
