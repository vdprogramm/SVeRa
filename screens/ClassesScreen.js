import React, { useState, useEffect } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator,
  Alert, Button, TextInput,
} from 'react-native';
import { getAllClasses, searchClasses } from '../services/classService';

const ClassesScreen = ({ navigation }) => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');

  const fetchClasses = async () => {
    try {
      const data = await getAllClasses();
      setClasses(data);
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể tải danh sách lớp học');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      if (searchText.trim() === '') {
        fetchClasses();
        return;
      }
      const result = await searchClasses(searchText);
      setClasses(result);
    } catch (e) {
      Alert.alert('Lỗi', 'Không thể tìm lớp học');
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', fetchClasses);
    return unsubscribe;
  }, [navigation]);

  const renderClassItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('AddEditClass', { classItem: item })}
    >
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.code}>{item.code}</Text>
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
      <Text style={styles.title}>Danh sách lớp học</Text>

      {/* Thanh tìm kiếm */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm lớp học..."
          value={searchText}
          onChangeText={setSearchText}
        />
        <Button title="Tìm" onPress={handleSearch} />
      </View>

      <FlatList
        data={classes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderClassItem}
      />

      <Button
        title="Thêm lớp học"
        onPress={() => navigation.navigate('AddEditClass')}
      />
    </View>
  );
};

export default ClassesScreen;

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
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  name: {
    fontSize: 18,
  },
  code: {
    fontSize: 14,
    color: '#666',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 12,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
});
