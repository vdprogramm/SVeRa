// screens/DashboardScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const features = [
  { name: '👨‍🎓 Quản lý sinh viên ', color: '#4CAF50', screen: 'Students' },
  { name: '📋 Nhập điểm', color: '#FF9800', screen: 'Grades' },
  { name: '📊 Báo cáo',  color: '#9C27B0', screen: 'Reports' },
  { name: '📚 Môn học',  color: '#F44336', screen: 'Courses' },
  { name: '🏫 Lớp học',  color: '#03A9F4', screen: 'Classes' },
  { name: '⚙️ Cài đặt',  color: '#607D8B', screen: 'Settings' },
];

const DashboardScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thao tác nhanh</Text>
      <View style={styles.grid}>
        {features.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.card, { backgroundColor: item.color }]}
            onPress={() => navigation.navigate(item.screen)}
          >
            <Icon name={item.icon} size={32} color="#fff" style={styles.icon} />
            <Text style={styles.cardText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '47%',
    aspectRatio: 1,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    elevation: 4,
  },
  icon: {
    marginBottom: 8,
  },
  cardText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});
