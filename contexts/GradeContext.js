// contexts/GradeContext.js
import React, { createContext, useState, useContext } from 'react';

const GradeContext = createContext();

export const GradeProvider = ({ children }) => {
  const [students] = useState([
    { id: 1, name: 'Nguyễn Văn A' },
    { id: 2, name: 'Trần Thị B' },
    { id: 3, name: 'Lê Văn C' },
    { id: 4, name: 'Phạm Thị D' },
  ]);

  const [grades, setGrades] = useState([
    { id: 1, studentId: 1, courseName: 'Toán', grade: 8.5 },
    { id: 2, studentId: 2, courseName: 'Lý', grade: 7.0 },
  ]);

  const addOrUpdateGrade = (studentId, courseName, grade) => {
    setGrades((prev) => {
      const existingIndex = prev.findIndex(
        (g) => g.studentId === studentId && g.courseName === courseName
      );

      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex].grade = grade;
        return updated;
      } else {
        const newId = prev.length > 0 ? Math.max(...prev.map((g) => g.id)) + 1 : 1;
        return [...prev, { id: newId, studentId, courseName, grade }];
      }
    });
  };

  // ✅ Hàm xóa điểm
  const deleteGrade = (studentId, courseName) => {
    setGrades((prev) =>
      prev.filter((g) => !(g.studentId === studentId && g.courseName === courseName))
    );
  };

  return (
    <GradeContext.Provider value={{ students, grades, addOrUpdateGrade, deleteGrade }}>
      {children}
    </GradeContext.Provider>
  );
};

export const useGradeContext = () => {
  const context = useContext(GradeContext);
  if (!context) {
    throw new Error('useGradeContext must be used within a GradeProvider');
  }
  return context;
};
