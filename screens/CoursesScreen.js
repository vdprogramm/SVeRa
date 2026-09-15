import React, { useState, useEffect } from 'react';
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
import { getAllCourses } from '../services/courseService';

const CoursesScreen = ({ navigation }) => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');

  const fetchCourses = async () => {
    try {
      const data = await getAllCourses();
      console.log('Courses from backend:', data);
      setCourses(data);
      setFilteredCourses(data);
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể tải danh sách khóa học');
      console.error('Lỗi load courses:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleSearch = (text) => {
    setSearchText(text);
    if (!text) {
      setFilteredCourses(courses);
      return;
    }

    const lowerText = text.toLowerCase();
    const filtered = courses.filter(
      (course) =>
        course.name.toLowerCase().includes(lowerText) ||
        course.code.toLowerCase().includes(lowerText) ||
        course.description.toLowerCase().includes(lowerText)

    );
    setFilteredCourses(filtered);
  };

  const renderCourseItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => alert(`Khóa học: ${item.name} (${item.code}) - ${item.description}`)}
    >
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.code}>{item.code}</Text>
      <Text style={styles.description}>{item.description}</Text>
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
      <Text style={styles.title}>Danh sách khóa học</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Tìm theo tên hoặc mã khóa học..."
        value={searchText}
        onChangeText={handleSearch}
      />

      <FlatList
        data={filteredCourses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderCourseItem}
        ListEmptyComponent={<Text>Không tìm thấy khóa học</Text>}
      />

      <Button
        title="Thêm khóa học"
        onPress={() => navigation.navigate('AddEditCourse')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 12,
    borderRadius: 8,
  },
  item: { padding: 12, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  name: { fontSize: 16 },
  code: { fontSize: 14, color: 'gray' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default CoursesScreen;
