// screens/AddEditStudentScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert } from 'react-native';
import { createStudent, updateStudent } from '../services/studentService';


const AddEditStudentScreen = ({ route, navigation }) => {
  const editingStudent = route.params?.student;

  const [name, setName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [major, setMajor] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (editingStudent) {
      setName(editingStudent.name);
      setStudentId(editingStudent.studentId);
    }
  }, [editingStudent]);

 const handleSave = async () => {
  if (!name || !studentId) {
    Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin.');
    return;
  }

  try {
    if (editingStudent) {
      await updateStudent(editingStudent.id, { name, studentId, major, email });
      Alert.alert('Thành công', 'Đã cập nhật sinh viên.');
    } else {
      await createStudent({ name, studentId, major, email });
      Alert.alert('Thành công', 'Đã thêm sinh viên.');
    }

    navigation.goBack();
  } catch (error) {
    Alert.alert('Lỗi', 'Không thể lưu sinh viên.');
    console.error(error);
  }
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {editingStudent ? 'Chỉnh sửa sinh viên' : 'Thêm sinh viên'}
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Họ tên"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Mã sinh viên"
        value={studentId}
        onChangeText={setStudentId}
      />
      <TextInput
        style={styles.input}
        placeholder="Chuyên ngành"
        value={major}
        onChangeText={setMajor}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <Button title="Lưu" onPress={handleSave} />
    </View>
  );
};

export default AddEditStudentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 6,
    marginBottom: 16,
  },
});
