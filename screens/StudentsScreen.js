import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Button,
  ActivityIndicator,
  Alert,
  TextInput,
} from 'react-native';
import { getAllStudents } from '../services/studentService';

const StudentsScreen = ({ navigation }) => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');

  const fetchStudents = async () => {
    try {
      const data = await getAllStudents();      
      setStudents(data);
      setFilteredStudents(data); // mặc định hiển thị tất cả
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể tải danh sách sinh viên');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', fetchStudents);
    return unsubscribe;
  }, [navigation]);

  const handleSearch = (text) => {
    setSearchText(text);
    if (!text) {
      setFilteredStudents(students);
      return;
    }

    const filtered = students.filter((student) =>
      student.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredStudents(filtered);
  };

  const renderStudentItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('StudentDetail', { student: item })}
    >
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.id}>{item.studentId}</Text>
      <Text style={styles.email}>{item.email}</Text>
      <Text style={styles.phone}>{item.major}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Danh sách sinh viên</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Tìm theo tên sinh viên..."
        value={searchText}
        onChangeText={handleSearch}
      />

      <FlatList
        data={filteredStudents}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderStudentItem}
        ListEmptyComponent={<Text>Không tìm thấy sinh viên</Text>}
      />

      <Button
        title="Thêm sinh viên"
        onPress={() => navigation.navigate('AddEditStudent')}
      />
    </View>
  );
};

export default StudentsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 12,
    borderRadius: 8,
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  name: {
    fontSize: 18,
  },
  id: {
    fontSize: 14,
    color: '#666',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
