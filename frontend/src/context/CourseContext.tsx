/* eslint-disable react-refresh/only-export-components */

import React, { createContext, useReducer } from "react";
import { Course } from "../types/types";

type CourseContextType = ReducerState & {
  courseSetters?: {
    editCourse: (course: Partial<Course>) => void;
    addCourse: (course: Course) => void;
    deleteCourse: (course: Course) => void;
    setCurrentCourse: (course: Course) => void;
    setCourses: (courses: Course[]) => void;
  };
};

type ReducerAction = {
  type:
    | "editCourse"
    | "addCourse"
    | "deleteCourse"
    | "setCurrentCourse"
    | "setCourses";
  payload: Course[] | Course | Partial<Course>;
};

type ReducerState = {
  courses: Course[];
  currentCourse: Course;
};

const initialState = {
  courses: [] as Course[],
  currentCourse: {} as Course,
};

export const CourseContext = createContext<CourseContextType>(initialState);

function reducerFunction(state: ReducerState, action: ReducerAction) {
  if (action.type === "editCourse") {
    const courses = state.courses.map((course) => {
      if (course.id === (action.payload as Course).id) {
        return { course, ...(action.payload as Partial<Course>) } as Course;
      }
      return course;
    });

    return { ...state, courses };
  } else if (action.type === "addCourse")
    return { ...state, courses: [...state.courses, action.payload as Course] };
  else if (action.type === "deleteCourse") {
    const courses = state.courses.filter(
      (course) => course.id !== (action.payload as Course)?.id
    );

    return { ...state, courses };
  } else if (action.type === "setCurrentCourse")
    return { ...state, currentCourse: action.payload as Course };
  else if (action.type === "setCourses") {
    return { ...state, courses: action.payload as Course[] };
  }

  return state;
}

export default function CourseProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [{ courses, currentCourse }, dispatch] = useReducer(
    reducerFunction,
    initialState
  );

  function setCourses(courses: Course[]) {
    dispatch({ type: "setCourses", payload: courses });
  }

  function editCourse(course: Partial<Course>) {
    dispatch({ type: "editCourse", payload: course });
  }

  function addCourse(course: Course) {
    dispatch({ type: "addCourse", payload: course });
  }

  function deleteCourse(course: Course) {
    dispatch({ type: "deleteCourse", payload: course });
  }
  function setCurrentCourse(course: Course) {
    dispatch({ type: "setCurrentCourse", payload: course });
  }

  return (
    <CourseContext.Provider
      value={{
        courses,
        currentCourse,
        courseSetters: {
          setCourses,
          editCourse,
          addCourse,
          deleteCourse,
          setCurrentCourse,
        },
      }}
    >
      {children}
    </CourseContext.Provider>
  );
}
