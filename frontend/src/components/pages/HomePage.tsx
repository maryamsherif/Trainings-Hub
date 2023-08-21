import { Course } from "../../types/types";
import SearchBar from "../reusable/SearchBar/SearchBar";
import CourseList from "../reusable/course/CourseList";
import Card from "../reusable/layout/Card";

const courses: Course[] = [
  {
    id: 1,
    title: "React",
    description: "React course",
    category: "Beginner",
    instructorName: "John",
    ratings: 4.2,
  },
  {
    id: 2,
    title: "React",
    description: "React course",
    category: "Professional",
    instructorName: "John",
    ratings: 4.2,
  },
  {
    id: 3,
    title: "React",
    description: "React course",
    category: "Intermediate",
    instructorName: "John",
    ratings: 4.2,
  },
  {
    id: 4,
    title: "React",
    description: "React course",
    category: "Intermediate",
    instructorName: "John",
    ratings: 4.2,
  },
  {
    id: 5,
    title: "React",
    description: "React course",
    category: "Professional",
    instructorName: "John",
    ratings: 4.2,
  },
  {
    id: 6,
    title: "React",
    description: "React course",
    category: "Professional",
    instructorName: "John",
    ratings: 4.2,
  },
  {
    id: 7,
    title: "React",
    description: "React course",
    category: "Professional",
    instructorName: "John",
    ratings: 4.2,
  },
];

export default function HomePage() {
  return (
    <Card className="flex">
      <SearchBar />
      <CourseList courses={courses}></CourseList>
    </Card>
  );
}
