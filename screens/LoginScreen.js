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
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try { 
      const response = await axios.post('http://10.0.2.2:8080/api/auth/login', {
        username,
        password,
      });

      if (response.data.success) {
        
        await AsyncStorage.setItem('username', username);

        navigation.replace('Dashboard');
      } else {
        Alert.alert('Đăng nhập thất bại', response.data.message);
      }
    } catch (error) {
      console.error('Lỗi đăng nhập:', error);
      Alert.alert('Lỗi', 'Không thể kết nối đến máy chủ');
    }
  };

  const handleNavigateToRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>👩‍🎓 Đăng nhập hệ thống</Text>

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

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Đăng nhập</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleNavigateToRegister}>
        <Text style={styles.registerText}>
          Chưa có tài khoản? <Text style={{ color: '#1e90ff' }}>Đăng ký ngay</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

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
