// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import CoursesScreen from './screens/CoursesScreen';
import StudentsScreen from './screens/StudentsScreen';
import StudentDetailScreen from './screens/StudentDetailScreen';
import AddEditStudentScreen from './screens/AddEditStudentScreen';
import ClassesScreen from './screens/ClassesScreen';
import GradesScreen from './screens/GradesScreen';
import SettingsScreen from './screens/SettingsScreen';
import ReportsScreen from './screens/ReportsScreen';
import AddEditCourseScreen from './screens/AddEditCourseScreen';
import RegisterScreen from './screens/RegisterScreen';
import AddEditClassScreen from './screens/AddEditClassScreen';
import ChangePasswordScreen from './screens/ChangePasswordScreen';

// ✅ Import GradeProvider
import { GradeProvider } from './contexts/GradeContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GradeProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen name="Courses" component={CoursesScreen} />
          <Stack.Screen name="Students" component={StudentsScreen} />
          <Stack.Screen name="StudentDetail" component={StudentDetailScreen} />
          <Stack.Screen name="AddEditStudent" component={AddEditStudentScreen} />
          <Stack.Screen name="Classes" component={ClassesScreen} />
          <Stack.Screen name="Grades" component={GradesScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="Reports" component={ReportsScreen} />
          <Stack.Screen name="AddEditCourse" component={AddEditCourseScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="AddEditClass" component={AddEditClassScreen} />
          <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </GradeProvider>
  );
}
