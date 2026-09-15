import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const SettingsScreen = ({ navigation }) => {
  const handleChangePassword = () => {
    navigation.navigate('ChangePassword');
  };

  const handleLogout = () => {
    Alert.alert('Đăng xuất', 'Bạn đã đăng xuất thành công.');
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      {/* Thông tin người dùng */}
      <View style={styles.profileBox}>
        <Image
          source={require('../assets/a1.png')} // avatar mặc định
          style={styles.avatar}
        />
        <Text style={styles.name}>Admin</Text>
        <Text style={styles.role}>Quản trị viên</Text>
      </View>

      {/* Nhóm Tài khoản */}
      <Text style={styles.sectionTitle}>Tài khoản</Text>
      <View style={styles.card}>
        <TouchableOpacity style={styles.item} onPress={handleChangePassword}>
          
          <Text style={styles.itemText}>🔒 Đổi mật khẩu</Text>
        </TouchableOpacity>
      </View>

      {/* Nhóm Dữ liệu */}
      <Text style={styles.sectionTitle}>Dữ liệu</Text>
      <View style={styles.card}>
        <TouchableOpacity style={styles.item} onPress={() => Alert.alert('Sắp có', 'Tính năng thống kê sẽ được cập nhật.')}>
          
          <Text style={styles.itemText}>📈 Thống kê dữ liệu</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={() => Alert.alert('Sắp có', 'Tính năng xuất dữ liệu sẽ được cập nhật.')}>
          
          <Text style={styles.itemText}>📤 Xuất dữ liệu</Text>
        </TouchableOpacity>
      </View>

      {/* Đăng xuất */}
      <View style={styles.logoutBox}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color="#fff" />
          <Text style={styles.logoutText}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
    padding: 20,
  },
  profileBox: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  role: {
    color: '#777',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e88e5',
    marginTop: 16,
    marginBottom: 6,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  itemText: {
    marginLeft: 12,
    fontSize: 15,
    color: '#333',
  },
  logoutBox: {
    marginTop: 'auto',
    alignItems: 'center',
  },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: '#d9534f',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    marginLeft: 10,
    fontWeight: 'bold',
  },
});
