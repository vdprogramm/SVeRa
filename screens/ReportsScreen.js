import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { BASE_URL } from '../constants/api';

const ReportsScreen = () => {
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await axios.get('http://10.0.2.2:8080/api/reports/summary');
        setReportData(res.data);
      } catch (error) {
        Alert.alert('Lỗi', 'Không thể tải báo cáo thống kê');
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (!reportData) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Không có dữ liệu báo cáo.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📊 Báo cáo thống kê</Text>

      <ReportItem label="👨‍🎓 Tổng số sinh viên" value={reportData.totalStudents} />
      <ReportItem label="📚 Tổng số khóa học" value={reportData.totalCourses} />
      <ReportItem label="🏫 Tổng số lớp học" value={reportData.totalClasses} />
      <ReportItem label="🧮 Điểm trung bình" value={reportData.averageGrade?.toFixed(2) || '0.00'} />
    </View>
  );
};

const ReportItem = ({ label, value }) => (
  <View style={styles.item}>
    <Text style={styles.label}>{label}:</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

export default ReportsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#333',
  },
  item: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
  value: {
    fontSize: 16,
    color: '#007AFF',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
});
