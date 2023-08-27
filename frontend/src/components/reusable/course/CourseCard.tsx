import { Link } from "react-router-dom";
import { Course } from "../../../types/types";
import classNames from "classnames";

export default function CourseCard({ course }: { course: Course }) {
  const courseLink = `course/${course.id}`;
  const categoryClasses = {
    Beginner: "bg-sky-400",
    Intermediate: "bg-yellow-500",
    Professional: "bg-indigo-700",
  };
  return (
    <article className="relative w-full flex bg-gray-100 flex-col max-w-sm shadow-sm rounded-md hover:shadow-md hover:translate-y-[-2px] transition-all ease-linear">
      <div>
        <Link to={courseLink}>
          <img
            className="block w-full rounded-t-md"
            src={
              course.imgUrl ||
              "https://img-b.udemycdn.com/course/240x135/1362070_b9a1_2.jpg"
            }
            alt={course.title}
          />
        </Link>
      </div>
      <div className="p-2">
        <Link
          to={courseLink}
          className="text-lg font-bold text-gray-800 mb-1 hover:underline cursor-pointer"
        >
          {course.title}
        </Link>
        <p className="text-sm text-gray-600 mb-2">🙎🏻‍♂️ {course.instructorName}</p>
        <p className="text-sm line-clamp-3 text-gray-600 mb-3">
          {course.description}
        </p>
        <div className="flex gap-1 justify-between mb-4">
          <div className="flex items-center gap-1">
            <span>⭐️</span>
            <span
              title={`ratings ${course.rating.toFixed(1)}`}
              className="text-sm"
            >
              {course.rating.toFixed(1)}
            </span>
          </div>
          <div className="py-[0.5px] px-1 rounded-md bg-white flex items-center gap-[2px]">
            <span>🕐</span>
            <span className="text-[10px]  text-gray-800 px-1 py-[0.5]">
              {course.duration}h
            </span>
          </div>
        </div>
        <div className="flex justify-end">
          <span
            className={classNames(
              "text-[10px] text-white rounded-full px-1 py-[0.5]",
              categoryClasses[course.category]
            )}
          >
            {course.category}
          </span>
        </div>
      </div>
    </article>
  );
}

// {/* <img src="course.url" alt="course.name" /> */}
