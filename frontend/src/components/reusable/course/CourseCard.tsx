import { Link } from "react-router-dom";
import { Course } from "../../../types/types";
import starSvg from "../../../assets/star.svg";
import classNames from "classnames";

export default function CourseCard({ course }: { course: Course }) {
  const courseLink = `/course/${course.id}`;
  const categoryClasses = {
    Beginner: "bg-sky-400",
    Intermediate: "bg-yellow-500",
    Professional: "bg-indigo-700",
  };
  return (
    <article className="w-full flex bg-gray-100 flex-col max-w-sm shadow-sm rounded-md hover:shadow-md hover:translate-y-[-2px] transition-all ease-linear">
      <div className="imgCotainer">
        <Link to={courseLink}>
          <img
            className="block w-full rounded-t-md"
            src="https://img-b.udemycdn.com/course/240x135/1362070_b9a1_2.jpg"
            alt={course.title}
          />
        </Link>
      </div>
      <div className="p-2">
        <Link
          to={courseLink}
          className="text-lg font-bold text-gray-800 mb-2 hover:underline cursor-pointer"
        >
          {course.title}
        </Link>
        <p className="text-sm truncate max-h-8x text-gray-600 mb-3">
          {course.description}
        </p>
        <div title={`ratings ${course.ratings}`} className="flex gap-1 ">
          <img
            src={starSvg}
            alt={`ratings ${course.ratings}`}
            className="w-4 h-4"
          />
          <span className="text-sm">{course.ratings}</span>
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
