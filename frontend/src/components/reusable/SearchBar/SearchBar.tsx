import { useContext, useState } from "react";
import { CourseContext } from "../../../context/CourseContext";
import { Course, backendSuccessResponse } from "../../../types/types";
import { fetchDataFromAPI } from "../../../utils";

export default function SearchBar({
  setShowPagination,
}: {
  setShowPagination: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [category, setCategory] = useState("");
  const { courseSetters } = useContext(CourseContext);

  async function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setCategory("");
    const formData = new FormData(event.target as HTMLFormElement);
    const keyword = formData.get("keyword");
    if (!keyword) {
      courseSetters?.pointToInitialState();
      return;
    }
    const data: backendSuccessResponse<Course[]> = await fetchDataFromAPI({
      endpoint: `course/getAllCoursesByKeyword?keyword=${keyword}`,
    });

    if (data && Array.isArray(data.response)) {
      courseSetters?.setCourses(data.response as Course[]);
      setShowPagination(false);
    } else courseSetters?.pointToInitialState();
  }

  async function categoryChangeHandler(
    event: React.ChangeEvent<HTMLSelectElement>
  ) {
    const category = event.target.value;
    setCategory(category);
    console.log(category);
    if (category) {
      const data = (await fetchDataFromAPI({
        endpoint: `course/getCoursesByCategory/${category}`,
      })) as backendSuccessResponse<Course[]>;
      if (data && Array.isArray(data.response)) {
        courseSetters?.setCourses(data.response);
        setShowPagination(false);
      } else courseSetters?.pointToInitialState();
    } else {
      console.log("here");
      courseSetters?.pointToInitialState();
    }
  }

  return (
    <aside className="mx-auto max-w-md px-1 py-4 bg-white border-r-0 sm:border-r-2 sm:border-primary">
      <form className="flex items-center gap-2 mb-6" onSubmit={submitHandler}>
        <input
          type="text"
          name="keyword"
          className="input"
          placeholder="Enter keyword to search for"
        />
        <button className="btn-red" type="submit">
          Search
        </button>
      </form>

      <div className="flex justify-between flex-col">
        <label
          htmlFor="category"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Search By Category
        </label>
        <select
          onChange={categoryChangeHandler}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          title="select category"
          name="category"
          id="category"
          value={category}
        >
          <option value="">Please Select a Category</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Professional">Professional</option>
        </select>
      </div>
    </aside>
  );
}
