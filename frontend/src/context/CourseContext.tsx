import React, { createContext, useContext, useState } from "react";
import { Course } from "../types/types";

// Define the context type
interface CourseContextType {
  courses: Course[];
  setCourses: (courses: Course[]) => void;
}

// Create the context
const CourseContext = createContext<CourseContextType | undefined>(undefined);

// Create a provider component
export const CourseProvider = ({ children }: { children: React.ReactNode }) => {
  const [courses, _setCourses] = useState<Course[]>([]);

  const setCourses = (courses: Course[]) => {
    _setCourses([...courses]);
  };

  return (
    <CourseContext.Provider value={{ courses, setCourses }}>
      {children}
    </CourseContext.Provider>
  );
};

// Custom hook to access the context
export const useCourseContext = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error("useCourseContext must be used within a CourseProvider");
  }
  return context;
};
