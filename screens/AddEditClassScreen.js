import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert } from 'react-native';
import { addClass, updateClass, deleteClass } from '../services/classService';

const AddEditClassScreen = ({ route, navigation }) => {
  const editingClass = route.params?.classItem;
  const [name, setName] = useState('');
  const [code, setCode] = useState('');

  useEffect(() => {
    if (editingClass) {
      setName(editingClass.name);
      setCode(editingClass.code);
    }
  }, [editingClass]);

  const handleSave = async () => {
    if (!name || !code) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin lớp học.');
      return;
    }

    try {
      if (editingClass) {
        await updateClass(editingClass.id, { name, code });
        Alert.alert('Thành công', 'Đã cập nhật lớp học.');
      } else {
        await addClass({ name, code });
        Alert.alert('Thành công', 'Đã thêm lớp học.');
      }
      navigation.goBack();
    } catch (error) {
      console.error('Lỗi khi lưu lớp học:', error);
      Alert.alert('Lỗi', 'Không thể lưu lớp học.');
    }
  };

  const handleDelete = async () => {
    Alert.alert('Xác nhận xóa', 'Bạn có chắc chắn muốn xóa lớp học này?', [
      { text: 'Hủy', style: 'cancel' },
      {
        text: 'Xóa',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteClass(editingClass.id);
            Alert.alert('Thành công', 'Đã xóa lớp học.');
            navigation.goBack();
          } catch (error) {
            console.error('Lỗi khi xóa lớp học:', error);
            Alert.alert('Lỗi', 'Không thể xóa lớp học.');
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{editingClass ? 'Chỉnh sửa lớp học' : 'Thêm lớp học'}</Text>
      <TextInput
        style={styles.input}
        placeholder="Tên lớp"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Mã lớp"
        value={code}
        onChangeText={setCode}
      />
      <Button title="Lưu" onPress={handleSave} />

      {editingClass && (
        <View style={styles.deleteButton}>
          <Button title="Xóa lớp học" color="red" onPress={handleDelete} />
        </View>
      )}
    </View>
  );
};

export default AddEditClassScreen;

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
  deleteButton: {
    marginTop: 24,
  },
});
