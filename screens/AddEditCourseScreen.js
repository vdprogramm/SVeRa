import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert } from 'react-native';
import { addCourse, updateCourse } from '../services/courseService';


const AddEditCourseScreen = ({ route, navigation }) => {
  const editingCourse = route.params?.course;

  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (editingCourse) {
      setName(editingCourse.name);
      setCode(editingCourse.code);
      setDescription(editingCourse.description);
    }
  }, [editingCourse]);

  const handleSave = async () => {
    if (!name || !code || !description) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin.');
      return;
    }

    try {
      if (editingCourse) {
        await updateCourse(editingCourse.id, { name, code, description });
        Alert.alert('Thành công', 'Đã cập nhật khóa học.');
      } else {
        await addCourse({ name, code, description });
        Alert.alert('Thành công', 'Đã thêm khóa học.');
      }
      navigation.goBack();
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể lưu khóa học.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {editingCourse ? 'Chỉnh sửa khóa học' : 'Thêm khóa học'}
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Tên khóa học"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Mã khóa học"
        value={code}
        onChangeText={setCode}
      />
      <TextInput
        style={styles.input}
        placeholder="Mô tả"
        value={description}
        onChangeText={setDescription}
      />
      <Button title="Lưu" onPress={handleSave} />
    </View>
  );
};

export default AddEditCourseScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 24 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 6,
    marginBottom: 16,
  },
});
