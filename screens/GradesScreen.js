// screens/GradesScreen.js (chỉ sửa phần renderStudent)
import React, { useState } from 'react';
import {
  View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet
} from 'react-native';
import { useGradeContext } from '../contexts/GradeContext';

const GradesScreen = () => {
  const { students, grades, addOrUpdateGrade, deleteGrade } = useGradeContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [courseName, setCourseName] = useState('');
  const [inputGrade, setInputGrade] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);

  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSaveGrade = () => {
    if (selectedStudent && courseName && inputGrade) {
      addOrUpdateGrade(selectedStudent.id, courseName, parseFloat(inputGrade));
      setCourseName('');
      setInputGrade('');
      setSelectedStudent(null);
    }
  };

  const getStudentGrades = (studentId) =>
    grades.filter((g) => g.studentId === studentId);

  const handleDeleteGrade = (studentId, courseName) => {
    deleteGrade(studentId, courseName);
  };

  const renderStudent = ({ item }) => (
    <TouchableOpacity
      style={styles.studentItem}
      onPress={() => setSelectedStudent(item)}
    >
      <Text style={styles.studentName}>{item.name}</Text>
      {getStudentGrades(item.id).map((g) => (
        <View key={g.courseName} style={styles.gradeRow}>
          <Text style={styles.gradeText}>📘 {g.courseName}: {g.grade}</Text>
          <TouchableOpacity
            onPress={() => handleDeleteGrade(item.id, g.courseName)}
            style={styles.deleteButton}
          >
            <Text style={styles.deleteText}>❌</Text>
          </TouchableOpacity>
        </View>
      ))}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quản lý điểm</Text>

      <TextInput
        style={styles.input}
        placeholder="🔍 Tìm sinh viên..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />

      {selectedStudent && (
        <View style={styles.form}>
          <Text style={styles.label}>Nhập điểm cho: {selectedStudent.name}</Text>
          <TextInput
            style={styles.input}
            placeholder="Tên môn học"
            value={courseName}
            onChangeText={setCourseName}
          />
          <TextInput
            style={styles.input}
            placeholder="Điểm (VD: 8.0)"
            value={inputGrade}
            onChangeText={setInputGrade}
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.button} onPress={handleSaveGrade}>
            <Text style={styles.buttonText}>Lưu điểm</Text>
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={filteredStudents}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderStudent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  input: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 8,
    padding: 10, marginBottom: 10
  },
  studentItem: {
    padding: 12, backgroundColor: '#f2f2f2',
    borderRadius: 8, marginBottom: 10
  },
  studentName: { fontWeight: 'bold', marginBottom: 4 },
  gradeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 8,
  },
  gradeText: {},
  deleteButton: {
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  deleteText: { color: 'red', fontSize: 18 },
  form: { marginTop: 10, marginBottom: 20 },
  label: { fontWeight: 'bold', marginBottom: 6 },
  button: {
    backgroundColor: '#007AFF', padding: 12,
    borderRadius: 8, marginTop: 10
  },
  buttonText: { color: 'white', textAlign: 'center', fontWeight: 'bold' },
});

export default GradesScreen;
