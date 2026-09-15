import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { deleteStudent } from '../services/studentService';

const StudentDetailScreen = ({ route, navigation }) => {
  const { student } = route.params;

  const handleEdit = () => {
    navigation.navigate('AddEditStudent', { student });
  };

  const handleDelete = async () => {
    try {
      await deleteStudent(student.id);
      Alert.alert('Đã xóa', 'Sinh viên đã được xóa.');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể xóa sinh viên.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thông tin sinh viên</Text>
      <Text style={styles.label}>Họ tên:</Text>
      <Text style={styles.value}>{student.name}</Text>
      <Text style={styles.label}>Mã sinh viên:</Text>
      <Text style={styles.value}>{student.studentId}</Text>

      <View style={styles.buttonContainer}>
        <Button title="Chỉnh sửa" onPress={handleEdit} />
        <View style={{ height: 12 }} />
        <Button title="Xóa" color="red" onPress={handleDelete} />
      </View>
    </View>
  );
};

export default StudentDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    marginTop: 12,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    marginTop: 24,
  },
});
